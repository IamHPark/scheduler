import React, {useState, useEffect} from "react";
import axios from 'axios';
import updateSpots from "helpers/updateSpots";


// do not reload all the data in order to spots for a day
// cannot mutate state when updating the spots

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

    // will change local state when we booke an interview
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };

    const appointments= {
      ...state.appointments,
      [id]: appointment
    };

    //update the database with interview data
    return axios.put(`/api/appointments/${appointment.id}`, appointment)
      .then(() => {
        const days = updateSpots(state, appointments, id);
        setState({...state, appointments, days});
      });
  };

  // make funtion to cancel interview when click delete button
  const cancelInterview = (id) => {
    const deleted = {
      ...state.appointments[id],
      interview: null
    }
    const appointments= {
      ...state.appointments,
      [id]: deleted
    };

    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      const days = updateSpots(state, appointments, id);
      setState({...state, appointments, days});
    })
  };

  const setDay = day => setState({...state, day});


  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
      .then(all=> {
        setState(prev => ({...prev,days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
      })
  }, []);

  return {state, setDay, bookInterview, cancelInterview};
};