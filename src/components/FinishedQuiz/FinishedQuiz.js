import React from "react"
import classes from "./FinishedQuiz.module.css"

const FinishedQuiz = props => {
  return (
    <div className={classes.FinishedQuiz}>
      <ul>
        <li>
          <strong>1. </strong>
          how are you?
          <i className={'fa fa-times '  + classes.error}/>
        </li>
        <li>
          <strong>2. </strong>
          how are you?
          <i className={'fa fa-check ' + classes.success}/>
        </li>
        <li>
          <strong>3. </strong>
          how are you?
          <i className="fab fa-slideshare"></i>
        </li>
      </ul>



      <p>Rightly 4 for 10</p>

      <div>
        <button>Repeat</button>
      </div>
    </div>
  )
}

export default FinishedQuiz