import React from 'react'
import { RouteTransition, presets } from 'react-router-transition'
import { Link } from 'react-router'
import classnames from 'classnames'

import FacebookLogin from 'react-facebook-login'
import GoogleLogin from 'react-google-login'

import { Button, message } from 'antd'
import ButtonSelf from '../../Common/Button'
import Mask from '../Mask'

import $ from 'jquery'

const SignupWithPhone = props => {
  const{
    pathname,
    getCode,
    onSubmitSignup,
    isClickGetCode,
    loading,
  } = props

  const cls = classnames({
    hidden: pathname !== '/sign_up_phone'
  })

  const buttonStyle = {
    width: '280px',
    height: '38px',
    fontSize: "18px",
    backgroundColor: '#146eb4',
  }

  return (
    <div className={cls}>
      <Mask pathname="/sign_up_phone" />
      <RouteTransition { ...presets.pop } className="sign_up_phone" pathname="/sign_up_phone">
        <p className="h1 color_green">Create a free account</p>

        <p className="subtitle">Already have an account? &nbsp;&nbsp;&nbsp;&nbsp;<Link to="/login"><strong className="color_green">LOG IN</strong></Link></p>

        <hr style={{height: '1px', border: 'none', borderTop: '1px solid #eee', marginTop: '40px'}} />
        <p className="h1 color_green or">OR</p><br/>
        <Link className="phone_signup" to="/sign_up">(You can also signup with email)</Link>
        <form>
          <div className="input_box phone_number">
            <span className="fl color_blueness" onClick={event => $(event.target).next('input').focus()}>Phone Number</span>
            <input
              type="number"
              readOnly={isClickGetCode ? "readOnly" : ''}
              className="fr"
              id="sign_phone_ly_phone"
            />

            <br/>
            {
              isClickGetCode ?
              message.success('After 60 seconds you can re-obtain SMS verification code', 2.5)
              :
              <ButtonSelf
                width="70px"
                height="24px"
                fontSize="12px"
                className="green get_code"
                handleSubmit={() => getCode($('#sign_phone_ly_phone').val().trim())}
                value="Get code"
              />
            }
          </div>

          <div className="input_box code_number">
            <span className="fl color_blueness" onClick={event => $(event.target).next('input').focus()}>Code</span>
            <input type="number" className="fr" id="sign_phone_ly_code" /> <br/>
          </div>
          <div className="input_box">
            <span className="fl color_blueness" onClick={event => $(event.target).next('input').focus()}>Password</span>
            <input type="password" className="fr" id="sign_phone_ly_password" />
          </div>
          <div className="input_box">
            <span className="fl color_blueness" onClick={event => $(event.target).next('input').focus()}>Confirm Password</span>
            <input type="password" className="fr" id="sign_phone_ly_passwordRepeat" />
          </div>
        </form>

        <Button onClick={() => onSubmitSignup($('#sign_phone_ly_phone').val().trim(), $('#sign_phone_ly_code').val().trim(), $('#sign_phone_ly_password').val().trim(), $('#sign_phone_ly_passwordRepeat').val().trim())}
                type="primary" loading={loading} style={buttonStyle}
        >
          Sign up
        </Button>

        <br/>

        <small className="aside color_blueness in_block">
          By creating an account, you agree to Find-A-Size’s <a>Terms of Services</a> and <a>Privacy Policy</a>.
        </small>
      </RouteTransition>
    </div>
  )
}

export default SignupWithPhone
