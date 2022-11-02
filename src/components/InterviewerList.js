import React from "react"
import InterviewerListItem from "./InterviewerListItem"
import "components/InterviewerList.scss"

//will receive three props:
// interviewers: Array
// setInterviewer: function (accepts interviewer id), will be passed to InterviewerListItem
// interviewer: number

export default function InterviewerList(props) {

  const interviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.interviewer}
        setInterviewer={() => props.setInterviewer(interviewer.id)}
      />
    );
  });
  return (
    <ul className="interviewers__list">{interviewers}</ul>
  )


}