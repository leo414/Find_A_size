import React from 'react'
import BindPhoneLayout from '../layout/BindPhoneLayout'

import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import UserStore from '../../../stores/UserStore'
import UserAction from '../../../actions/UserAction'

let self;
let timeOut;
class BindPhoneContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = ({
      isClickGetCode: false,
      phone: '',
    })
  }

  onUserStoreChange(data) {
    // if(data.sendResetSmsCode.flag === 'sendSms'){
    //   if(data.sendSmsCode.sendSmsSuccess) {
    //     // do sth
    //   }
    // } else if(data.phoneResetPassword.falg === 'resetPassword') {
    //   if(data.phoneSignup.phoneSignupSuccess) {
    //     // do sth
    //   }
    // }
  }

  getCode(phone){
    console.log(phone)
    if(!phone) return
    self.setState({
      isClickGetCode: true,
      phone,
    })
    timeOut = setTimeout(() => self.setState({isClickGetCode: false}), 60000)
    // UserAction.SendResetPasswordSms(86, phone)
  }

  onSubmit(phone, code){
    console.log(phone, code)
    phone = phone || self.state.phone
    // UserAction.ReceiveResetPasswordSms(phone, code)
  }

  componentWillUnmount(){
    timeOut && clearInterval(timeOut)
    timeOut = false
  }

  render() {
    const { isClickGetCode } = this.state
    self = this
    return (
      <BindPhoneLayout
        pathname={this.props.location.pathname}
        getCode={this.getCode}
        isClickGetCode={isClickGetCode}
        onSubmit={this.onSubmit}
      />
    )
  }
}

export default BindPhoneContainer
