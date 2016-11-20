import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory, IndexRoute} from 'react-router'

import './index.scss';

import Home from './components/Home'

// Entry
import LoginContainer from './components/Entry/LoginContainer'
import SignupContainer from './components/Entry/SignupContainer'
import FindPassword from './components/Entry/FindPassword'
import LoginFail from './components/Entry/LoginFail'
import LoginSuccess from './components/Entry/LoginSuccess'

import Account from './components/Account'

const App = ({children}) => <div> <Home /> {children}</div>

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={LoginContainer}/>
      <Route path="login" component={LoginContainer} />
      <Route path="sign_up" component={SignupContainer} />
      <Route path="find_password" component={FindPassword} />
    </Route>

    <Route path="/login_success" component={LoginSuccess}></Route>
    <Route path="/login_fail" component={LoginFail}></Route>

    <Route path="/account" component={Account}></Route>
    <Route path="*" component={App} />
  </Router>
), document.getElementById('app'))
