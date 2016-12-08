import React from 'react'
import ChangePasswordLayout from '../layout/ChangePasswordLayout'
import { hashHistory } from 'react-router'

import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import UserBindStore from '../../../stores/UserBindStore'
import UserBindAction from '../../../actions/UserBindAction'

import { Modal, message } from 'antd'

class ChangePasswordContaienr extends React.Component {
  constructor(props){
    super(props)
    this.state = ({
      loading: false,
    })

    this.onSubmit = this.onSubmit.bind(this)
  }

  onUserStoreChange(data){
    console.log(data)
    if(data.changePassword.flag !== 'changePassword') return
    if(data.changePassword.success === true) {
      this.setState({loading: false})
      this.success('Change password success!')
      setTimeout(() => hashHistory.push('/account'), 2000)
    } else if(data.changePassword.success === false) {
      this.setState({loading: false})
      this.error('Bad password')
    }
  }

  onSubmit(rawPassword, newPassword){
    if(!rawPassword) {
      message.error('password number can not be empty')
      return
    }
    if(rawPassword !== newPassword){
      message.error('The two passwords are not the same')
      return
    }
    if(rawPassword.length < 6){
      message.error('The password at least 6 characters')
      return
    }
    this.setState({
      loading: true,
    })
    UserBindAction.ChangePassword(rawPassword, newPassword)
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
      <ChangePasswordLayout
        pathname={this.props.location.pathname}
        onSubmit={this.onSubmit}
        loading={this.state.loading}
      />
    )
  }
}

ReactMixin.onClass(ChangePasswordContaienr, Reflux.listenTo(UserBindStore, 'onUserStoreChange'))
export default ChangePasswordContaienr
