import React from "react"
import "./styles.scss"
import useVisualMode from "hooks/useVisualMode"

import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE"
  const SAVING = "SAVING" //style this?

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    }
    transition(SAVING, true)
    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW, true)
      })

  }

  return (
    <>
      <Header time={props.time} />
      <article className="appointment">
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SAVING && <h1>{SAVING}</h1>}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
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