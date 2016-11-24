import React from 'react'
import ResetPdPhoneLayout from '../layout/ResetPdPhoneLayout'

import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import UserStore from '../../../stores/UserStore'
import UserAction from '../../../actions/UserAction'

let self;
let timeOut;
class ResetPdPhoneContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = ({
      sendSmsSuccess: false,
      phoneSignupSuccess: false,
      isClickGetCode: false,
      phone: '',
      password: '',
      passwordRepeat: '',
    })
  }
  onUserStoreChange(data) {
    if(data.sendResetSmsCode.flag === 'sendSms'){
      this.setState({
        sendSmsSuccess: data.sendResetSmsCode.sendSmsSuccess
      })
    } else if(data.phoneResetPassword.falg === 'resetPassword') {
      this.setState({
        phoneSignupSuccess: data.phoneResetPassword.resetPasswordSuccess
      })
    }
  }

  getCode(phone, password, passwordRepeat){
    console.log(phone)
    if(!phone) return
    self.setState({
      isClickGetCode: true,
      phone,
      password,
      passwordRepeat,
    })
    timeOut = setTimeout(() => self.setState({isClickGetCode: false}), 60000)
    // UserAction.SendResetPasswordSms(86, phone)
  }

  onSubmitSignup(phone, code, password, passwordRepeat) {
    console.log(phone, code, password, passwordRepeat)
    phone = phone || self.state.phone
    password = password || self.state.password
    passwordRepeat = passwordRepeat || self.state.passwordRepeat
    console.log(phone, password, passwordRepeat)
    // UserAction.ReceiveResetPasswordSms(phone, code, password)
  }

  componentWillUnmount(){
    timeOut && clearInterval(timeOut)
    timeOut = false
  }

  render() {
    const {sendSmsSuccess, phoneSignupSuccess, isClickGetCode} = this.state
    self = this
    return (
      <ResetPdPhoneLayout
        sendSmsSuccess={sendSmsSuccess}
        phoneSignupSuccess={phoneSignupSuccess}
        pathname={this.props.location.pathname}
        getCode={this.getCode}
        onSubmitSignup={this.onSubmitSignup}
        isClickGetCode={isClickGetCode}
      />
    )
  }
}

ReactMixin.onClass(ResetPdPhoneContainer, Reflux.listenTo(UserStore, 'onUserStoreChange'))
export default ResetPdPhoneContainer
