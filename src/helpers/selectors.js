export function getAppointmentsForDay(state, day) {

  const dayObj = state.days.find((apptForDay) => apptForDay.name === day)

  if (!dayObj) {
    return [];

  } else {

    const arrayOfApptIds = dayObj.appointments
    const appointmentsArr = arrayOfApptIds.map((appointmentId) => {
      return state.appointments[appointmentId];
    });
    return appointmentsArr;
  }
}

export function getInterviewersForDay(state, day) {

  const dayObj = state.days.find((apptForDay) => apptForDay.name === day)

  if (!dayObj) {
    return [];

  } else {

    const arrayOfInterviewersIds = dayObj.interviewers
    const interviewersArr = arrayOfInterviewersIds.map((interviewerId) => {
      return state.interviewers[interviewerId];
    });
    return interviewersArr;
  }
}


export function getInterview(state, interview) {
  if (!interview) {
    return null; // Return null if the interview is null or not provided.
  }

  const interviewerId = interview.interviewer;
  const interviewer = state.interviewers[interviewerId];

  return interviewer ? { ...interview, interviewer } : null;
};