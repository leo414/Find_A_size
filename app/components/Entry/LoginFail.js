import React from 'react'
import { hashHistory } from 'react-router'
import { Modal } from 'antd'

const LoginFail = () => {
  const redirection = () => {
    error('signup success')
  }

  const error = (content) => {
    Modal.error({
      title: 'Error',
      content,
      okText: 'OK',
      onOk(){
        hashHistory.push('/sign_up')
        localStorage.isLogin = false
      }
    })
  }

  return (
    <div className="login_redirect">
      Signup fail! 3S Later
      {redirection()}
    </div>
  )
}

export default LoginFail
