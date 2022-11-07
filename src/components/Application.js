import React, { useState, useEffect } from "react";
import Axios from "axios";

import "components/Application.scss";
import DayList from 'components/DayList'
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";

export default function Application(props) {
  //will need to use this state in other components
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const interviewers = getInterviewersForDay(state, state.day)

  useEffect(() => {
    Promise.all([
      Axios.get('/api/days'),
      Axios.get('/api/appointments'),
      Axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    });
  }, [])

  const setDay = day => setState({ ...state, day });

  const dailyAppointments = getAppointmentsForDay(state, state.day)

  const bookInterview = (id, interview) => {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return Axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        setState({ ...state, appointments }) //updating original state, only if put is successful
      })

  }

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
            // setDay passes props to the <DayListItem> children 
            //causing the updates to the "selected" visual state.
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
        {dailyAppointments.map(appointment =>
          <Appointment
            {...appointment}
            key={appointment.id}
            interview={getInterview(state, appointment.interview)}
            interviewers={interviewers}
            bookInterview={bookInterview}
            id={appointment.id}
          />
        )}
        {/* Replace this with the schedule elements during the "The Scheduler" activity. */}
      </section>
    </main>
  );
}
