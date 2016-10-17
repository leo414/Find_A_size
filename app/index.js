import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'

import './index.scss';

import EntryRoute from './components/Entry/route'

import App from './components/App'
import Login from './components/Entry/Login'

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="login" component={Login} />
    </Route>
  </Router>
), document.getElementById('app'))

// <Route path="*" component={App} />
