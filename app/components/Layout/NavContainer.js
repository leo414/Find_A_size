import React from 'react'
import NavLayout from './NavLayout'
import { hashHistory } from 'react-router'

import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import UserBindStore from '../../stores/UserBindStore'
import UserBindAction from '../../actions/UserBindAction'

class NavContainer extends React.Component {
  constructor(props){
    super(props)
    let isLogin = localStorage.isLogin === 'true'
    this.state = ({
      isLogin: isLogin
    })
  }

  onUserStoreChange(data){
    console.log(data)
    if(data.signOut.flag !== 'signOut') return
    if(data.signOut.success === true) {
      localStorage.isLogin = false
      this.setState({
        isLogin: false
      })
      hashHistory.push('/')
    } else if (data.signOut.success === false){

    }
  }

  onSignOut(){
    UserBindAction.SignOut()
  }

  render() {
    return <NavLayout isLogin={this.state.isLogin} onSignOut={this.onSignOut} />
  }
}

ReactMixin.onClass(NavContainer, Reflux.listenTo(UserBindStore, 'onUserStoreChange'))
export default NavContainer
