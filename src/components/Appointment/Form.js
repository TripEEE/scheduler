import React, { useState } from "react"
import Button from "../Button"
import InterviewerList from "components/InterviewerList"

//Create props: student(str), interviewer(num), interviewers(arr), onSave(fn), onCancel(fn)
//Edit props: interviewer(num), interviewers(arr), onSave(fn), onCancel(fn)

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "")
  const [interviewer, setInterviewer] = useState(props.interviewer || null)

  const resetForm = () => {
    setStudent("")
    setInterviewer(null)
  }

  const cancelForm = () => {
    resetForm()
    props.onCancel()
  }

  const onSubmit = () => {
    props.onSave(student, interviewer)
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student} //props.student
            onChange={(event) => setStudent(event.target.value)}

          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer} //props.interviewer
          onChange={setInterviewer}


        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancelForm} >Cancel</Button>
          <Button confirm onClick={onSubmit} >Save</Button>
        </section>
      </section>
    </main>
  )
}

