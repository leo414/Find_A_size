import React from 'react'
import { hashHistory } from 'react-router'
import LoginLayout from '../layout/LoginLayout'

import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import UserStore from '../../../stores/UserStore'
import UserAction from '../../../actions/UserAction'

import pbkdf2 from 'pbkdf2-sha256'
import getNowFormatDate from '../../../tools/getNowFormatDate'

import { message } from 'antd'

let self
let loginOnce = false
class LoginContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = ({
      userName: '',
      password: '',
      loading: false,
    })
  }

  onGetUserInfo(data) {
    console.log(data)
    if(data.openUserLogin.flag === 'openUserLogin') {
      if(data.openUserLogin.googleLoginSuccess || data.openUserLogin.facebookLoginSuccess) {
        localStorage.isLogin = true
        message.success('Login success')
        // setTimeout(() => hashHistory.push({pathname: '/', query: null, state: {isLogin: true}}), 2000)
        setTimeout(() => hashHistory.push('/'), 2000)
      }
    }

    if(data.userLogin.flag === 'userLogin') {
      if(data.userLogin.loginSuccess === true) {
        localStorage.isLogin = true
        message.success('Login success')
        this.setState({loading: false})
        // setTimeout(() => hashHistory.push({pathname: '/', query: null, state: {isLogin: true}}), 2000)
        setTimeout(() => hashHistory.push('/'), 2000)
      } else if(data.userLogin.loginSuccess === 'loginFail') {
        message.error('Unknown user name or bad password!', 2)
        this.setState({loading: false})
      }
    }

    if(data.userTicket.flag === 'getTicket'){
      const { salt } = data.userTicket
      const { userName,  password } = this.state
      if(salt && userName && password) {
        if(!loginOnce) return
        loginOnce = false
        const timestamp = getNowFormatDate()
        const pbkdf2Password_1 = pbkdf2(password || this.state.password, salt, 1000, 24).toString('hex') + timestamp
        const pbkdf2Password_2 = pbkdf2(pbkdf2Password_1, salt, 1000, 24).toString('hex')
        UserAction.UserLogin(userName || this.state.password, pbkdf2Password_2, timestamp)
      }
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
      loading: true,
    })
    loginOnce = true
    UserAction.GetTicket(userName || self.state.userName)
  }

  render() {
    self = this
    return (
      <LoginLayout
       pathname={this.props.location.pathname}
       onFaceBookLogin={this.FaceBookLogin}
       onGoogleLogin={this.GoogleLogin}
       onLogin={this.onLogin}
       loading={this.state.loading}
      />
    )
  }
}

ReactMixin.onClass(LoginContainer, Reflux.listenTo(UserStore, 'onGetUserInfo'))
export default LoginContainer
