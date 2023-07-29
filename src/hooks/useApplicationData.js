import { useState, useEffect } from "react";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // Booking an interview (create a new appointment):
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const url = `/api/appointments/${id}`;
    return axios
      .put(url, { interview })
      .then(() => {
        setState((prev) => ({ ...prev, appointments, days: updateSpots(state, appointments) }));

      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Deleting an existing interview appointment:
  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const url = `/api/appointments/${id}`;
    return axios
      .delete(url)
      .then(() => {
        setState((prev) => ({ ...prev, appointments, days: updateSpots(state, appointments) }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Editing an existing interview appointment:
  const editInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const url = `/api/appointments/${id}`;
    return axios
      .patch(url, { interview })
      .then(() => {
        setState((prev) => ({ ...prev, appointments }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("api/appointments"),
      axios.get("api/interviewers")
    ]).then((all) => {
      const [days, appointments, interviewers] = all;
      setState((prev) => ({
        ...prev,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data
      }));
    });
  }, []);

  const interviewers = getInterviewersForDay(state, state.day);
  const appointments = getAppointmentsForDay(state, state.day);


  function updateSpots(state, appointments) {
    let dayIndex = -1;
    const day = state.days.find((item, index) => {
      if (item.name === state.day) {
        dayIndex = index;
        return item;
      }
    });

    let spots = 0;
    day.appointments.forEach((item) => {
      const appointment = appointments[item];
      if (!appointment.interview) {
        spots += 1;
      }
    })

    day.spots = spots;

    const days = state.days;
    days.splice(dayIndex, 1, day)

    return days;
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    editInterview,
    interviewers,
    appointments,
    updateSpots
  };
}

