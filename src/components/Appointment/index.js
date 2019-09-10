import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = function (name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(()=> transition(SHOW));
  }

  const deleteInt = function (interview) {
    transition(DELETING);
    props.cancelInterview(props.id, interview)
    .then(()=> {
      transition(EMPTY)})
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
          // onEdit={props.onEdit}
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
    </article>
  );
}
