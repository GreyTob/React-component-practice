import React, { Component } from 'react'
import classes from './Auth.module.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'

export default class Auth extends Component {
  state = {
    formControls: {
      email: {
        type: 'email',
        value: '',
        label: 'Email',
        errorMessage: 'Введите корректный Email',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        },
      },
      password: {
        type: 'password',
        value: '',
        label: 'Пароль',
        errorMessage: 'Введите корректный Пароль',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6,
        },
      },
    },
  }

  loginHandler = () => {}

  registerHandler = () => {}

  submitHandler = (event) => {
    event.preventDefault()
  }

  onChanheHandler = (Event, controlName) => {
    console.log(`${controlName}:`, Event.target.value)
  }

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          errorMessage={control.errorMessage}
          shouldValidate={!!control.validation} //привожу к булевому типу - !!
          onChange={(Event) => this.onChanheHandler(Event, controlName)}
        />
      )
    })
  }

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Авторизация</h1>

          <form
            action="#"
            onSubmit={this.submitHandler}
            className={classes.AuthForm}
          >
            {this.renderInputs()}

            <Button type="success" onClick={this.loginHandler}>
              Войти
            </Button>
            <Button type="primary" onClick={this.registerHandler}>
              Зарегистрироваться
            </Button>
          </form>
        </div>
      </div>
    )
  }
}
