import React, { Component } from 'react'
import classes from './QuizCreator.module.css'
import Button from '../../components/UI/Button/Button'
import Select from '../../components/UI/Select/Select'
import Input from '../../components/UI/Input/Input'
import { createControl, validate, validateForm } from '../../form/formFramework'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'

//генерация вариантов ответа
function createOptionControl(number) {
  return createControl(
    {
      label: `Вариант ответа ${number}`,
      errorMessage: 'Значение не может быть пустым',
      id: number,
    },
    { required: true }
  )
}

//обнуление formControls перед созданием нового вопроса
function createFormControl() {
  return {
    question: createControl(
      {
        //параметры config
        label: 'Введите вопрос',
        errorMessage: 'Вопрос не может быть пустым',
      },
      {
        //параметры validation
        required: true,
      }
    ),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  }
}

export default class QuizCreator extends Component {
  state = {
    quiz: [], //для хранения созданных вопросов
    isFormValid: false,
    rightAnswerId: 1, //значение по умолчанию
    formControls: createFormControl(),
  }

  submitHandler = (Event) => {
    Event.preventDefault()
  }

  addQuestionHandler = (Event) => {
    Event.preventDefault()

    //сделаем копию массива quiz. метод concat() без параметров вернет копию массива
    const quiz = this.state.quiz.concat() // это защищает от мутаций
    const index = quiz.length + 1 //будем использовать в качестве id

    //деструктуризация для сокращения окда
    const {
      question,
      option1,
      option2,
      option3,
      option4,
    } = this.state.formControls

    // формируем объект каждого из вопросов
    const questonItem = {
      question: question.value, //за счет деструктуризации не прописывается this.state.formControls.
      id: index,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        { text: option1.value, id: option1.id }, //за счет деструктуризации не прописывается this.state.formControls.
        { text: option2.value, id: option2.id },
        { text: option3.value, id: option3.id },
        { text: option4.value, id: option4.id },
      ],
    }

    //сформированный объект добавляем в массив quiz
    quiz.push(questonItem)

    //меняем state и обнуляем состояние страницы
    this.setState({
      quiz,
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControl(),
    })
  }

  createQuizHandler = (Event) => {
    Event.preventDefault()

    console.log(this.state.quiz)
    //TODO: server
  }

  changeHandler = (value, controlName) => {
    //пример в Auth.js
    const formControls = { ...this.state.formControls } //оператор spread развернет (сделае копию) this.state.formControls
    const control = { ...formControls[controlName] } //текущий объект quistion и option 1,2,3,4 из стейта

    control.touched = true
    control.value = value
    control.valid = validate(control.value, control.validation)

    formControls[controlName] = control

    this.setState({
      formControls,
      isFormValid: validateForm(formControls),
    })
  }

  renderControl() {
    //генерация input
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName] //текущий объект quistion и option 1,2,3,4 из стейта

      return (
        <Auxiliary key={controlName + index}>
          <Input
            label={control.label}
            errorMessage={control.errorMessage}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            onChange={(Event) =>
              this.changeHandler(Event.target.value, controlName)
            }
          />

          {index === 0 ? <hr /> : null}
        </Auxiliary>
      )
    })
  }

  selectChangeHandler = (Event) => {
    this.setState({
      rightAnswerId: +Event.target.value,
    })
  }

  render() {
    const select = (
      <Select
        label="Выберите правильный ответ"
        value={this.state.rightAnswerId}
        onChange={this.selectChangeHandler}
        options={[
          { text: 1, value: 1 },
          { text: 2, value: 2 },
          { text: 3, value: 3 },
          { text: 4, value: 4 },
        ]}
      />
    )

    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Создание теста</h1>
          <form onSubmit={this.submitHandler}>
            {this.renderControl()}
            {select}
            <Button
              type="primary"
              onClick={this.addQuestionHandler}
              disabled={!this.state.isFormValid}
            >
              Добавить вопрос
            </Button>
            <Button
              type="success"
              onClick={this.createQuizHandler}
              disabled={this.state.quiz.length === 0} //если нет вопросов, то тест не создатся
            >
              Создать тест
            </Button>
          </form>
        </div>
      </div>
    )
  }
}
