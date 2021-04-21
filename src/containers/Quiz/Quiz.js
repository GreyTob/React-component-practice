import React, {Component} from "react"
import classes from "./Quiz.module.css"
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz"

class Quiz extends Component {
  state = {
    quiz: [
      {
        questions: 'Какого цвета небо?',
        rightAnswerId: 3,
        answers: [
          {text: 'Red', id: 1},
          {text: 'Green', id: 2},
          {text: 'Blue', id: 3},
          {text: 'Black', id: 4},
        ]
      },
    ],
  }

  onAnswerClickHandler = (answerId) => {
    console.log('anserId: ', answerId)
  }

  render() {
    return (
      <div className={classes.Quiz}>


        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>
          <ActiveQuiz
            answers={this.state.quiz[0].answers}
            question={this.state.quiz[0].questions}
            onAnswerClick={this.onAnswerClickHandler}
          />
        </div>

      </div>
    )
  }
}

export default Quiz