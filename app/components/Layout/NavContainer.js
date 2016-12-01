import React from 'react'
import NavLayout from './NavLayout'
import { hashHistory } from 'react-router'

import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import UserBindStore from '../../stores/UserBindStore'
import UserBindAction from '../../actions/UserBindAction'
import { Modal } from 'antd'

class NavContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = ({
      isLogin: localStorage.isLogin === 'true'
    })
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.isLogin){
      this.setState({isLogin: true})
    }
  }

  onUserStoreChange(data){
    console.log(data)
    if(data.signOut.flag !== 'signOut') return
    if(data.signOut.success === true) {

      localStorage.isLogin = false
      this.setState({
        isLogin: false
      })
      this.success('Log Out success!')
      hashHistory.push('/')
    } else if (data.signOut.success === false){
      localStorage.isLogin = false
      this.setState({
        isLogin: false
      })
      this.success('Log Out success!')
      hashHistory.push('/')
    }
  }

  onSignOut(){
    UserBindAction.SignOut()
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
    return <NavLayout isLogin={this.state.isLogin} onSignOut={this.onSignOut} />
  }
}

ReactMixin.onClass(NavContainer, Reflux.listenTo(UserBindStore, 'onUserStoreChange'))
export default NavContainer
