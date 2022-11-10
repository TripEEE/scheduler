import React, { useState, useEffect } from "react";
import axios from "axios";

//this function returns an object with 4 keys:
//state, setDay, bookInterview, cancelInterview
export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    });
  }, [])

  const updateSpots = (state, appointments) => {
    return state.days.map((day) => {
      if (day.name === state.day) {
        return { //creates a new object that includes all of the days
          ...day,
          spots: day.appointments.map((id) => appointments[id]).filter(appointment => !appointment.interview).length
        }
      }
      return day
    })
  }

  const setDay = day => setState({ ...state, day });

  const bookInterview = (id, interview) => {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState({ ...state, appointments, days: updateSpots(state, appointments) }) //updating original state, only if put is successful
    })

  }

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState({ ...state, appointments, days: updateSpots(state, appointments) }) //updating original state, only if put is successful
      })
  }

  return { state, setDay, bookInterview, cancelInterview }
}