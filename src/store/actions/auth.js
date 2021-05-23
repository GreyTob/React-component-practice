import axios from 'axios'
import { AUTH_SUCCESS, AUTH_LOGOUT } from './actionTypes'

export function auth(email, password, isLogin) {
  return async (dispatch) => {
    const authData = {
      email,
      password,
      returnSecureToken: true, //нужен по умолчанию в firebase
    }

    //если регистрация
    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDZ7o3sr0ugFlz3U4lt85Gyf1Gbw1zoyHg'

    //если вход
    if (isLogin) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDZ7o3sr0ugFlz3U4lt85Gyf1Gbw1zoyHg'
    }

    //[API_KEY] с firebase вкладка обзор проекта / настройка
    const response = await axios.post(url, authData)
    //console.log(response.data)
    const data = response.data

    //токен дается на час(записано в response.data.expiresIn), если он прошел то нужно логиниться заново
    const expiresinDate = new Date(new Date().getTime + data.expiresIn * 1000)

    //чтобы поддерживать текущую сессию нужно полученный с сервера токен положить в локал сторэдж
    localStorage.setItem('toekn', data.idToken)
    localStorage.setItem('userId', data.localId)
    localStorage.setItem('expiresinDate', expiresinDate)
    console.log(localStorage)

    dispatch(authSuccess(data.idToken))
    dispatch(autoLogout(data.expiresIn))
  }
}

export function authSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    token,
  }
}

// export function autoLogin() {
//   return dispatch() => {

//   }
// }

export function autoLogout(time) {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout())
    }, time * 1000)
  }
}

export function logout() {
  //очистить локал сторэдж
  localStorage.removeItem('toekn')
  localStorage.removeItem('userId')
  localStorage.removeItem('expiresinDate')

  return {
    type: AUTH_LOGOUT,
  }
}
