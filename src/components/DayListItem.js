import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const listClass = classNames("day-list__item", {"day-list__item--selected": props.selected, "day-list__item--full": props.spots === 0 ? true : false})
  const formatSpots = () => {
    return props.spots > 1 ? `${props.spots} spots remaining` : props.spots === 1 ? `${props.spots} spot remaining` : "no spots remaining"
  }
  return (
    <li className={listClass} onClick={()=>props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  )
}