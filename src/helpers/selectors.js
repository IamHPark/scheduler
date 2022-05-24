export function getAppointmentsForDay(state, day) {
  // return an array of appointments for that day
  const exactDay = state.days.find(eachDay => eachDay.name === day)
  if (!exactDay) {
    return []
  }
  const appointment = exactDay.appointments.map(id => state.appointments[id])
  return appointment;
};

export function getInterview(state, interview) {
  // return a new object of interview data
  if(!interview) {return null}
  const id = interview.interviewer
  const scheduledInterview = {...interview, interviewer: state.interviewers[id]}
  return scheduledInterview;
}

export function getInterviewersForDay(state, day) {
  const exactDay = state.days.find(eachDay => eachDay.name === day);
  if (!exactDay) {
    return []
  }
  const interviewers = exactDay.interviewers.map(id => state.interviewers[id])
  return interviewers;
}
