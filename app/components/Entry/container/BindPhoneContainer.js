import React from 'react'
import BindPhoneLayout from '../layout/BindPhoneLayout'
import UserCurrentContainer from './UserCurrentContainer'
import { hashHistory } from 'react-router'

import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import UserBindStore from '../../../stores/UserBindStore'
import UserBindAction from '../../../actions/UserBindAction'

import { Modal } from 'antd'

let timeOut;
class BindPhoneContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = ({
      isClickGetCode: false,
      phone: '',
      loading: false,
    })

    this.getCode = this.getCode.bind(this)
    this.onResetPssword = this.getCode.bind(this)
  }
  onUserStoreChange(data) {
    console.log(data)
    if(data.receiveSms.flag === 'receiveSms') {
      if(data.receiveSms.success === true) {
        this.success('Bind phone success')
        this.setState({loading: false})
        setTimeout(() => hashHistory.push('/account'), 2000)
        return
      } else if (data.receiveSms.success === false){
        this.setState({loading: false})
        this.error('Verification Code Error!')
        return
      }
    }

    if(data.sendBindSms.flag === 'sendBindSms'){
      if(data.sendBindSms.success === true) {
        this.success('Send sms code success!')
      } else if(data.sendBindSms.success === false) {
        this.error('Phone Number Already Exists')
      }

    }
  }

  getCode(phone){
    console.log(phone)
    if(!phone && !this.state.phone) return
    this.setState({
      isClickGetCode: true,
      phone,
    })
    timeOut = setTimeout(() => this.setState({isClickGetCode: false}), 60000)
    UserBindAction.SendBindingSms(phone || this.state.phone)
  }

  onResetPssword(phone, code) {
    console.log(phone, code)
    this.setState({
      phone,
      code,
      loading: true,
    })
    phone = phone || this.state.phone
    console.log(phone)
    UserBindAction.ReceiveBindingSms(phone, code)
  }

  componentWillUnmount(){
    timeOut && clearInterval(timeOut)
    timeOut = false
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
    const { isClickGetCode } = this.state
    return (
      <div>
        <UserCurrentContainer />
        <BindPhoneLayout
          pathname={this.props.location.pathname}
          getCode={this.getCode}
          onResetPssword={this.onResetPssword}
          isClickGetCode={isClickGetCode}
          loading={this.state.loading}
        />
      </div>
    )
  }
}

ReactMixin.onClass(BindPhoneContainer, Reflux.listenTo(UserBindStore, 'onUserStoreChange'))
export default BindPhoneContainer
