import React from 'react'
import SignupPhoneLayout from '../layout/SignupPhoneLayout'
import { hashHistory } from 'react-router'

import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import UserStore from '../../../stores/UserStore'
import UserAction from '../../../actions/UserAction'

import { Modal, message } from 'antd'
import validataFunc from '../../../tools/Validator'

const registerForm = (phone, password, code) => [
  {
    value: phone,
    rules: [
      {
        strategy: 'isMobile',
        errorMsg: 'The phone number format is incorrect'
      }
    ]
  },{
    value: code,
    rules: [
      {
        strategy: 'isNoEmpty',
        errorMsg: 'The code can not be empty'
      }
    ]
  },{
    value: password,
    rules: [
      {
        strategy: 'minLength:6',
        errorMsg: 'The password at least 6 characters',
      }
    ]
  },
]

const registerPhoneForm = (phone) => [
  {
    value: phone,
    rules: [
      {
        strategy: 'isMobile',
        errorMsg: 'The phone number format is incorrect'
      }
    ]
  }
]

let timeOut;
class SignupPhoneContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = ({
      isClickGetCode: false,
      loading: false,
    })

    this.getCode = this.getCode.bind(this)
    this.onSubmitSignup = this.onSubmitSignup.bind(this)
  }
  onUserStoreChange(data) {
    console.log(data)
    if(data.sendSmsCode.flag === 'sendSms'){
      if(data.sendSmsCode.sendSmsSuccess === true) {
        message.success('SMS has been sent to your phone')
      } else if(data.sendSmsCode.sendSmsSuccess === 'sendFail') {
        this.error('Phone Number Already Exists')
      }
    }

    if(data.phoneSignup.flag === 'phoneSignup') {
      if(data.phoneSignup.phoneSignupSuccess === true) {
        localStorage.isLogin = true
        this.success('Signup success')
        this.setState({loading: false})
        setTimeout(() => hashHistory.push({pathname: '/', query: null, state: {isLogin: true}}), 2000)
      } else if (data.phoneSignup.phoneSignupSuccess === 'signFail') {
        this.setState({loading: false})
        this.error('Verification Code Error!')
      }
    }
  }

  getCode(phone){
    let errorMsg = validataFunc(registerPhoneForm(phone));
    if (errorMsg){
      message.error(errorMsg)
      return
    }
    this.setState({
      isClickGetCode: true,
    })
    timeOut = setTimeout(() => this.setState({isClickGetCode: false}), 60000)

    UserAction.SendSignUpSms(phone)
  }

  onSubmitSignup(phone, code, password, passwordRepeat) {
    let errorMsg = validataFunc(registerForm(phone, password, code));
    if (errorMsg){
      message.error(errorMsg)
      return
    }

    if(password !== passwordRepeat) {
      message.error('The two passwords are not the same')
      return
    }

    this.setState({loading: true})
    UserAction.ReceiveSignUpSms(phone, code, password)
  }

  componentWillUnmount(){
    timeOut && clearInterval(timeOut)
    timeOut = false
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
    const { isClickGetCode } = this.state
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
