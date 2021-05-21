// import {
//   FETCH_QUIZES_START,
//   FETCH_QUIZES_SUCCESS,
//   FETCH_QUIZES_ERROR,
//   FETCH_QUIZ_SUCCESS,
// } from '../actions/actionTypes'

// const initialState = {
//   //from QuizList.js
//   quizes: [],
//   loading: false,
//   error: null,
//   //from Quiz.js
//   results: {}, // {[id]: success error}
//   isFinished: false,
//   activeQuestions: 0,
//   answerState: null, // {[id]: 'success' 'error'}
//   //loading: true, //повторяется
//   quiz: null, //в компоненте было quiz: [], т.к. он будет неопределен и его надо загрузить с сервера
// }

// export default function quizReducer(state = initialState, action) {
//   // console.log(action.quiz)
//   switch (action.type) {
//     //QuizList.js

//     case FETCH_QUIZES_START:
//       return {
//         ...state, //клонирование state
//         loading: true,
//       }
//     case FETCH_QUIZES_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         quizes: action.quizes,
//       }
//     case FETCH_QUIZES_ERROR:
//       return {
//         ...state,
//         loading: false,
//         error: action.error,
//       }

//     //Quiz.js
//     case FETCH_QUIZ_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         quiz: action.quiz,
//       }

//     default:
//       return state
//   }
// }

//------------

import {
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
} from '../actions/actionTypes'

const initialState = {
  quizes: [],
  loading: false,
  error: null,
  results: {},
  isFinished: false,
  activeQuestion: 0,
  answerState: null,
  quiz: null,
}

export default function quizReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_QUIZES_START:
      return {
        ...state,
        loading: true,
      }
    case FETCH_QUIZES_SUCCESS:
      return {
        ...state,
        loading: false,
        quizes: action.quizes,
      }
    case FETCH_QUIZES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    case FETCH_QUIZ_SUCCESS:
      return {
        ...state,
        loading: false,
        quiz: action.quiz,
      }
    default:
      return state
  }
}
