import React, { Component } from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'

class Quiz extends Component {
  state = {
    results: {}, // {[id]: success error}
    isFinished: false,
    activeQuestions: 0,
    answerState: null, // {[id]: 'success' 'error'}
    quiz: [
      {
        question: 'Какого цвета небо?',
        rightAnswerId: 3,
        id: 1,
        answers: [
          { text: 'Красного', id: 1 },
          { text: 'Зеленого', id: 2 },
          { text: 'Голубого', id: 3 },
          { text: 'Черного', id: 4 },
        ],
      },
      {
        question: 'Столица Канады?',
        rightAnswerId: 4,
        id: 2,
        answers: [
          { text: 'Квебек', id: 1 },
          { text: 'Торонто', id: 2 },
          { text: 'Ванкувер', id: 3 },
          { text: 'Оттава', id: 4 },
        ],
      },
    ],
  }

  onAnswerClickHandler = (answerId) => {
    // console.log('results: ',this.state.results)

    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0]
      if (this.state.answerState[key] === 'success') {
        return
      }
    }

    // console.log('answerId: ', answerId)

    const question = this.state.quiz[this.state.activeQuestions]
    const results = this.state.results

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success'
      }

      this.setState({
        answerState: { [answerId]: 'success' },
        results, //results: results
      })

      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({
            isFinished: true,
          })
        } else {
          this.setState({
            activeQuestions: this.state.activeQuestions + 1,
            answerState: null,
          })
        }
        window.clearTimeout(timeout)
      }, 1000)
    } else {
      results[question.id] = 'error'
      this.setState({
        answerState: { [answerId]: 'error' },
        results: results, //или просто results
      })
    }
  }

  isQuizFinished() {
    return this.state.activeQuestions + 1 === this.state.quiz.length
  }

  retryHandler = () => {
    this.setState({
      results: {},
      isFinished: false,
      activeQuestions: 0,
      answerState: null,
    })
  }

  componentDidMount() {
    console.log('Qiuz id = ', this.props.match.params.id)
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>

          {this.state.isFinished ? (
            <FinishedQuiz
              results={this.state.results}
              quiz={this.state.quiz}
              onRetry={this.retryHandler}
            />
          ) : (
            <ActiveQuiz
              answers={this.state.quiz[this.state.activeQuestions].answers}
              question={this.state.quiz[this.state.activeQuestions].question}
              onAnswerClick={this.onAnswerClickHandler}
              quizLenght={this.state.quiz.length}
              answerNumber={this.state.activeQuestions + 1}
              state={this.state.answerState}
            />
          )}
        </div>
      </div>
    )
  }
}

export default Quiz
