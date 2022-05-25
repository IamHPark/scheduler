import React, { useState } from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const listClass = classNames(
    "day-list__item",
    {"day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0 ? true : false}
  );

  const formatSpots = (spots) => {
    return spots > 1 ? `${spots} spots remaining` : spots === 1 ? `${spots} spot remaining` : "no spots remaining"
  }

  return (
    <li className={listClass} onClick={props.setDay}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  )
}
