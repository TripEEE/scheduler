//return an array of appointments for the given day
export const getAppointmentsForDay = (state, day) => {
  //selectDay grabs the object where days[*day*].name
  const selectDay = (state.days.find((dayOfWeek) => dayOfWeek.name === day) || {})
  //appointments is provided an alias of dayAppointments which will default to
  //an empty array should the value of selectDay be falsy
  const { appointments: dayAppointments = [] } = selectDay
  return dayAppointments.map((appointmentId) => state.appointments[appointmentId])
}