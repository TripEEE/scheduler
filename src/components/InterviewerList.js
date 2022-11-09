import React from "react"
import InterviewerListItem from "./InterviewerListItem"
import "components/InterviewerList.scss"
import PropTypes from 'prop-types'

//will receive three props:
// interviewers: Array
// setInterviewer: function (accepts interviewer id), will be passed to InterviewerListItem
// interviewer: number

const InterviewerList = (props) => {


  const interviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value.id}
        setInterviewer={() => props.onChange(interviewer)}
      />
    );
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  )
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
}

export default InterviewerList