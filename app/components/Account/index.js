import React from 'react'
import { hashHistory } from 'react-router'

import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import UserBindStore from '../../stores/UserBindStore'
import UserBindAction from '../../actions/UserBindAction'

import NavContainer from '../Layout/NavContainer'
import Footer from '../Layout/Footer'

import AccountSettingContainer from './AccountSettingContainer'
import ProductWatchContainer from './ProductWatchContainer'

import { Modal } from 'antd'

class Account extends React.Component {
  constructor(props){
    super(props)
    this.state = ({
      userInfo: {},
    })
  }
  componentDidMount() {
    UserBindAction.UserCurrent()
  }

  onUserStoreChange(data) {
    console.log(data)
    if(data.userCurrent.flag !== 'userCurrent') return
    if(data.userCurrent.success === true) {
      const { Email, Phone, IsPhoneNotification, IsEmailNotification } = data.userCurrent
      this.setState({
        userInfo: {
          Email,
          Phone,
          IsPhoneNotification,
          IsEmailNotification,
        }
      })
    } else if (data.userCurrent.success === false) {
      this.error('please go to login')
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

  render(){
    return (
      <div>
        <NavContainer />
        <ProductWatchContainer />
        <AccountSettingContainer data={this.state.userInfo} />
        <Footer />
      </div>
    )
  }
}

ReactMixin.onClass(Account, Reflux.listenTo(UserBindStore, 'onUserStoreChange'))
export default Account
