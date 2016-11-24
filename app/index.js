import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory, IndexRoute} from 'react-router'

import './index.scss';

import Home from './components/Home'

// Entry
import LoginContainer from './components/Entry/container/LoginContainer'
import SignupContainer from './components/Entry/container/SignupContainer'
import SignupPhoneContainer from './components/Entry/container/SignupPhoneContainer'
import FindPasswordContainer from './components/Entry/container/FindPasswordContainer'

import LoginFail from './components/Entry/LoginFail'
import LoginSuccess from './components/Entry/LoginSuccess'

import Account from './components/Account'

const App = props => {
  let isLogin
  try {
    isLogin = props.location.state.isLogin
  } catch(err) {
    isLogin = false
  }
  return <div> <Home isLogin={isLogin} /> {props.children}</div>
}

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={LoginContainer}/>
      <Route path="login" component={LoginContainer} />
      <Route path="sign_up" component={SignupContainer} />
      <Route path="sign_up_phone" component={SignupPhoneContainer} />
      <Route path="find_password" component={FindPasswordContainer} />
    </Route>

    <Route path="/login_success" component={LoginSuccess}></Route>
    <Route path="/login_fail" component={LoginFail}></Route>

    <Route path="/account" component={Account}></Route>
    <Route path="*" component={App} />
  </Router>
), document.getElementById('app'))
