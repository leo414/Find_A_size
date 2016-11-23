import React from 'react'
import { hashHistory } from 'react-router'
import LoginLayout from './LoginLayout'

import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import UserStore from '../../stores/UserStore'
import UserAction from '../../actions/UserAction'

class LoginContainer extends React.Component {
  onGetUserInfo(data) {
    if(data.openUserLogin.flag !== 'openUserLogin') return
    if(data.openUserLogin.googleLoginSuccess || data.openUserLogin.facebookLoginSuccess) {
      hashHistory.push({pathname: '/', query: null, state: {isLogin: true}})
    }
  }

  onFaceBookLogin(accessToken){
    UserAction.FacebookSignIn(accessToken)
  }

  onGoogleLogin(accessToken){
    UserAction.GoogleSignIn(accessToken)
  }

  onLogin(userName, password){
    console.log(userName, password)
    // UserAction.
  }

  render() {
    return (
      <LoginLayout
       pathname={this.props.location.pathname}
       onFaceBookLogin={this.FaceBookLogin}
       onGoogleLogin={this.GoogleLogin}
       onLogin={this.onLogin}
      />
    )
  }
}

ReactMixin.onClass(LoginContainer, Reflux.listenTo(UserStore, 'onGetUserInfo'))
export default LoginContainer
