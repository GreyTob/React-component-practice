import { CREATE_QUIZ_ACTION, RESET_QUIZ_CREATION } from './actionTypes'
import axios from '../../axios/axioz-quiz'

export function createQuizQuestion(item) {
  return {
    type: CREATE_QUIZ_ACTION,
    item,
  }
}

export function resetQuizCreation() {
  return {
    type: RESET_QUIZ_CREATION,
  }
}

export function finishCreatequiz() {
  return async (dispatch, getState) => {
    await axios.post(
      '/quizes.json', //URL с axios-quiz
      //this.state.quiz
      //получаю доступ к нужному полю state
      getState().create.quiz
    )
    //обнуляю массив quiz, что бы заново создавать новый тест
    dispatch(resetQuizCreation())
  }
}
