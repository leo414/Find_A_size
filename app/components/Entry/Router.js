import React from 'react'
import { Route } from 'react-router'

import LoginContainer from './container/LoginContainer'
import SignupContainer from './container/SignupContainer'
import SignupPhoneContainer from './container/SignupPhoneContainer'

import SendFindPdMailContainer from './container/SendFindPdMailContainer'
import ResetPdMailContainer from './container/ResetPdMailContainer'
import ResetPdPhoneContainer from './container/ResetPdPhoneContainer'

import ChangePasswordContainer from './container/ChangePasswordContainer'

import BindMailContainer from './container/BindMailContainer'
import BindPhoneContainer from './container/BindPhoneContainer'

const EntryRouter =
  <Route>
    <Route path="login" component={LoginContainer} />
    <Route path="sign_up" component={SignupContainer} />
    <Route path="sign_up_phone" component={SignupPhoneContainer} />

    <Route path="reset_pd_mail" component={SendFindPdMailContainer} />
    <Route path="send_pd_mail" component={ResetPdMailContainer} />
    <Route path="reset_pd_phone" component={ResetPdPhoneContainer} />

    <Route path="change_password" component={ChangePasswordContainer} />

    <Route path="bind_mail" component={BindMailContainer} />
    <Route path="bind_phone" component={BindPhoneContainer} />
  </Route>

export default EntryRouter
