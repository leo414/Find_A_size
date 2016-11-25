import React from 'react'
import { hashHistory } from 'react-router'
import LoginLayout from '../layout/LoginLayout'

import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import UserStore from '../../../stores/UserStore'
import UserAction from '../../../actions/UserAction'

import pbkdf2 from 'pbkdf2-sha256'
import getNowFormatDate from '../../../tools/getNowFormatDate'

let self;
class LoginContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = ({
      userName: '',
      password: '',
    })
  }

  onGetUserInfo(data) {
    if(data.openUserLogin.flag === 'openUserLogin') {
      if(data.openUserLogin.googleLoginSuccess || data.openUserLogin.facebookLoginSuccess) {
        hashHistory.push({pathname: '/', query: null, state: {isLogin: true}})
      }
    }

    if(data.userTicket.flag === 'getTicket'){
      const { salt } = data.userTicket
      const { userName,  password } = this.state
      if(salt && userName && password) {
        const timestamp = getNowFormatDate()
        const pbkdf2Password_1 = pbkdf2(password, salt, 1000, 24).toString('hex') + timestamp
        const pbkdf2Password_2 = pbkdf2(pbkdf2Password_1, salt, 1000, 24).toString('hex')
        UserAction.UserLogin(userName, pbkdf2Password_2, timestamp)
      }
    }

    if(data.userLogin.flag === 'userLogin') {
      if(data.userLogin.loginSuccess) console.log('登录成功！')
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
    self.setState({
      userName,
      password,
    })
    UserAction.GetTicket(userName)
  }

  render() {
    self = this
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
