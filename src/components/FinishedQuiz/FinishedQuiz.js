import React from "react"
import classes from "./FinishedQuiz.module.css"
import Button from "../UI/Button/Button"

const FinishedQuiz = props => {

  const successCounter = Object.keys(props.results).reduce((total, key) => {
    if(props.results[key] === 'success') {
      total++
    }
    return total
  }, 0)

  return (
    <div className={classes.FinishedQuiz}>
      <ul>

        { props.quiz.map((quizItem, index)=> {
          const cls = [
            'fa',
            props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
            classes[props.results[quizItem.id]]//classes.success or classes.error
          ]

          // debugger

          return (
            <li
              key={index}
            >
              <strong>{index + 1}</strong>.&nbsp;
              {quizItem.question}
              <i className={ cls.join(' ') }/>

            </li>
          )

        }) }


        {/*<li>*/}
        {/*  <strong>1. </strong>*/}
        {/*  {quiz[]}*/}
        {/*  <i className={'fa fa-times '  + classes.error}/>*/}
        {/*</li>*/}
        {/*<li>*/}
        {/*  <strong>2. </strong>*/}
        {/*  how are you?*/}
        {/*  <i className={'fa fa-check ' + classes.success}/>*/}
        {/*</li>*/}
      </ul>



      <p>Rightly { successCounter } for { props.quiz.length }</p>

      <div>
        <Button onClick={props.onRetry} type='primary'>Повторить</Button>
        <Button type='success'>Перейти в список тестов</Button>
        <Button type='error'>Ошибка</Button>
      </div>


    </div>
  )
}

export default FinishedQuiz