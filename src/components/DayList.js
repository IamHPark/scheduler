import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props){
  const days = props.days
  const listItem = days.map((day, i) =>
    <DayListItem
    key={day.id}
    name={day.name}
    spots={day.spots}
    selected={day.name === props.day}
    setDay={props.setDay}/>
  )

  return(
    <ul>{listItem}</ul>
  )
}

