import React from 'react'
import { hashHistory } from 'react-router'
import { message } from 'antd'

const LoginFail = () => {
  const redirection = () => {
    message.error('signup success', 2)
    setTimeout(() => hashHistory.push('/sign_up'), 2000)
  }
  return (
    <div className="login_redirect">
      Signup fail! 3S Later
      {redirection()}
    </div>
  )
}

export default LoginFail
