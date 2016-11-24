import React from 'react'
import SignupPhoneLayout from '../layout/SignupPhoneLayout'

import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import UserStore from '../../../stores/UserStore'
import UserAction from '../../../actions/UserAction'

let self;
class SignupPhoneContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = ({
      sendSmsSuccess: false,
      phoneSignupSuccess: false,
      isClickGetCode: false,
    })
    self = this
  }
  onUserStoreChange(data) {
    if(data.sendSmsCode.flag === 'sendSms'){
      this.setState({
        sendSmsSuccess: data.sendSmsCode.sendSmsSuccess
      })
    } else if(data.phoneSignup.falg === 'phoneSignup') {
      this.setState({
        phoneSignupSuccess: data.phoneSignup.phoneSignupSuccess
      })
    }
  }

  getCode(phone){
    if(!phone) return
    self.setState({isClickGetCode: true})
    setTimeout(() => self.setState({sendSmsSuccess: false}), 6000)

    UserAction.SendSignUpSms(86, phone)
  }

  onSubmitSignup(phone, code, password, passwordRepeat) {
    console.log(phone, code, password, passwordRepeat)
    UserAction.ReceiveSignUpSms(phone, code, password)
  }

  render() {
    const {sendSmsSuccess, phoneSignupSuccess, isClickGetCode} = this.state
    // console.log(this.setState)
    return (
      <SignupPhoneLayout
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

ReactMixin.onClass(SignupPhoneContainer, Reflux.listenTo(UserStore, 'onUserStoreChange'))
export default SignupPhoneContainer
