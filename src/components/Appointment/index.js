import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = function (name, interviewer) {
    if (!name || !interviewer) {
      transition(ERROR_SAVE, true);
      return;
    }
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);

    props
    .bookInterview(props.id, interview)
    .then(()=> transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true));
  }

  const deleteInt = function (interview) {
    transition(DELETING, true);

    props
    .cancelInterview(props.id, interview)
    .then(()=> transition(EMPTY))
    .catch(error => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment">
      <Header time={props.time}></Header>
      {mode === CONFIRM && (
        <Confirm 
          onConfirm={deleteInt} />
      )}
      {mode === SAVING && (
        <Status
          message="Saving"/>
      )}
      {mode === DELETING && (
        <Status
          message="Deleting"/>
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === EMPTY && (
        <Empty onAdd={()=> transition(CREATE)} />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      )}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer}  
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message="Could not save appointment"
          onClose={back}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message="Could not cancel appointment"
          onClose={back}
        />
      )}
    </article>
  );
}
