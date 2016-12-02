import React from 'react'
import AccountSettingLayout from './AccountSettingLayout'

import Reflux from 'reflux'
import ReactMixin from 'react-mixin'

import NotificationStore from '../../stores/NotificationStore'
import NotificationAction from '../../actions/NotificationAction'

import { Modal } from 'antd'

class AccountSettingContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = ({
      emailNotification: '',
      phoneNotification: '',
      loading: false,
    })

    this.onPhoneNotificationChange = this.onPhoneNotificationChange.bind(this)
    this.onEmailNotificationChange = this.onEmailNotificationChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  onNotificationStoreChange(data){
    if(data.changeNotification.flag !== 'changeNotification') return
    if(data.changeNotification.success === true){
      this.setState({loading: false})
      this.success('Submit success')
    } else if(data.changeNotification.success === false){
      this.setState({loading: false})
      this.error('please try again')
    }
  }

  onPhoneNotificationChange(e){
    this.setState({phoneNotification: e})
  }

  onEmailNotificationChange(e){
    this.setState({emailNotification: e})
  }

  onSubmit(){
    this.setState({loading: true})
    const { emailNotification, phoneNotification } = this.state
    const { IsEmailNotification, IsPhoneNotification } = this.props.data
    let newEmailNotification = (emailNotification === '') ? IsEmailNotification : emailNotification
    let newPhoneNotification = (phoneNotification === '') ? IsPhoneNotification : phoneNotification
    if(typeof newEmailNotification !== 'boolean' || typeof newPhoneNotification !== 'boolean') {
      console.error('newEmailNotification or newPhoneNotification must be boolean')
      return
    }
    NotificationAction.ChangeNotification(newEmailNotification, newPhoneNotification)
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
      <AccountSettingLayout
        data={this.props.data}
        loading={this.state.loading}
        onSubmit={this.onSubmit}
        onPhoneNotificationChange={this.onPhoneNotificationChange}
        onEmailNotificationChange={this.onEmailNotificationChange}
      />
    )
  }
}

ReactMixin.onClass(AccountSettingContainer, Reflux.listenTo(NotificationStore, 'onNotificationStoreChange'))
export default AccountSettingContainer
