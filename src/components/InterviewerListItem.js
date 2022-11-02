import React from "react"
import classNames from "classnames"

import "components/InterviewerListItem.scss"

// props will be: 
// id: Number
// name: String
// avatar: URL
// selected: boolean

// needs a function called setInterviewer

export default function InterviewerListItem(props) {

  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  })

  return (
    <li onClick={() => props.setInterviewer(props.id)} className={interviewerClass}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {/*only renders if selected is true*/}
      {props.selected && props.name}
    </li>
  )

}