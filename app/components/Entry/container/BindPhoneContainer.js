import React from 'react'
import BindPhoneLayout from '../layout/BindPhoneLayout'
import UserCurrentContainer from './UserCurrentContainer'
import { hashHistory } from 'react-router'

import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import UserBindStore from '../../../stores/UserBindStore'
import UserBindAction from '../../../actions/UserBindAction'

import { Modal, message } from 'antd'
import validataFunc from '../../../tools/Validator'

const registerForm = (phone, code) => [
  {
    value: phone,
    rules: [
      {
        strategy: 'isMobile',
        errorMsg: 'The phone number format is incorrect'
      }
    ]
  },{
    value: code,
    rules: [
      {
        strategy: 'isNoEmpty',
        errorMsg: 'The code can not be empty'
      }
    ]
  }
]

const registerPhoneForm = (phone) => [
  {
    value: phone,
    rules: [
      {
        strategy: 'isMobile',
        errorMsg: 'The phone number format is incorrect'
      }
    ]
  }
]

let timeOut;
class BindPhoneContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = ({
      isClickGetCode: false,
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
    let errorMsg = validataFunc(registerPhoneForm(phone));
    if (errorMsg){
      message.error(errorMsg)
      return
    }
    this.setState({
      isClickGetCode: true,
    })
    timeOut = setTimeout(() => this.setState({isClickGetCode: false}), 60000)
    message.success('After 60 seconds you can re-obtain SMS verification code', 2.5)
    UserBindAction.SendBindingSms(phone)
  }

  onResetPssword(phone, code) {
    let errorMsg = validataFunc(registerForm(phone, code));
    if (errorMsg){
      message.error(errorMsg)
      return
    }

    this.setState({
      loading: true,
    })
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
