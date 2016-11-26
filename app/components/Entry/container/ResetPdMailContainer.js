import React from 'react'
import ResetPdMailLayout from '../layout/ResetPdMailLayout'
import { hashHistory } from 'react-router'

import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import UserStore from '../../../stores/UserStore'
import UserAction from '../../../actions/UserAction'

import { message } from 'antd'

let self;

class ResetPdMailContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = ({
      email: '',
      loading: false,
    })
  }

  onUserStoreChange(data){
    console.log(data)
    if(data.mailResetPassword.flag !== 'resetPassword') return
    if(data.mailResetPassword.resetPasswordSuccess === true) {
      this.setState({loading: false})
      message.success('Send email success!')
      setTimeout(() => hashHistory.push('/'), 2000)
    } else if(data.mailResetPassword.resetPasswordSuccess === 'resetFail') {
      this.setState({loading: false})
      message.error('Email address does not exist', 2.5)
    }
  }

  onSubmit(email){
    console.log(email)
    self.setState({
      email,
      loading: true,
    })
    UserAction.SendResetPasswordMail(email || self.state.email)
  }

  render() {
    self = this
    return (
      <ResetPdMailLayout
        pathname={this.props.location.pathname}
        onSubmit={this.onSubmit}
        loading={this.state.loading}
      />
    )
  }
}

ReactMixin.onClass(ResetPdMailContainer, Reflux.listenTo(UserStore, 'onUserStoreChange'))
export default ResetPdMailContainer
