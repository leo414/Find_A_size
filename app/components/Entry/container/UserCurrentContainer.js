import React from 'react'
import { hashHistory } from 'react-router'

import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import UserBindStore from '../../../stores/UserBindStore'
import UserBindAction from '../../../actions/UserBindAction'

import { Modal } from 'antd'


class UserCurrentContainer extends React.Component {
  componentDidMount() {
    UserBindAction.UserCurrent()
  }

  onUserStoreChange(data) {
    console.log(data)
    if(data.userCurrent.flag !== 'userCurrent') return
    if(data.userCurrent.success === true) {
      console.log(data.userCurrent)
    } else if (data.userCurrent.success === false) {
      this.error('place go to login')
      setTimeout(() => hashHistory.push('/login'), 2000)
    }
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
    return null
  }
}

ReactMixin.onClass(UserCurrentContainer, Reflux.listenTo(UserBindStore, 'onUserStoreChange'))
export default UserCurrentContainer
