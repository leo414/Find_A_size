import React from 'react'
import { RouteTransition, presets } from 'react-router-transition'
import { Link } from 'react-router'
import classnames from 'classnames'

import FacebookLogin from 'react-facebook-login'
import GoogleLogin from 'react-google-login'
import API from '../../API'

import Button from '../Common/Button'
import Mask from './Mask'

import $ from 'jquery'
import UserAction from '../../actions/UserAction'

import { message } from 'antd'

const SignupLayout = props => {
  const cls = classnames({
    hidden: props.pathname !== '/sign_up'
  })

  const onSubmit = (e, userName, email, password, passwordRepeat) => {
    e.stopPropagation()
    console.log(userName, email, password, passwordRepeat)
    // UserAction.()
  }

  const error = () => {
    message.error('This is a message of error')
  }

  const responseFacebook = response => {
    if(response.accessToken) {
      UserAction.FacebookSignIn(response.accessToken)
    }
  }

  const responseGoogle = response => {
    if(response.accessToken) {
      UserAction.GoogleSignIn(response.accessToken)
    }
  }

  const responseGoogleFail = response => {
    console.log(response)
  }

  let email = '',
      password = '',
      passwordRepeat = ''

  return (
    <div className={cls}>
      <Mask pathname="/sign_up" />
      <RouteTransition { ...presets.pop } className="sign_up_page" pathname="/sign_up">
        <p className="h1 color_green">Create a free account</p>

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
         onFailure={responseGoogleFail}
         className="google_facebook_btn color_google"
       />

        <p className="subtitle">Already have an account? &nbsp;&nbsp;&nbsp;&nbsp;<Link to="/login"><strong className="color_green">LOG IN</strong></Link></p>

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
          <div className="input_box">
            <span className="fl color_blueness" onClick={event => $(event.target).next('input').focus()}>Confirm Password</span>
            <input type="password" className="fr" onChange={event => passwordRepeat = event.target.value.trim()} />
          </div>
        </form>

        <Button
          width="280px"
          height="38px"
          fontSize="18px"
          className="green"
          handleSubmit={e => onSubmit(e, userName, email, password, passwordRepeat)}
          value="Sign up"
        />

        <br/>

        <small className="aside color_blueness in_block">
          By creating an account, you agree to Find-A-Size’s <a>Terms of Services</a> and <a>Privacy Policy</a>.
        </small>
      </RouteTransition>
    </div>
  )
}

export default SignupLayout
