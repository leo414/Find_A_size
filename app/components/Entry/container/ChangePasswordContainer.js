import React from 'react'
import ChangePasswordLayout from '../layout/ChangePasswordLayout'
import { hashHistory } from 'react-router'

import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import UserBindStore from '../../../stores/UserBindStore'
import UserBindAction from '../../../actions/UserBindAction'

import { message } from 'antd'

let self;

class ChangePasswordContaienr extends React.Component {
  constructor(props){
    super(props)
    this.state = ({
      rawPassword: '',
      newPassword: '',
      loading: false,
    })
  }

  onUserStoreChange(data){
    console.log(data)
    if(data.changePassword.flag !== 'changePassword') return
    if(data.changePassword.success === true) {
      this.setState({loading: false})
      message.success('Change password success!')
      setTimeout(() => hashHistory.push('/account'), 2000)
    } else if(data.changePassword.success === false) {
      this.setState({loading: false})
      message.error('phone does not exist', 2.5)
    }
  }

  onSubmit(rawPassword, newPassword){
    console.log(rawPassword, newPassword)
    self.setState({
      rawPassword,
      newPassword,
      loading: true,
    })
    UserBindAction.ChangePassword(rawPassword || self.state.rawPassword, newPassword || self.state.newPassword,)
  }

  render() {
    self = this
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
