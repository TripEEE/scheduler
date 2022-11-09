import React from "react"
import Button from "../Button"

// props: message(str), onConfirm(fn), onCancel(fn)

export default function (props) {

  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{props.message}</h1>
      <section className="appointment__actions">
        <Button dataTestId={"confirm"} onClick={props.onConfirm} danger>Confirm</Button>
        <Button onClick={props.onCancel} danger>Cancel</Button>
      </section>
    </main>
  )
}