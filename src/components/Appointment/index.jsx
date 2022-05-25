import React from "react";
import "./styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

// when props.interview exist -> Show component
// when no interview booked -> Empty component
export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE"
  const ERROR_DELETE = "ERROR_DELETE"
  const { mode, transition, back } = useVisualMode( props.interview ? SHOW : EMPTY);

  // pass to Form, Form should  capture the name and interviewer and pass them to props.onSave as arguments
  // then create a new interview object to be passed to props.bookInterview
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)

    // book the interview and show the details of booked interview
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch((error) => transition(ERROR_SAVE, true)
    );
  };

  const confirm = () => {
    transition(CONFIRM);
  }
  const deleteInterview = (id) => {
    transition(DELETING, true);
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch((error) => transition(ERROR_DELETE, true))
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => {transition(CREATE)}} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirm}
          onEdit={() => {transition(EDIT)}}
        />
      )}
      {mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onCancel={back}/>}
      {mode === EDIT && <Form student={props.interview.student} interviewer={props.interview.interviwer} interviewers={props.interviewers} onSave={save} onCancel={back}/>}
      {mode === SAVING && <Status message={'Saving'}/>}
      {mode === CONFIRM && <Confirm confirm={deleteInterview} onCancel={back}/>}
      {mode === DELETING && <Status message={'Deleting'}/>}
      {mode === ERROR_SAVE && <Error onClose={back}/>}
      {mode === ERROR_DELETE && <Error onClose={back}/>}

    </article>
  )
}
