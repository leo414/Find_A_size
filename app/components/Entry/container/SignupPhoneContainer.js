import React from 'react'
import SignupPhoneLayout from '../layout/SignupPhoneLayout'
import { hashHistory } from 'react-router'

import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import UserStore from '../../../stores/UserStore'
import UserAction from '../../../actions/UserAction'

import { message } from 'antd'

let self;
let timeOut;
class SignupPhoneContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = ({
      isClickGetCode: false,
      phone: '',
      password: '',
      passwordRepeat: '',
      loading: false,
    })
  }
  onUserStoreChange(data) {
    console.log(data)
    if(data.phoneSignup.flag === 'phoneSignup') {
      if(data.phoneSignup.phoneSignupSuccess === true) {
        localStorage.isLogin = true
        message.success('Signup success')
        this.setState({loading: false})
        setTimeout(() => hashHistory.push('/'), 2000)
        return
      } else if (data.phoneSignup.phoneSignupSuccess === 'signFail') {
        this.setState({loading: false})
        message.error('Verification Code Error!', 2.5)
        return
      }
    }

    if(data.sendSmsCode.flag === 'sendSms'){
      if(data.sendSmsCode.sendSmsSuccess === true) {
        message.success('Send sms code success!')
      } else if(data.sendSmsCode.sendSmsSuccess === 'sendFail') {
        message.error('Phone Number Already Exists', 2.5)
      }
    }
  }

  getCode(phone, password, passwordRepeat){
    if(!phone && !self.state.phone) return
    self.setState({
      isClickGetCode: true,
      phone,
      password,
      passwordRepeat,
    })
    timeOut = setTimeout(() => self.setState({isClickGetCode: false}), 60000)

    UserAction.SendSignUpSms(86, phone || self.state.phone)
  }

  onSubmitSignup(phone, code, password, passwordRepeat) {
    console.log(phone, code, password, passwordRepeat)
    console.log(self.state)
    self.setState({
      phone,
      code,
      password,
      passwordRepeat,
      loading: true,
    })
    phone = phone || self.state.phone
    password = password || self.state.password
    passwordRepeat = passwordRepeat || self.state.passwordRepeat
    console.log(phone, password, passwordRepeat)
    UserAction.ReceiveSignUpSms(phone, code, password)
  }

  componentWillUnmount(){
    timeOut && clearInterval(timeOut)
    timeOut = false
  }

  render() {
    const { isClickGetCode } = this.state
    self = this
    return (
      <SignupPhoneLayout
        pathname={this.props.location.pathname}
        getCode={this.getCode}
        onSubmitSignup={this.onSubmitSignup}
        isClickGetCode={isClickGetCode}
        loading={this.state.loading}
      />
    )
  }
}

ReactMixin.onClass(SignupPhoneContainer, Reflux.listenTo(UserStore, 'onUserStoreChange'))
export default SignupPhoneContainer
