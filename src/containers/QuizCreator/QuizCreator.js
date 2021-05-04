import React, { Component } from 'react'
import classes from './QuizCreator.module.css'
import Button from '../../components/UI/Button/Button'
import Select from '../../components/UI/Select/Select'
import Input from '../../components/UI/Input/Input'
import { createControl } from '../../form/formFramework'
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
    rightAnswerId: 1, //значение по умолчанию
    formControls: createFormControl(),
  }

  submitHandler = (Event) => {
    Event.preventDefault()
  }

  addQuestionHandler = () => {}

  createQuizHandler = () => {}

  changeHandker = (value, controlName) => {}

  renderControl() {
    //генерация input
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName] //это quistion и option 1,2,3,4

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
              this.changeHandker(Event.target.value, controlName)
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
            <Button type="primary" onClick={this.addQuestionHandler}>
              Добавить вопрос
            </Button>
            <Button type="success" onClick={this.createQuizHandler}>
              Создать тест
            </Button>
          </form>
        </div>
      </div>
    )
  }
}
