import React from "react"
import "./styles.scss"

import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"

export default function Appointment(props) {
  return (
    <>
      <Header time={props.time} />
      <article className="appointment">
        {props.interview ? <Show {...props.interview} /> : <Empty />}
      </article>
    </>
  )
}