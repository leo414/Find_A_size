import React from 'react'
import ResetPdPhoneLayout from '../layout/ResetPdPhoneLayout'
import { hashHistory } from 'react-router'

import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import UserStore from '../../../stores/UserStore'
import UserAction from '../../../actions/UserAction'

import { message } from 'antd'

let self;
let timeOut;
class ResetPdPhoneContainer extends React.Component {
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
    if(data.phoneResetPassword.flag === 'resetPassword') {
      if(data.phoneResetPassword.resetPasswordSuccess === true) {
        localStorage.isLogin = true
        message.success('Reset password success')
        this.setState({loading: false})
        setTimeout(() => hashHistory.push('/account'), 2000)
        return
      } else if (data.phoneResetPassword.resetPasswordSuccess === 'resetFail'){
        this.setState({loading: false})
        message.error('Verification Code Error!', 2.5)
        return
      }
    }

    if(data.sendResetSmsCode.flag === 'sendSms'){
      if(data.sendResetSmsCode.sendSmsSuccess === true) {
        message.success('Send sms code success!')
      } else if(data.sendResetSmsCode.sendSmsSuccess === 'sendFail') {
        message.error('Phone Number Already Exists', 2.5)
      }

    }
  }

  getCode(phone, password, passwordRepeat){
    console.log(phone)
    if(!phone && !self.state.phone) return
    self.setState({
      isClickGetCode: true,
      phone,
      password,
      passwordRepeat,
    })
    timeOut = setTimeout(() => self.setState({isClickGetCode: false}), 60000)
    UserAction.SendResetPasswordSms(phone || self.state.phone)
  }

  onResetPssword(phone, code, password, passwordRepeat) {
    console.log(phone, code, password, passwordRepeat)
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
    UserAction.ReceiveResetPasswordSms(phone, code, password)
  }

  componentWillUnmount(){
    timeOut && clearInterval(timeOut)
    timeOut = false
  }

  render() {
    const { isClickGetCode } = this.state
    self = this
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
