import React from "react";
import classNames from "classnames";
import "./InterviewerListItem.scss";


export default function InterviewerListItem (props) {
  const interviewer = props;
  const className = classNames('interviewers__item', {'interviewers__item--selected': interviewer.selected }
  )

  // const handleClick = () => {
  //   props.setInterviewer(interviewer.id);
  // };
  
// console.log(interviewer);

  return (
    <li 
    className={className}
    onClick={props.setInterviewer}
    >
      <img
        className="interviewers__item-image"
        src={interviewer.avatar}
        alt={interviewer.name}
      />
      {interviewer.selected && interviewer.name}
    </li>
  )
}