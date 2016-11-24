import React from 'react'
import SignupLayout from '../layout/SignupLayout'

import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import UserStore from '../../../stores/UserStore'
import UserAction from '../../../actions/UserAction'

class SignupContainer extends React.Component {
  onGetUserInfo(data) {
    console.log(data)
  }

  onSignup(email, password, passwordRepeat){
    console.log(email, password, passwordRepeat)
    // UserAction.SendSignUpMail()
  }

  onFacebookSignup(accessToken){
    // UserAction.FacebookSignIn(accessToken)
  }

  onGoogleSignup(accessToken){
    // UserAction.GoogleSignIn(accessToken)
  }

  render() {
    return (
      <SignupLayout
        pathname={this.props.location.pathname}
        onSignup={this.onSignup}
        onFacebookSignup={this.onFacebookSignup}
        onGoogleSignup={this.onGoogleSignup}
      />
    )
  }
}

ReactMixin.onClass(SignupContainer, Reflux.listenTo(UserStore, 'onGetUserInfo'))
export default SignupContainer
