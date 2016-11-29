import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory, IndexRoute} from 'react-router'

import './index.scss';

import Home from './components/Home'

// Entry
import LoginContainer from './components/Entry/container/LoginContainer'
import EntryRouter from './components/Entry/Router'

import LoginFail from './components/Entry/LoginFail'
import LoginSuccess from './components/Entry/LoginSuccess'

import Account from './components/Account'

const App = props => {
  let isLogin;
  try {
    isLogin = props.location.state.isLogin
  } catch(err) {
    isLogin = false
  }
  return (
    <div>
      <Home isLogin={isLogin}/> {props.children}
    </div>
  )
}


render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={LoginContainer}/>
      {EntryRouter}
    </Route>

    <Route path="/login_success" component={LoginSuccess}></Route>
    <Route path="/login_fail" component={LoginFail}></Route>

    <Route path="/account" component={Account}></Route>
    <Route path="*" component={App} />
  </Router>
), document.getElementById('app'))
