import { useReducer, useEffect } from "react";
import axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

const reducer = function(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.value };
    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers
      };
    case SET_INTERVIEW: {
      const appointment = {
        ...state.appointments[action.id],
        interview: action.interview && { ...action.interview }
      };
      const findDaySpot = state.days.map(day => {
        for (let appointmentID of day.appointments) {
          if (appointmentID === action.id) {
            if (action.interview && !state.appointments[action.id].interview) {
              return { ...day, spots: day.spots - 1 };
            } else if (
              !action.interview &&
              state.appointments[action.id].interview
            ) {
              return { ...day, spots: day.spots + 1 };
            }
          }
        }
        return day;
      });

      const appointments = {
        ...state.appointments,
        [action.id]: appointment
      };
      return { ...state, appointments, days: findDaySpot };
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
};

export const useApplicationData = function() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Tuesday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => dispatch({ type: SET_DAY, value: day });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ])
      .then(all => {
        dispatch({
          type: SET_APPLICATION_DATA,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        });
      })
      .catch(console.error);
  }, []);

  const bookInterview = function(id, interview) {
    dispatch({ type: SET_INTERVIEW, interview, id });
    const url = "/api/appointments/" + id;
    const data = { interview };
    return axios.put(url, data);
  };

  const cancelInterview = function(id, interview) {
    const url = "/api/appointments/" + id;
    const data = { interview };
    return axios.delete(url, data).then(() => {
      dispatch({ type: SET_INTERVIEW, interview: null, id });
    });
  };
  return { state, setDay, bookInterview, cancelInterview };
};
