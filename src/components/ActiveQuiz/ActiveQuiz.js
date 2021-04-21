import React from "react"
import classes from "./ActiveQuiz.module.css"
import AnswerList from "./AnswersList/AnswersList"

const ActiveQuiz = props => {
  //console.log('ActivQuiz', props)
  return(
    <div className={classes.ActiveQuiz}>
      <p className={classes.Questions}>
      <span>
        <strong>2.</strong>&nbsp;
        {props.question}
      </span>
        <small>4 из 12</small>
      </p>

      <ul>
        <AnswerList
          answers={props.answers}
          onAnswerClick={props.onAnswerClick}
        />
      </ul>

    </div>
  )
}


export default ActiveQuiz