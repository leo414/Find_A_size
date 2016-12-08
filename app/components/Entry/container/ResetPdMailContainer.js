import React from 'react'
import ResetPdMailLayout from '../layout/ResetPdMailLayout'
import { hashHistory } from 'react-router'

import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import UserStore from '../../../stores/UserStore'
import UserAction from '../../../actions/UserAction'

import { Modal, message } from 'antd'
import validataFunc from '../../../tools/Validator'

const registerForm = (email, password) => [
  {
    value: email,
    rules: [
      {
        strategy: 'isEmail',
        errorMsg: 'The email format is incorrect'
      }
    ]
  }
]

class ResetPdMailContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = ({
      loading: false,
    })
    this.onSubmit = this.onSubmit.bind(this)
  }

  onUserStoreChange(data){
    if(data.mailResetPassword.flag !== 'resetPassword') return
    if(data.mailResetPassword.sendMilSuccess === true) {
      this.setState({loading: false})
      this.success('Send email success!')
      setTimeout(() => hashHistory.push('/'), 2000)
    } else if(data.mailResetPassword.sendMilSuccess === 'resetFail') {
      this.setState({loading: false})
      this.error('Email address does not exist')
    }
  }

  onSubmit(email){
    let errorMsg = validataFunc(registerForm(email));
    if (errorMsg){
      message.error(errorMsg)
      return
    }
    this.setState({
      loading: true,
    })
    UserAction.SendResetPasswordMail(email)
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
