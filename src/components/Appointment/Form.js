import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "../Button"

export default function Form (props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = () => {
    setStudent("");
    setInterviewer(null);
  }

  const cancel = () => {
    reset();
    props.onCancel();
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            value={student}
            type="text" 
            placeholder="Enter Student Name"
            onChange={(event) => setStudent(event.target.value)}
          />
        </form>
        <InterviewerList 
          interviewers={props.interviewers}
          value={interviewer}
          onChange={(interviewerId) => setInterviewer(interviewerId)}
        />
      </section>
      <section className="appointment__card-rights">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button> 
          <Button confirm onClick={() => props.onSave(student, interviewer)}>Save</Button>
        </section>
      </section>
    </main>
  )
}