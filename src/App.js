import React from 'react'
import Layout from './hoc/Layout/Layout'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import Quiz from './containers/Quiz/Quiz'
import Auth from './containers/Auth/Auth'
import QuizCreator from './containers/QuizCreator/QuizCreator'
import QuizList from './containers/QuizList/QuizList'
import { connect } from 'react-redux'
import Logout from './components/Logout/Logout'
import { autoLogin } from './store/actions/auth'

class App extends React.Component {
  //если что-то хранится в локал сторэдж, то автоматически происходит аутентификация
  componentDidMount() {
    this.props.autoLogin()
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        {/* <Route path="/quiz-create" component={QuizCreator} /> */}
        <Route path="/quiz/:id" component={Quiz} />
        <Route path="/" exact component={QuizList} />
        {/* на случай если указан неверный путь */}
        <Redirect to={'/'} />
      </Switch>
    )

    //если позователь залогинен, то
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          {/* <Route path="/auth" component={Auth} /> */}
          <Route path="/quiz-create" component={QuizCreator} />
          <Route path="/quiz/:id" component={Quiz} />
          <Route path="logout" component={Logout} />
          <Route path="/" exact component={QuizList} />
          {/* на случай если указан неверный путь */}
          <Redirect to={'/'} />
        </Switch>
      )
    }

    return <Layout>{routes}</Layout>
  }
}

function mapStateToProps(state) {
  return {
    //авторизован пользователь или нет?
    //!! приводит к булевскому типу
    isAuthenticated: !!state.auth.token,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin()),
  }
}

//из-за connect пропал роут, поэтому hoc withRouter
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
