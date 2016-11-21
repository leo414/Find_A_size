import React from 'react'
import { hashHistory } from 'react-router'
import LoginLayout from './LoginLayout'

import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import UserStore from '../../stores/UserStore'

class LoginContainer extends React.Component {
  onGetUserInfo(data) {
    if(data.openUserLogin.flag !== 'openUserLogin') return
    if(data.openUserLogin.googleLoginSuccess || data.openUserLogin.facebookLoginSuccess) {
      hashHistory.push({pathname: '/', query: null, state: {isLogin: true}})
    }
  }

  render() {
    return <LoginLayout pathname={this.props.location.pathname} />
  }
}

ReactMixin.onClass(LoginContainer, Reflux.listenTo(UserStore, 'onGetUserInfo'))
export default LoginContainer
