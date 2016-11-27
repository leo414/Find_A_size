import React from 'react'
import BindPhoneLayout from '../layout/BindPhoneLayout'
import { hashHistory } from 'react-router'

import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import UserBindStore from '../../../stores/UserBindStore'
import UserBindAction from '../../../actions/UserBindAction'

import { message } from 'antd'

let self;
let timeOut;
class BindPhoneContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = ({
      isClickGetCode: false,
      phone: '',
      loading: false,
    })
  }
  onUserStoreChange(data) {
    console.log(data)
    if(data.receiveSms.flag === 'receiveSms') {
      if(data.receiveSms.success === true) {
        message.success('Bind phone success')
        this.setState({loading: false})
        setTimeout(() => hashHistory.push('/account'), 2000)
        return
      } else if (data.receiveSms.success === false){
        this.setState({loading: false})
        message.error('Verification Code Error!', 2.5)
        return
      }
    }

    if(data.sendBindSms.flag === 'sendBindSms'){
      if(data.sendBindSms.success === true) {
        message.success('Send sms code success!')
      } else if(data.sendBindSms.success === false) {
        message.error('Phone Number Already Exists', 2.5)
      }

    }
  }

  getCode(phone){
    console.log(phone)
    if(!phone && !self.state.phone) return
    self.setState({
      isClickGetCode: true,
      phone,
    })
    timeOut = setTimeout(() => self.setState({isClickGetCode: false}), 60000)
    UserBindAction.SendBindingSms(86, phone || self.state.phone)
  }

  onResetPssword(phone, code) {
    console.log(phone, code)
    self.setState({
      phone,
      code,
      loading: true,
    })
    phone = phone || self.state.phone
    console.log(phone)
    UserBindAction.ReceiveBindingSms(phone, code)
  }

  componentWillUnmount(){
    timeOut && clearInterval(timeOut)
    timeOut = false
  }

  render() {
    const { isClickGetCode } = this.state
    self = this
    return (
      <BindPhoneLayout
        pathname={this.props.location.pathname}
        getCode={this.getCode}
        onResetPssword={this.onResetPssword}
        isClickGetCode={isClickGetCode}
        loading={this.state.loading}
      />
    )
  }
}

ReactMixin.onClass(BindPhoneContainer, Reflux.listenTo(UserBindStore, 'onUserStoreChange'))
export default BindPhoneContainer
