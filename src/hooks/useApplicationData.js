import React, { useState, useEffect } from "react";
import axios from "axios";

export const useApplicationData = function() {
  
  const [state, setState] = useState({
    day: "Tuesday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ])
      .then(all => {
        setState(prev => ({
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        }));
      })
      .catch(console.error);
  }, []);

  const bookInterview = function(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({ ...state, appointments });

    const url = "/api/appointments/" + id;
    const data = { interview };
    return axios.put(url, data);
  };

  const cancelInterview = function(id, interview) {
    const url = "/api/appointments/" + id;
    const data = { interview };
    return axios.delete(url, data).then(() => {
      const appointment = {
        ...state.appointments[id],
        interview: null
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      setState({ ...state, appointments });
    });
  };
return { state, setDay, bookInterview, cancelInterview }
};
