import React from 'react'
import { RouteTransition, presets } from 'react-router-transition'
import { Link } from 'react-router'
import classnames from 'classnames'

import FacebookLogin from 'react-facebook-login'
import GoogleLogin from 'react-google-login'
import API from '../../../API'

import Button from '../../Common/Button'
import Mask from '../Mask'
import $ from 'jquery'

import { message } from 'antd'
message.config({
  top: 200,
  duration: 2,
})

const LoginLayout = ({pathname, onFaceBookLogin, onGoogleLogin, onLogin}) => {
  const cls = classnames({
    hidden: pathname !== '/login'
  })

  const responseFacebook = response => {
    if(response.accessToken) {
      onFaceBookLogin(response.accessToken)
    }
  }

  const responseGoogle = response => {
    if(response.accessToken) {
      onGoogleLogin(response.accessToken)
    }
  }

  let userName = '',
      password = ''

  return (
    <div className={cls}>
      <Mask pathname="/login" />
      <RouteTransition { ...presets.pop } className="login_page" pathname="/login">
        <p className="h1 color_green">WELCOME BACK!</p>

        <FacebookLogin
          appId={API.FACEBOOK_APPID}
          autoLoad={true}
          fields="name,email,picture"
          scope="public_profile,user_friends,user_actions.books,email"
          callback={responseFacebook}
          cssClass="google_facebook_btn color_facebook"
        />

        <br/>
        <br/>

        <GoogleLogin
          clientId={API.GOOGLE_CLIENTID}
          buttonText="Log in with Google"
          onSuccess={responseGoogle}
          className="google_facebook_btn color_google"
          onFailure={responseGoogle}
       />

        <p className="subtitle">Don’t have an account? &nbsp;&nbsp;&nbsp;&nbsp;<Link to="/sign_up"><strong className="color_green">SIGN UP</strong></Link></p>

        <hr style={{height: '1px', border: 'none', borderTop: '1px solid #eee', marginTop: '40px'}} />
        <p className="h1 color_green or">OR</p>

        <form>
          <div className="input_box">
            <span className="fl color_blueness" onClick={event => $(event.target).next('input').focus()}>Email or Phone</span>
            <input type="text" className="fr" onChange={event => userName = event.target.value.trim()} /> <br/>
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
          handleSubmit={() => onLogin(userName, password)}
          value="LOG IN"
        />

        <p className="subtitle"><Link to="/send_find_pd_mail">Forgot your password?</Link></p>
      </RouteTransition>
    </div>
  )
}

export default LoginLayout
