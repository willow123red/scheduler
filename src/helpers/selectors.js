export function getAppointmentsForDay(state, day) {
  const dayObject = state.days.find(dayObject => dayObject.name === day);
  const appointments = [];
  if (dayObject) {
    const appointmentIDs = dayObject.appointments;
    for (let id of appointmentIDs) {
      const appointment = state.appointments[id];
      if (appointment) appointments.push(appointment);
    }
  }
  return appointments;
}

export function getInterview(state, interview) {
  if (interview) {
    const interviewerObject = state.interviewers[interview.interviewer];
    const newInterview = {
      ...interview,
      interviewer: interviewerObject
    }
    return newInterview;
  }
  return null;
}

export function getInterviewersForDay(state, day) {
  const dayObject = state.days.find(dayObject => dayObject.name === day);
  const interviewers = [];
  if (dayObject) {
    const interviewerIDs = dayObject.interviewers;
    for (let id of interviewerIDs) {
      const interviewer = state.interviewers[id];
      if (interviewer) interviewers.push(interviewer);
    }
  }
  return interviewers;
}