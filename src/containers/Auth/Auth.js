import React, { Component } from 'react'
import classes from './Auth.module.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import is from 'is_js' //библиотека micro check: npm i is_js / yarn add is-js
import axios from 'axios' //библиотека-аналог fetch yarn add axios

//это готовое regex cо stackoverflow для валидации email
// function validateEmail(email) {
//   const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//   return re.test(String(email).toLowerCase())
// }

export default class Auth extends Component {
  state = {
    isFormValid: false,
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

  loginHandler = async () => {
    //firebase rest auth авторизация  https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true,
    }

    try {
      const response = await axios.post(
        //[API_KEY] с firebase вкладка обзор проекта / настройка
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDZ7o3sr0ugFlz3U4lt85Gyf1Gbw1zoyHg',
        authData
      )
      console.log(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  registerHandler = async () => {
    //firebase rest auth регистрация
    //формирую объект для отправки на сервер
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true,
    }

    try {
      const response = await axios.post(
        //[API_KEY] с firebase вкладка обзор проекта / настройка
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDZ7o3sr0ugFlz3U4lt85Gyf1Gbw1zoyHg',
        authData
      )
      console.log(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  submitHandler = (event) => {
    event.preventDefault()
  }

  validateControl(value, validation) {
    if (!validation) {
      return true //если параметр validation отсутствует
    }

    let isValid = true //зададим значение по умолчанию и будем проверять validation

    if (validation.required) {
      isValid = value.trim() !== '' && isValid //&& isValid - в случае если isValid = false
    }

    if (validation.email) {
      // isValid = validateEmail(value) && isValid
      isValid = is.email(value) && isValid
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid
    }

    return isValid
  }

  onChangeHandler = (Event, controlName) => {
    //console.log(`${controlName}:`, Event.target.value)

    const formControls = { ...this.state.formControls } //оператор spread развернет (сделае копию) this.state.formControls
    const control = { ...formControls[controlName] } //текущий объект email/password из стейта

    //в переменной контрол будем переопределять значения, зная что state не мутирует
    control.value = Event.target.value
    control.touched = true
    //для valid текущее значнеие control.value будем сравнивать с условием заданным в control.validation
    control.valid = this.validateControl(control.value, control.validation)

    //вношу изменения в переменную formControls
    formControls[controlName] = control

    //проверка валидации всей формы
    let isFormValid = true
    Object.keys(formControls).forEach((name) => {
      isFormValid = formControls[name].valid && isFormValid
    })

    this.setState({
      formControls, //the same: formControls: formControls
      isFormValid,
    })
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
          onChange={(Event) => this.onChangeHandler(Event, controlName)}
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

            <Button
              type="success"
              onClick={this.loginHandler}
              disabled={!this.state.isFormValid} // если форма невалидная, то disabled = true
            >
              Войти
            </Button>
            <Button
              type="primary"
              onClick={this.registerHandler}
              disabled={!this.state.isFormValid}
            >
              Зарегистрироваться
            </Button>
          </form>
        </div>
      </div>
    )
  }
}
