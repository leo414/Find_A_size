import React from 'react'
import SendFindPdMailLayout from '../layout/SendFindPdMailLayout'
import { hashHistory } from 'react-router'

import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import UserStore from '../../../stores/UserStore'
import UserAction from '../../../actions/UserAction'

import { Modal } from 'antd'
import decode64 from '../../../tools/decode64'

class SendFindPdMailContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = ({
      password: '',
      passwordRepeat: '',
      loading: false,
    })

    this.onSubmit = this.onSubmit.bind(this)
  }

  onUserStoreChange(data){
    console.log(data)
    if(data.receiveMailPassword.flag !== 'resetPassword') return
    if(data.receiveMailPassword.resetPasswordSuccess === true) {
      this.setState({loading: false})
      localStorage.isLogin = true
      this.success('Reset password success!')
      setTimeout(() => hashHistory.push({pathname: '/', query: null, state: {isLogin: true}}), 2000)
    } else if(data.receiveMailPassword.resetPasswordSuccess === 'resetFail') {
      this.setState({loading: false})
      this.error('Invalid Request')
    }
  }

  onSubmit(password, passwordRepeat){
    console.log(password, passwordRepeat)
    this.setState({
      password,
      passwordRepeat,
      loading: true,
    })
    try {
      console.log(this.props.location.query.code)
      console.log(this.props.location.query.mail)
    } catch(error) {
      this.error('Email address does not exist')
      return
    }
    const code = decode64(this.props.location.query.code)
    const mail = decode64(this.props.location.query.mail)
    UserAction.ReceiveResetPasswordMail(mail, code, password || this.state.password)
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
