import React from 'react'
import { RouteTransition, presets } from 'react-router-transition'
import { Link } from 'react-router'
import classnames from 'classnames'

import Button from '../Common/Button'
import Mask from './Mask'

import $ from 'jquery'

import { message } from 'antd'
message.config({
  top: 300,
  duration: 2,
})

const Login = props => {
  const cls = classnames({
    hidden: props.location.pathname !== '/login'
  })

  const onSubmit = (e, userName, email, password) => {
    e.stopPropagation()
    console.log(userName, email, password)
    if(!userName) error()
  }

  const error = () => {
    message.error('This is a message of error')
  }

  let userName = '',
      email = '',
      password = ''

  return (
    <div className={cls}>
      <Mask pathname="/login" />
      <RouteTransition { ...presets.pop } className="login_page" pathname="/login">
        <p className="h1 color_green">WELCOME BACK!</p>

        <Button
          width="320px"
          height="44px"
          fontSize="22px"
          className="red"
          handleSubmit={() => onSignup()}
          value="Log in with Google"
        />

        <br/>
        <br/>

        <Button
          width="320px"
          height="44px"
          fontSize="22px"
          className="deongaree"
          handleSubmit={() => onSignup()}
          value="Log in with Facebook"
        />

        <p className="subtitle">Don’t have an account? &nbsp;&nbsp;&nbsp;&nbsp;<Link to="/sign_up"><strong className="color_green">SIGN UP</strong></Link></p>

        <hr style={{height: '1px', border: 'none', borderTop: '1px solid #eee', marginTop: '40px'}} />
        <p className="h1 color_green or">OR</p>

        <form>
          <div className="input_box">
            <span className="fl color_blueness" onClick={event => $(event.target).next('input').focus()}>Username</span>
            <input type="text" className="fr" onChange={event => userName = event.target.value.trim()} />
          </div>
          <div className="input_box">
            <span className="fl color_blueness" onClick={event => $(event.target).next('input').focus()}>Email Address</span>
            <input type="email" className="fsr" onChange={event => email = event.target.value.trim()} /> <br/>
          </div>
          <div className="input_box">
            <span className="fl color_blueness" onClick={event => $(event.target).next('input').focus()}>Password</span>
            <input type="password" className="fr" onChange={event => password = event.target.value.trim()} />
          </div>
        </form>

        <Button
          width="280px"
          height="38px"
          fontSize="18px"
          className="green"
          handleSubmit={e => onSubmit(e, userName, email, password)}
          value="LOG IN"
        />

        <p className="subtitle"><Link to="/find_password">Forgot your password?</Link></p>
      </RouteTransition>
    </div>
  )
}

export default Login
