import React from 'react'
import ResetPdPhoneLayout from '../layout/ResetPdPhoneLayout'
import { hashHistory } from 'react-router'

import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import UserStore from '../../../stores/UserStore'
import UserAction from '../../../actions/UserAction'

import { Modal,message } from 'antd'
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

const registerPhoneForm = phone => [
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
class ResetPdPhoneContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = ({
      isClickGetCode: false,
      loading: false,
    })

    this.getCode = this.getCode.bind(this)
    this.onResetPssword = this.onResetPssword.bind(this)
  }
  onUserStoreChange(data) {
    if(data.phoneResetPassword.flag === 'resetPassword') {
      if(data.phoneResetPassword.resetPasswordSuccess === true) {
        localStorage.isLogin = true
        this.success('Reset password success')
        this.setState({loading: false})
        setTimeout(() => hashHistory.push({pathname: '/', query: null, state: {isLogin: true}}), 2000)
        return
      } else if (data.phoneResetPassword.resetPasswordSuccess === 'resetFail'){
        this.setState({loading: false})
        this.error('Verification Code Error!')
        return
      }
    }

    if(data.sendResetSmsCode.flag === 'sendSms'){
      if(data.sendResetSmsCode.sendSmsSuccess === true) {
        this.success('Send sms code success!')
      } else if(data.sendResetSmsCode.sendSmsSuccess === 'sendFail') {
        this.error('Phone Number Already Exists')
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
    message.success('After 60 seconds you can re-obtain SMS verification code', 2.5)
    UserAction.SendResetPasswordSms(phone)
  }

  onResetPssword(phone, code, password, passwordRepeat) {
    let errorMsg = validataFunc(registerForm(phone, password, code));
    if (errorMsg){
      message.error(errorMsg)
      return
    }

    if(password !== passwordRepeat) {
      message.error('The two passwords are not the same')
      return
    }

    this.setState({loading: true,})
    UserAction.ReceiveResetPasswordSms(phone, code, password)
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
      <ResetPdPhoneLayout
        pathname={this.props.location.pathname}
        getCode={this.getCode}
        onResetPssword={this.onResetPssword}
        isClickGetCode={isClickGetCode}
        loading={this.state.loading}
      />
    )
  }
}

ReactMixin.onClass(ResetPdPhoneContainer, Reflux.listenTo(UserStore, 'onUserStoreChange'))
export default ResetPdPhoneContainer
