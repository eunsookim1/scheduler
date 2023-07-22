import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment (props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  // Initialize the useVisualMode hook with the initial mode (EMPTY in this case)
  const { mode, transition, back, history } = useVisualMode(
    props.interview? SHOW: EMPTY);
    console.log('interviewers', props.interviewers)

  return (
    <>
    <article className="appointment">
    <Header time={props.time}></Header>
    
    {/* Instead of using 'props.interview? <Show /> : <Empty />' I can use mode. Use the mode to conditionally render the component */}
    { mode === EMPTY && < Empty onAdd={() => transition(CREATE)}/>}
    { mode === SHOW && (
      <Show
        student={props.interview.student}
        time={props.time}
        interviewer={props.interview.interviewer.name}
        interview={props.interview}
        />
      )}
    { mode === CREATE && (
      <Form
        interviewers={props.interviewers}
        onCancel={back}
      />
      
    )}
    </article>
    </>
  );
}
