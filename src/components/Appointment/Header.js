import React from "react";

export default function Header (props) {
  const { time } = props;
// Or I can do it this way: 
// Option1: export default function Header ({ time }) {
// <h4 className="text--semi-bold">{time}</h4>
// Option2: export default function Header (props) {
// <h4 className="text--semi-bold">{props.time}</h4>

 
  return (
    <header className="appointment__time">
      <h4 className="text--semi-bold">{time}</h4>
      <hr className="appointment__separator" />
    </header>
  )
}