import React, { Component } from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import Loader from '../../components/UI/Loader/Loader'
import { connect } from 'react-redux'
import { fetchQuizById } from '../../store/actions/quiz'

class Quiz extends Component {
  // state = {
  //для тестирования
  //   [{
  //     question: 'Какого цвета небо?',
  //     rightAnswerId: 3,
  //     id: 1,
  //     answers: [
  //       { text: 'Красного', id: 1 },
  //       { text: 'Зеленого', id: 2 },
  //       { text: 'Голубого', id: 3 },
  //       { text: 'Черного', id: 4 },
  //     ],
  //   },
  //   {
  //     question: 'Столица Канады?',
  //     rightAnswerId: 4,
  //     id: 2,
  //     answers: [
  //       { text: 'Квебек', id: 1 },
  //       { text: 'Торонто', id: 2 },
  //       { text: 'Ванкувер', id: 3 },
  //       { text: 'Оттава', id: 4 },
  //     ],
  //   },
  // ],
  // }

  onAnswerClickHandler = (answerId) => {
    if (this.props.answerState) {
      const key = Object.keys(this.props.answerState)[0]
      if (this.props.answerState[key] === 'success') {
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

  //запрашиваем массив quizes ссервера(пример в QuizList)
  componentDidMount() {
    //console.log(this.props)

    //парамерт в функцию - текущий id - this.props.match.params.id
    this.props.fetchQuizById(this.props.match.params.id)
  }

  render() {
    console.log(this.props)
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>

          {this.props.loading || !this.props.quiz ? (
            <Loader />
          ) : this.props.isFinished ? (
            <FinishedQuiz
              results={this.props.results}
              quiz={this.props.quiz}
              onRetry={this.retryHandler}
            />
          ) : (
            <ActiveQuiz
              answers={this.props.quiz[this.props.activeQuestion].answers}
              question={this.props.quiz[this.props.activeQuestion].question}
              onAnswerClick={this.onAnswerClickHandler}
              quizLenght={this.props.quiz.length}
              answerNumber={this.props.activeQuestion + 1}
              state={this.props.answerState}
            />
          )}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    results: state.quiz.results,
    isFinished: state.quiz.isFinished,
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState,
    loading: state.quiz.loading,
    quiz: state.quiz.quiz,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizById: (id) => dispatch(fetchQuizById(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
