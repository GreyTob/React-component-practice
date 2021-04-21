import React from "react"
import classec from "./AnswerItem.module.css"

const AnswerItem = props => {
  return (
    <li
      className={classec.AnswerItem}
    >
      {props.answer.text}
    </li>
  )
}

export default AnswerItem