import React from 'react'
import SignupPhoneLayout from './SignupPhoneLayout'

import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import UserStore from '../../stores/UserStore'

class SignupPhoneContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = ({
      sendSmsSuccess: false,
      phoneSignupSuccess: false,
    })
  }
  onUserStoreChange(data) {
    console.log(data)
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

  render() {
    const {sendSmsSuccess, phoneSignupSuccess} = this.state
    return
      <SignupPhoneLayout
        sendSmsSuccess={sendSmsSuccess}
        phoneSignupSuccess={phoneSignupSuccess}
        pathname={this.props.location.pathname}
      />
  }
}

ReactMixin.onClass(SignupPhoneContainer, Reflux.listenTo(UserStore, 'onUserStoreChange'))
export default SignupPhoneContainer
