import React, {Component} from "react"
import classes from "./Quiz.module.css"
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz"

class Quiz extends Component {
  state = {
    activeQuestions: 0,
    quiz: [
      {
        questions: 'Какого цвета небо?',
        rightAnswerId: 3,
        id: 1,
        answers: [
          {text: 'Red', id: 1},
          {text: 'Green', id: 2},
          {text: 'Blue', id: 3},
          {text: 'Black', id: 4},
        ]
      },
      {
        questions: 'Какого цвета негр?',
        rightAnswerId: 4,
        id: 2,
        answers: [
          {text: 'Red', id: 1},
          {text: 'White', id: 2},
          {text: 'it is not person', id: 3},
          {text: 'Black', id: 4},
        ]
      },
    ],
  }

  onAnswerClickHandler = (answerId) => {
    console.log('anserId: ', answerId)

    this.setState({
      activeQuestions: this.state.activeQuestions + 1
    })
  }

  render() {
    return (
      <div className={classes.Quiz}>


        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>
          <ActiveQuiz
            answers={this.state.quiz[this.state.activeQuestions].answers}
            question={this.state.quiz[this.state.activeQuestions].questions}
            onAnswerClick={this.onAnswerClickHandler}
            quizLenght={this.state.quiz.length}
            answerNumber={this.state.activeQuestions + 1}
          />
        </div>

      </div>
    )
  }
}

export default Quiz