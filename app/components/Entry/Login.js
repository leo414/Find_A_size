import React from 'react'
import { RouteTransition, presets } from 'react-router-transition'
import { Link } from 'react-router'
import classnames from 'classnames'

import FacebookLogin from 'react-facebook-login'
import GoogleLogin from 'react-google-login'

import Button from '../Common/Button'
import Mask from './Mask'

import UserAction from '../../actions/UserAction'
UserAction.SendSignUpMail('zaxlct@foxmail.com', 'dwadwad1212')

import $ from 'jquery'

import { message } from 'antd'
message.config({
  top: 200,
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

  const responseFacebook = response => {
    console.log(response);
  }

  const responseGoogle = response => {
    console.log(response)
  }

  const responseGoogleFail = response => {
    console.log(response)
  }

  let email = '',
      password = ''

  return (
    <div className={cls}>
      <Mask pathname="/login" />
      <RouteTransition { ...presets.pop } className="login_page" pathname="/login">
        <p className="h1 color_green">WELCOME BACK!</p>

        <FacebookLogin
          appId="1165695376849717"
          autoLoad={true}
          fields="name,email,picture"
          scope="public_profile,user_friends,user_actions.books,email"
          callback={responseFacebook}
          cssClass="google_facebook_btn color_facebook"
        />

        <br/>
        <br/>

        <GoogleLogin
         clientId="1079426487628-kr12vvcob66p2p5fm8r1n0kf7qqnbi26.apps.googleusercontent.com"
         buttonText="Log in with Google"
         onSuccess={responseGoogle}
         onFailure={responseGoogleFail}
         className="google_facebook_btn color_google"
       />

        <p className="subtitle">Don’t have an account? &nbsp;&nbsp;&nbsp;&nbsp;<Link to="/sign_up"><strong className="color_green">SIGN UP</strong></Link></p>

        <hr style={{height: '1px', border: 'none', borderTop: '1px solid #eee', marginTop: '40px'}} />
        <p className="h1 color_green or">OR</p>

        <form>
          <div className="input_box">
            <span className="fl color_blueness" onClick={event => $(event.target).next('input').focus()}>Email or Phone</span>
            <input type="email" className="fr" onChange={event => email = event.target.value.trim()} /> <br/>
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
