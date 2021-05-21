import React, { Component } from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import Loader from '../../components/UI/Loader/Loader'
import { connect } from 'react-redux'
import {
  fetchQuizById,
  quizkAnswerClick,
  retryQuiz,
} from '../../store/actions/quiz'

class Quiz extends Component {
  componentWillUnmount() {
    this.props.retryQuiz()
  }
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

  //onAnswerClickHandler = (answerId) => {}

  // isQuizFinished() {
  //   return this.state.activeQuestion + 1 === this.state.quiz.length
  // }

  // retryHandler = () => {
  //   this.setState({
  //     results: {},
  //     isFinished: false,
  //     activeQuestion: 0,
  //     answerState: null,
  //   })
  // }

  //запрашиваем массив quizes ссервера(пример в QuizList)
  componentDidMount() {
    //console.log(this.props)

    //парамерт в функцию - текущий id - this.props.match.params.id
    this.props.fetchQuizById(this.props.match.params.id)
  }

  render() {
    // console.log('Quiz:', this.props)
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
              onRetry={this.props.retryQuiz}
            />
          ) : (
            <ActiveQuiz
              answers={this.props.quiz[this.props.activeQuestion].answers}
              question={this.props.quiz[this.props.activeQuestion].question}
              onAnswerClick={this.props.quizkAnswerClick}
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
    quizkAnswerClick: (answerId) => dispatch(quizkAnswerClick(answerId)),
    retryQuiz: () => dispatch(retryQuiz()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
