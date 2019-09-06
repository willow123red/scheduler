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

