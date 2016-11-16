import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory, IndexRoute} from 'react-router'

import './index.scss';

import Home from './components/Home'

import Login from './components/Entry/Login'
import Signup from './components/Entry/Signup'
import FindPassword from './components/Entry/FindPassword'

import Account from './components/Account'

const App = ({children}) => <div> <Home /> {children}</div>

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Login}/>
      <Route path="login" component={Login} />
      <Route path="sign_up" component={Signup} />
      <Route path="find_password" component={FindPassword} />
    </Route>
    <Route path="/account" component={Account}></Route>
    <Route path="*" component={App} />
  </Router>
), document.getElementById('app'))
