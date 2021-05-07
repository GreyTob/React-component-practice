import React, { Component } from 'react'
import classes from './QuizList.module.css'
import { NavLink } from 'react-router-dom'
import axios from 'axios'

export default class QuizList extends Component {
  //создаем state c пустым массивом quizes для хранения полученных с сервера вопросов
  state = {
    quizes: [],
  }

  renderQuizes() {
    return this.state.quizes.map((quiz) => {
      return (
        <li key={quiz.id}>
          <NavLink to={'/quiz/' + quiz.id}>Тест {quiz.name}</NavLink>
        </li>
      )
    })
  }

  //при запроса данных от сервера нужно использовать данный жизненный цикл(нужно чтоб было построено DOM-дерево прежде чем менять state)
  async componentDidMount() {
    //тест для проверки сервера
    //   //get-запрос для проверки базы данных axios
    //   axios
    //     .get(
    //       'https://reacr-quiz-33e60-default-rtdb.europe-west1.firebasedatabase.app/quiz.json'
    //     )
    //     .then((response) => {
    //       console.log(response)
    //     })

    //обращаемся к серверуб к массиву quizes
    // try-catch, на случай ошибки
    try {
      const response = await axios.get(
        'https://reacr-quiz-33e60-default-rtdb.europe-west1.firebasedatabase.app/quizes.json'
      )
      //создаю локальную переменную quizes, для последующего добавления её в state
      const quizes = []
      //преобразуем id'шники полученных данных
      Object.keys(response.data).forEach((key, index) => {
        //на каждой итерации токнем в локальный quizes key
        quizes.push({
          id: key,
          name: ` №${index + 1}`,
        })
      })

      this.setState({
        quizes,
      })
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Список тестов</h1>

          <ul>{this.renderQuizes()}</ul>
        </div>
      </div>
    )
  }
}
