import React from 'react'
import LoginLayout from './LoginLayout'

import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import UserStore from '../../stores/UserStore'

class LoginContainer extends React.Component {
  onGetUserInfo(data) {
    console.log(data)
  }

  render() {
    return <LoginLayout pathname={this.props.location.pathname} />
  }
}

ReactMixin.onClass(LoginContainer, Reflux.listenTo(UserStore, 'onGetUserInfo'))
export default LoginContainer
