import React from "react"
import "./styles.scss"
import useVisualMode from "hooks/useVisualMode"

import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import Confirm from "./Confirm"
import Status from "./Status"

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE"
  const SAVING = "SAVING" //style this?
  const CONFIRM = "CONFIRM"
  const DELETE = "DELETE"

  const { mode, transition, back } = useVisualMode(
    (props.interview ? SHOW : EMPTY)
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    }
    transition(SAVING)
    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW, true)
      })
  }

  const onDeleteHandler = () => {
    transition(CONFIRM)
  }

  const cancel = () => {
    transition(DELETE) //deleting screen
    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY)
      })
  }

  console.log(props.id, mode)
  return (
    <>
      <Header time={props.time} />
      <article className="appointment">
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SAVING && <Status
          message={"Saving"} />}
        {mode === DELETE && (
          <Status
            message={"Deleting"} />
        )}
        {mode === SHOW && (
          <Show
            student={props.interview ? props.interview.student : 'Not found'}
            interviewer={props.interview ? props.interview.interviewer : 'Not found'}
            onDelete={onDeleteHandler}
          />
        )}
        {mode === CONFIRM && (
          <Confirm
            message={"Are you sure you want to delete?"}
            onConfirm={cancel}
            onCancel={back}
          />
        )}
        {mode === CREATE && (
          <Form
            interviewers={props.interviewers}
            onSave={save}
            onCancel={back}
          />)}

      </article>
    </>
  )
}