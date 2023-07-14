import React from "react";
import "./DayListItem.scss";
import classNames from "classnames";



const formatSpots = (spots) => {

  return (
    spots === 0 ? `no spots remaining` : spots === 1 ? 
    `1 spot remaining` : `${spots} spots remaining`
    )
};

export default function DayListItem(props) {
  const day = props.name;
  
  const dayClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0
  });
  
  const availabilityMessage = formatSpots(props.spots);

  return (
    <li 
    onClick={() => props.setDay(day)} 
    className={dayClass}
    selected={props.selected}
    >
      <h2 className="text--regular" >{day}</h2> 
      <h3 className="text--light">{availabilityMessage}</h3>
    </li>
  );
}

