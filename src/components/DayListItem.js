import React from "react";
import "./DayListItem.scss";
import classNames from "classnames";



const formatSpots = (spots) => {

  return (
    spots === 0 ? `no spots remaining` : spots === 1 ?
      `1 spot remaining` : `${spots} spots remaining`
  )
};

export default function DayListItem({ selected, spots, name, setDay }) {


  const dayClass = classNames('day-list__item', {
    'day-list__item--selected': selected,
    'day-list__item--full': spots === 0
  });



  return (
    <li
      onClick={() => setDay(name)}
      className={dayClass}
      selected={selected}
      data-testid="day"
    >
      <h2 className="text--regular" >{name}</h2>
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}

