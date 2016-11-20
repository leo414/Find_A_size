import React from 'react'
import SignupLayout from './SignupLayout'

import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import UserStore from '../../stores/UserStore'

class SignupContainer extends React.Component {
  onGetUserInfo(data) {
    console.log(data)
  }

  render() {
    return <SignupLayout pathname={this.props.location.pathname} />
  }
}

ReactMixin.onClass(SignupContainer, Reflux.listenTo(UserStore, 'onGetUserInfo'))
export default SignupContainer
