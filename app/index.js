import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute} from 'react-router'

import './index.scss';

import Home from './components/Home'

import Login from './components/Entry/Login'
import Signup from './components/Entry/Signup'
import FindPassword from './components/Entry/FindPassword'

const App = ({children}) => <div> <Home /> {children}</div>

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Login}/>
      <Route path="login" component={Login} />
      <Route path="sign_up" component={Signup} />
      <Route path="find_password" component={FindPassword} />
    </Route>
  </Router>
), document.getElementById('app'))

// <Route path="*" component={App} />
