import React, { useState } from "react"
import Button from "../Button"
import InterviewerList from "components/InterviewerList"

//Create props: student(str), interviewer(num), interviewers(arr), onSave(fn), onCancel(fn)
//Edit props: interviewer(num), interviewers(arr), onSave(fn), onCancel(fn)

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "")
  const [interviewer, setInterviewer] = useState(props.interviewer || null)
  const [error, setError] = useState("");

  const resetForm = () => {
    setStudent("")
    setInterviewer(null)
  }

  const cancelForm = () => {
    resetForm()
    props.onCancel()
  }

  const onSubmit = () => {
    if (!student) {
      setError("Student name cannot be blank");
      return;
    }
    if (!interviewer) {
      setError("Please select an interviewer");
      return;
    }
    props.onSave(student, interviewer.id) //passing student and interviewer (obj) to save in index.js
  }
  console.log(interviewer)
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
            data-testid={"student-name-input"}
          />
        </form>
        <section className="appointment__validation">{error}</section>
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

