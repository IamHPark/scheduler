import React from "react";
import "./styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
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
  const { mode, transition, back } = useVisualMode( props.interview ? SHOW : EMPTY);

  // pass to Form, Form should  capture the name and interviewer and pass them to props.onSave as arguments
  // then create a new interview object to be passed to props.bookInterview
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    // call props.bookInterview
    props.bookInterview(props.id, interview)
    .then(() => {transition(SHOW)})
  };

  const confirm = () => {
    transition(CONFIRM);
  }
  const deleteInterview = (id) => {
    transition(DELETING);
    props.cancelInterview(props.id)
    .then(() => {
      transition(EMPTY);
    })
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
        />
      )}
      {mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onCancel={()=>{back()}}/>}
      {mode === SAVING && <Status message={'Saving'}/>}
      {mode === CONFIRM && <Confirm confirm={deleteInterview}/>}
      {mode === DELETING && <Status message={'Deleting'}/>}

    </article>
  )
}
