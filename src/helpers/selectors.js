export function getAppointmentsForDay(state, day) {

  const dayObj = state.days.find((apptForDay) => apptForDay.name === day)
  
  if(!dayObj) {
    return [];

  } else {

    const arrayOfApptIds = dayObj.appointments
    const appointmentsArr = arrayOfApptIds.map((appointmentId) => {
     return state.appointments[appointmentId];
    });
  
    return appointmentsArr;

  }
}


export function getInterview(state, interview) {
  
}