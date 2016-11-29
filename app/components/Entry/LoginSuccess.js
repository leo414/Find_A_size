import React from 'react'
import { hashHistory } from 'react-router'
import { message } from 'antd'

message.config({
  top: 200,
});

const LoginSuccess = () => {
  const redirection = () => {
    message.success('signup success', 2)
    localStorage.isLogin = true
    setTimeout(() => hashHistory.push({pathname: '/', query: null, state: {isLogin: true}}), 2000)
  }
  return (
    <div className="login_redirect">
      Signup Success! 2S Later
      {redirection()}
    </div>
  )
}

export default LoginSuccess
