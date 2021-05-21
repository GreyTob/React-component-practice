// import axios from '../../axios/axioz-quiz'
// import {
//   FETCH_QUIZ_SUCCESS,
//   FETCH_QUIZES_START,
//   FETCH_QUIZES_SUCCESS,
//   FETCH_QUIZES_ERROR,
// } from './actionTypes'

// //actionCreators from QuizList.js
// export function fetchQuizes() {
//   return async (dispatch) => {
//     dispatch(fetchQuizesStart())
//     try {
//       const response = await axios.get('/quizes.json')

//       const quizes = []

//       Object.keys(response.data).forEach((key) => {
//         //console.log(response.data[key][0].question)
//         quizes.push({
//           id: key,
//           name: `: ${response.data[key][0].question}`,
//         })
//       })

//       dispatch(fetchQuizesSuccess(quizes))
//     } catch (e) {
//       dispatch(fetchQuizesError(e))
//     }
//   }
// }

// //actionCreators from Quiz.js
// export function fetchQuizById(quizId) {
//   return async dispatch => {
//     dispatch(fetchQuizesStart())

//     try {
//       const response = await axios.get(`/quizes/${quizId}.json`)
//       const quiz = response.data

//       dispatch(fetchQuizSuccess(quiz))
//     } catch (e) {
//       dispatch(fetchQuizesError(e))
//     }
//   }
// }

// export function fetchQuizSuccess(quiz) {
//   return {
//     type: FETCH_QUIZ_SUCCESS,
//     quiz,
//   }
// }

// //actionCreators from QuizList.js
// export function fetchQuizesStart() {
//   return {
//     type: FETCH_QUIZES_START,
//   }
// }

// export function fetchQuizesSuccess(quizes) {
//   return {
//     type: FETCH_QUIZES_SUCCESS,
//     quizes,
//   }
// }

// export function fetchQuizesError(e) {
//   return {
//     type: FETCH_QUIZES_ERROR,
//     error: e,
//   }
// }

import axios from '../../axios/axioz-quiz'
import {
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
} from './actionTypes'

export function fetchQuizes() {
  return async (dispatch) => {
    dispatch(fetchQuizesStart())
    try {
      const response = await axios.get('/quizes.json')

      const quizes = []

      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Тест №${index + 1}`,
        })
      })

      dispatch(fetchQuizesSuccess(quizes))
    } catch (e) {
      dispatch(fetchQuizesError(e))
    }
  }
}

export function fetchQuizById(quizId) {
  return async (dispatch) => {
    dispatch(fetchQuizesStart())

    try {
      const response = await axios.get(`/quizes/${quizId}.json`)
      const quiz = response.data

      dispatch(fetchQuizSuccess(quiz))
    } catch (e) {
      dispatch(fetchQuizesError(e))
    }
  }
}

export function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz,
  }
}

export function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START,
  }
}

export function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes,
  }
}

export function fetchQuizesError(e) {
  return {
    type: FETCH_QUIZES_ERROR,
    error: e,
  }
}
