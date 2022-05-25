const updateSpots = function(state, appointments, id) {
  // appointment id is known when an interview is confirmed or canceled

  // find the day with appointment(id)
  const daysCopy = [...state.days]
  const index = daysCopy.findIndex(day => day.appointments.includes(id))

  const day = daysCopy[index]

  let spots = 0;
  day.appointments.forEach( i => {
    if (appointments[i].interview === null){
      spots += 1;
    }
  });

  const newDay = {...day,spots}
  daysCopy[index] = newDay;

  return daysCopy;
};

export default updateSpots;