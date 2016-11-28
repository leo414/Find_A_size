import React from 'react'
import { hashHistory } from 'react-router'

import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import UserBindStore from '../../../stores/UserBindStore'
import UserBindAction from '../../../actions/UserBindAction'

import { message } from 'antd'


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
      message.error('place go to login', 2.5)
      setTimeout(() => hashHistory.push('/login'), 2000)
    }
  }

  render() {
    return null
  }
}

ReactMixin.onClass(UserCurrentContainer, Reflux.listenTo(UserBindStore, 'onUserStoreChange'))
export default UserCurrentContainer
