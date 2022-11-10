import React from "react"
import "./styles.scss"
import useVisualMode from "hooks/useVisualMode"

import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import Confirm from "./Confirm"
import Status from "./Status"
import Error from "./Error"

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE"
  const SAVING = "SAVING"
  const CONFIRM = "CONFIRM"
  const DELETE = "DELETE"
  const EDIT = "EDIT"
  const ERROR_SAVE = "ERROR_SAVE"
  const ERROR_DELETE = "ERROR_DELETE"

  const { mode, transition, back } = useVisualMode(
    (props.interview ? SHOW : EMPTY)
  );

  const save = (name, interviewerId) => {
    const interview = {
      student: name,
      interviewer: interviewerId
    }
    transition(SAVING)
    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW)
      })
      .catch((error) => {
        transition(ERROR_SAVE, true)
      })
  }

  const onDeleteHandler = () => {
    transition(CONFIRM)
  }

  const cancel = () => {
    transition(DELETE, true) //deleting screen
    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY)
      })
      .catch((error) => {
        transition(ERROR_DELETE, true)
      })
  }

  const componentsByMode = {
    EMPTY: <Empty onAdd={() => transition(CREATE)} />,
    SHOW: <Show
      student={props.interview?.student}
      // interviewer={props.interview?.interviewer}
      interviewer={props.interview?.interviewer}
      onDelete={onDeleteHandler}
      onEdit={() => transition(EDIT)}
    />,
    CREATE: <Form
      interviewers={props.interviewers}
      // interviewer={props.interview?.interviewer}
      interviewer={props.interview?.interviewer?.id}
      student={props.interview?.student}
      onSave={save}
      onCancel={back}
    />,
    SAVING: <Status message={"Saving"} />,
    CONFIRM: <Confirm
      message={"Are you sure you want to delete?"}
      onConfirm={cancel}
      onCancel={back}
    />,
    DELETE: <Status message={"Deleting"} />,
    EDIT: <Form
      interviewers={props.interviewers}
      // interviewer={props.interview?.interviewer}
      interviewer={props.interview?.interviewer?.id}
      student={props.interview?.student}
      onSave={save}
      onCancel={back}
    />,
    ERROR_SAVE: <Error
      message={"Cannot save! Please contact admin"}
      onClose={back}
    />,
    ERROR_DELETE: <Error
      message={"Cannot delete! Please contact admin"}
      onClose={back}
    />,
  }
  return (
    <>
      <Header time={props.time} />
      <article data-testid="appointment" className="appointment">
        {componentsByMode[mode]}

      </article>
    </>
  )
}