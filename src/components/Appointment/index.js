import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "Error_delete";


  // SAVING MODE:
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    // Transition to the Saving mode to show the indicator
    transition(SAVING);

    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      }).catch(error => transition(ERROR_SAVE, true))
  }

  // DELETING MODE:
  const startDelete = () => {
    transition(CONFIRM);
  }

  const destroy = (event) => {
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      }).catch((error) => {
        transition(ERROR_DELETE, true)
      });
  }

  const dontDelete = () => {
    back();
  }


  // EDITING MODE: 
  const edit = () => {
    transition(EDIT);
  }

  // Initialize the useVisualMode hook with the initial mode (EMPTY in this case)
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY);

  return (
    <>
      <article className="appointment" data-testid="appointment">
        <Header time={props.time}></Header>

        {/* Instead of using 'props.interview? <Show /> : <Empty />' I can use mode. Use the mode to conditionally render the component */}
        {mode === EMPTY && < Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            time={props.time}
            interviewer={props.interview.interviewer.name}
            interview={props.interview}
            onDelete={startDelete}
            onEdit={edit}
          />
        )}
        {mode === CREATE && (
          <Form
            interviewers={props.interviewers}
            onCancel={back}
            onSave={save}
          />
        )}
        {mode === SAVING && (
          <Status message={'Saving'} />
        )}
        {mode === DELETING && (
          <Status message={'Deleting'} />
        )}
        {mode === CONFIRM && (
          <Confirm onCancel={dontDelete} onConfirm={destroy} />
        )}
        {mode === EDIT && (
          <Form
            student={props.interview.student}
            interview={props.interview}
            interviewer={props.interview.interviewer.id}
            interviewers={props.interviewers}
            onCancel={back}
            onSave={save}
          />
        )}
        {mode === ERROR_SAVE && (
          <Error
            onClose={back}
            message='Unable to save'
          />
        )}
        {mode === ERROR_DELETE && (
          <Error
            onClose={back}
            message='Unable to delete'
          />
        )}
      </article>
    </>
  );
}
