import React from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {

  // // const [day, setDay] = useState("Monday");
  // // const [days, setDays] = useState([]);

  // const [state, setState] = useState({
  //   day: "Monday",
  //   days: [],
  //   appointments: {},
  //   interviewers: {}
  // })


  // // Booking an interview (create a new appointment):
  // const bookInterview = (id, interview) => {

  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: { ...interview }
  //   };

  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment
  //   };

  //   const url = `/api/appointments/${id}`
  //   return axios.put(url, { interview })
  //     // axios.put and post always have two or more parameters
  //     .then(() => {
  //       setState({ ...state, appointments });
  //       // this will re-render the page
  //     });

  //   // console.log('appointmentId:', id, 'interview:', interview);
  //   // console.log('appointment:', appointment);
  // }

  // // Deleting an existing interview appointment:
  // const cancelInterview = (id) => {
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: null
  //   };

  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment
  //   };

  //   const url = `/api/appointments/${id}`
  //   return axios.delete(url)
  //     .then(() => {
  //       setState({ ...state, appointments });
  //     })
  // }

  // // Editing an existing interview appointment:
  // const editInterview = (id, interview) => {
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: { interview }
  //   };

  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment
  //   };
  //   const url = `/api/appointments/${id}`;
  //   return axios.patch(url)
  //     .then(() => {
  //       setState({ ...state, appointments });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     })
  // }


  // useEffect(() => {
  //   Promise.all([
  //     axios.get('/api/days'),
  //     axios.get('api/appointments'),
  //     axios.get('api/interviewers')
  //   ]).then((all) => {
  //     const [days, appointments, interviewrs] = all;
  //     setState(prev => ({
  //       ...prev,
  //       days: days.data,
  //       appointments: appointments.data,
  //       interviewers: interviewrs.data
  //     }));
  //   });
  // }, []);

  // // console.log('state', state);
  // // console.log('state.interviewers', state.interviewers)

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    editInterview
  } = useApplicationData();

  // const setDay = day => setState({ ...state, day });
  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day)
  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
        editInterview={editInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
