import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'

import './index.scss';

import App from './components/App'

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>

    </Route>
    <Route path="*" component={App} />
  </Router>
), document.getElementById('app'))
