import React from 'react'
import { hashHistory } from 'react-router'
import { Modal } from 'antd'

const LoginSuccess = () => {

  const success = (content) => {
    Modal.success({
      title: 'Success',
      content,
      okText: 'OK',
      onOk(){
        hashHistory.push({pathname: '/', query: null, state: {isLogin: true}})
        localStorage.isLogin = true
      }
    })
  }

  const redirection = () => {
    success('signup success')
  }
  return (
    <div className="login_redirect">
      Signup Success! 2S Later
      {redirection()}
    </div>
  )
}

export default LoginSuccess
