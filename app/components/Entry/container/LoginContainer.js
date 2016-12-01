import React from 'react'
import { hashHistory } from 'react-router'
import LoginLayout from '../layout/LoginLayout'

import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import UserStore from '../../../stores/UserStore'
import UserAction from '../../../actions/UserAction'

import pbkdf2 from 'pbkdf2-sha256'
import getNowFormatDate from '../../../tools/getNowFormatDate'

import { Modal } from 'antd'

let loginOnce = false
class LoginContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = ({
      userName: '',
      password: '',
      loading: false,
    })

    this.onLogin = this.onLogin.bind(this)
  }

  onGetUserInfo(data) {
    console.log(data)
    if(data.openUserLogin.flag === 'openUserLogin') {
      if(data.openUserLogin.googleLoginSuccess || data.openUserLogin.facebookLoginSuccess) {
        localStorage.isLogin = true
        this.success('Login success')
        setTimeout(() => hashHistory.push({pathname: '/', query: null, state: {isLogin: true}}), 2000)
      }
    }

    if(data.userLogin.flag === 'userLogin') {
      if(data.userLogin.loginSuccess === true) {
        localStorage.isLogin = true
        this.success('Login success')
        this.setState({loading: false})
        setTimeout(() => hashHistory.push({pathname: '/', query: null, state: {isLogin: true}}), 2000)
      } else if(data.userLogin.loginSuccess === 'loginFail') {
        this.error('Unknown user name or bad password!', 2)
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
    this.setState({
      userName,
      password,
      loading: true,
    })
    loginOnce = true
    UserAction.GetTicket(userName || this.state.userName)
  }

  success(content) {
    Modal.success({
      title: 'Success',
      content,
      okText: 'OK',
    })
  }

  error(content) {
    Modal.error({
      title: 'Error',
      content,
      okText: 'OK',
    })
  }

  render() {
    return (
      <LoginLayout
       pathname={this.props.location.pathname}
       onFaceBookLogin={this.onFaceBookLogin}
       onGoogleLogin={this.onGoogleLogin}
       onLogin={this.onLogin}
       loading={this.state.loading}
      />
    )
  }
}

ReactMixin.onClass(LoginContainer, Reflux.listenTo(UserStore, 'onGetUserInfo'))
export default LoginContainer
