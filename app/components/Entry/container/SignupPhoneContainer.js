import React from 'react'
import SignupPhoneLayout from '../layout/SignupPhoneLayout'
import { hashHistory } from 'react-router'

import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import UserStore from '../../../stores/UserStore'
import UserAction from '../../../actions/UserAction'

import { Modal } from 'antd'

let timeOut;
class SignupPhoneContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = ({
      isClickGetCode: false,
      phone: '',
      password: '',
      passwordRepeat: '',
      loading: false,
    })

    this.getCode = this.getCode.bind(this)
    this.onSubmitSignup = this.onSubmitSignup.bind(this)
  }
  onUserStoreChange(data) {
    console.log(data)
    if(data.sendSmsCode.flag === 'sendSms'){
      if(data.sendSmsCode.sendSmsSuccess === true) {
        this.success('Send sms code success!')
      } else if(data.sendSmsCode.sendSmsSuccess === 'sendFail') {
        this.error('Phone Number Already Exists')
      }
    }

    if(data.phoneSignup.flag === 'phoneSignup') {
      if(data.phoneSignup.phoneSignupSuccess === true) {
        localStorage.isLogin = true
        this.success('Signup success')
        this.setState({loading: false})
        setTimeout(() => hashHistory.push({pathname: '/', query: null, state: {isLogin: true}}), 2000)
      } else if (data.phoneSignup.phoneSignupSuccess === 'signFail') {
        this.setState({loading: false})
        this.error('Verification Code Error!')
      }
    }
  }

  getCode(phone, password, passwordRepeat){
    if(!phone && !this.state.phone) return
    this.setState({
      isClickGetCode: true,
      phone,
      password,
      passwordRepeat,
    })
    timeOut = setTimeout(() => this.setState({isClickGetCode: false}), 60000)

    UserAction.SendSignUpSms(phone || this.state.phone)
  }

  onSubmitSignup(phone, code, password, passwordRepeat) {
    console.log(phone, code, password, passwordRepeat)
    console.log(this.state)
    this.setState({
      phone,
      code,
      password,
      passwordRepeat,
      loading: true,
    })
    phone = phone || this.state.phone
    password = password || this.state.password
    passwordRepeat = passwordRepeat || this.state.passwordRepeat
    console.log(phone, password, passwordRepeat)
    UserAction.ReceiveSignUpSms(phone, code, password)
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
      <SignupPhoneLayout
        pathname={this.props.location.pathname}
        getCode={this.getCode}
        onSubmitSignup={this.onSubmitSignup}
        isClickGetCode={isClickGetCode}
        loading={this.state.loading}
      />
    )
  }
}

ReactMixin.onClass(SignupPhoneContainer, Reflux.listenTo(UserStore, 'onUserStoreChange'))
export default SignupPhoneContainer
