import React from 'react'
import BindMailLayout from '../layout/BindMailLayout'
import UserCurrentContainer from './UserCurrentContainer'
import { hashHistory } from 'react-router'

import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import UserBindStore from '../../../stores/UserBindStore'
import UserBindAction from '../../../actions/UserBindAction'

import { Modal, message } from 'antd'

import validataFunc from '../../../tools/Validator'

const registerForm = email => [
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


class BindMailContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = ({
      loading: false,
    })

    this.onSubmit = this.onSubmit.bind(this)
  }

  onUserStoreChange(data){
    console.log(data)
    if(data.sendBindMail.flag !== 'sendMail') return
    if(data.sendBindMail.success === true) {
      this.setState({loading: false})
      this.success('Connect email success!')
      setTimeout(() => hashHistory.push('/'), 2000)
    } else if(data.sendBindMail.success === false) {
      this.setState({loading: false})
      this.error('Mail Address Already Exists')
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
    UserBindAction.SendBindingMail(email)
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
      <div>
        <UserCurrentContainer />
        <BindMailLayout
          pathname={this.props.location.pathname}
          onSubmit={this.onSubmit}
          loading={this.state.loading}
        />
      </div>
    )
  }
}

ReactMixin.onClass(BindMailContainer, Reflux.listenTo(UserBindStore, 'onUserStoreChange'))
export default BindMailContainer
