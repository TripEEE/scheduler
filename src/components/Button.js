import React from "react";

import classNames from "classnames"
import "components/Button.scss";

export default function Button(props) {
  //here buttonClass uses the classNames add-on
  //"button" is always a className
  //"button--confirm" is only a className if props.confirm is truthy
  //"button--danger" is only a className if props.danger is truthy

  const buttonClass = classNames("button", {
    "button--confirm": props.confirm,
    "button--danger": props.danger
  })

  return (
    <button data-testid={props.dataTestId} className={buttonClass} onClick={props.onClick} disabled={props.disabled}>{props.children}</button>
  );
}
