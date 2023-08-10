import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {

  const days = props.days; // is days an object? no. didnt' work when it was...

  const dayListItems = days.map(day => {
    return (
      <DayListItem
        key={day.id}
        name={day.name} // Should I change from name to day?
        spots={day.spots}
        selected={day.name === props.value}
        setDay={props.onChange}
      />
    )
  })

  return (
    <ul>
      {dayListItems}
    </ul>
  )
};
