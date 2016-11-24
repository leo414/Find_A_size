import React from 'react'
import { Route } from 'react-router'

import LoginContainer from './container/LoginContainer'
import SignupContainer from './container/SignupContainer'
import SignupPhoneContainer from './container/SignupPhoneContainer'
import FindPasswordContainer from './container/FindPasswordContainer'
import ChangePasswordContainer from './container/ChangePasswordContainer'
import BindMailContainer from './container/BindMailContainer'
import BindPhoneContainer from './container/BindPhoneContainer'


const EntryRouter =
  <Route>
    <Route path="login" component={LoginContainer} />
    <Route path="sign_up" component={SignupContainer} />
    <Route path="sign_up_phone" component={SignupPhoneContainer} />

    <Route path="find_password" component={FindPasswordContainer} />
    <Route path="change_password" component={ChangePasswordContainer} />
    
    <Route path="bind_mail" component={BindMailContainer} />
    <Route path="bind_phone" component={BindPhoneContainer} />
  </Route>

export default EntryRouter
