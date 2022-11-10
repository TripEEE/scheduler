//selectors are a way to create or derive data from state

// return an array of appointments for the given day
export const getAppointmentsForDay = (state, day) => {
  //selectDay grabs the object where days[*day*].name
  const selectDay = (state.days.find((dayOfWeek) => dayOfWeek.name === day) || {})
  //appointments is provided an alias of dayAppointments which will default to an empty array should the value of selectDay be falsy
  const { appointments: dayAppointments = [] } = selectDay
  return dayAppointments.map((appointmentId) => state.appointments[appointmentId])
}

export const getInterview = (state, interview) => {
  if (!interview) {
    return null
  }
  const findInterviewer = (state.interviewers[interview.interviewer])
  let obj = {
    "student": interview.student,
    "interviewer": findInterviewer
  }
  return obj
}

export const getInterviewersForDay = (state, day) => {
  const selectDay = state.days.find((dayOfWeek) => dayOfWeek.name === day) || []
  const { interviewers: dayInterviewers = [] } = selectDay
  return dayInterviewers.map((interviewerId) => state.interviewers[interviewerId])

}