import React from 'react'
import SendFindPdMailLayout from '../layout/SendFindPdMailLayout'
import { hashHistory } from 'react-router'

import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import UserStore from '../../../stores/UserStore'
import UserAction from '../../../actions/UserAction'

import { message } from 'antd'
import decode64 from '../../../tools/decode64'

let self;

class SendFindPdMailContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = ({
      password: '',
      passwordRepeat: '',
      loading: false,
    })
  }

  onUserStoreChange(data){
    console.log(data)
    if(data.receiveMailPassword.flag !== 'resetPassword') return
    if(data.receiveMailPassword.resetPasswordSuccess === true) {
      this.setState({loading: false})
      localStorage.isLogin = true
      message.success('Reset password success!')
      setTimeout(() => hashHistory.push({pathname: '/', query: null, state: {isLogin: true}}), 2000)
    } else if(data.receiveMailPassword.resetPasswordSuccess === 'resetFail') {
      this.setState({loading: false})
      message.error('Invalid Request', 2.5)
    }
  }

  onSubmit(password, passwordRepeat){
    console.log(password, passwordRepeat)
    self.setState({
      password,
      passwordRepeat,
      loading: true,
    })
    try {
      console.log(self.props.location.query.code)
      console.log(self.props.location.query.mail)
    } catch(error) {
      message.error('Email address does not exist', 2.5)
      return
    }
    const code = decode64(self.props.location.query.code)
    const mail = decode64(self.props.location.query.mail)
    UserAction.ReceiveResetPasswordMail(mail, code, password || self.state.password)
  }

  render() {
    self = this
    return (
      <SendFindPdMailLayout
        pathname={this.props.location.pathname}
        onSubmit={this.onSubmit}
        loading={this.state.loading}
      />
    )
  }
}

ReactMixin.onClass(SendFindPdMailContainer, Reflux.listenTo(UserStore, 'onUserStoreChange'))
export default SendFindPdMailContainer
