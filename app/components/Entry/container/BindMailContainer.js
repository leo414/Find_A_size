import React from 'react'
import BindMailLayout from '../layout/BindMailLayout'
import UserCurrentContainer from './UserCurrentContainer'
import { hashHistory } from 'react-router'

import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import UserBindStore from '../../../stores/UserBindStore'
import UserBindAction from '../../../actions/UserBindAction'

import { message } from 'antd'

class BindMailContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = ({
      email: '',
      loading: false,
    })

    this.onSubmit = this.onSubmit.bind(this)
  }

  onUserStoreChange(data){
    console.log(data)
    if(data.sendBindMail.flag !== 'sendMail') return
    if(data.sendBindMail.success === true) {
      this.setState({loading: false})
      message.success('Connect email success!')
      setTimeout(() => hashHistory.push('/'), 2000)
    } else if(data.sendBindMail.success === false) {
      this.setState({loading: false})
      message.error('Mail Address Already Exists', 2.5)
    }
  }

  onSubmit(email){
    console.log(email)
    this.setState({
      email,
      loading: true,
    })
    UserBindAction.SendBindingMail(email || this.state.email)
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
