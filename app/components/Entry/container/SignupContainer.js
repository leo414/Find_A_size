import React from 'react'
import SignupLayout from '../layout/SignupLayout'

import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import UserStore from '../../../stores/UserStore'
import UserAction from '../../../actions/UserAction'

import { hashHistory } from 'react-router'
import { message } from 'antd'

class SignupContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = ({
      email: '',
      password: '',
      passwordRepeat: '',
      loading: false,
    })

    this.onSignup = this.onSignup.bind(this)
  }

  onGetUserInfo(data) {
    console.log(data)
    if(data.mailSignup.flag === 'sendMail'){
      if(data.mailSignup.sendMailSuccess === true) {
        this.setState({loading: false})
        message.success('Send email success!')
        setTimeout(() => hashHistory.push('/'), 2000)
      } else if(data.mailSignup.sendMailSuccess === 'sendFail') {
        this.setState({loading: false})
        message.error('Mail Address Already Exists', 2.5)
      }
    }

    if(data.openUserLogin.flag === 'openUserLogin') {
      if(data.openUserLogin.googleLoginSuccess || data.openUserLogin.facebookLoginSuccess) {
        localStorage.isLogin = true
        message.success('Signup success')
        setTimeout(() => hashHistory.push({pathname: '/', query: null, state: {isLogin: true}}), 2000)
      }
    }
  }

  onSignup(email, password, passwordRepeat){
    console.log(email, password, passwordRepeat)
    this.setState({
      email,
      password,
      passwordRepeat,
      loading: true,
    })

    email = email || this.state.email
    password = password || this.state.password
    passwordRepeat = passwordRepeat || this.state.passwordRepeat
    UserAction.SendSignUpMail(email, password)
  }

  onFacebookSignup(accessToken){
    UserAction.FacebookSignIn(accessToken)
  }

  onGoogleSignup(accessToken){
    UserAction.GoogleSignIn(accessToken)
  }

  render() {
    return (
      <SignupLayout
        pathname={this.props.location.pathname}
        onSignup={this.onSignup}
        onFacebookSignup={this.onFacebookSignup}
        onGoogleSignup={this.onGoogleSignup}
        loading={this.state.loading}
      />
    )
  }
}

ReactMixin.onClass(SignupContainer, Reflux.listenTo(UserStore, 'onGetUserInfo'))
export default SignupContainer
