import React from "react"
import classec from "./AnswerItem.module.css"

const AnswerItem = props => {
  //console.log(props)
  return (
    <li
      className={classec.AnswerItem}
      onClick={() => props.onAnswerClick(props.answer.id)}
    >
      {props.answer.text}
    </li>
  )
}

export default AnswerItem