import React from 'react'
import { RouteTransition, presets } from 'react-router-transition'
import { Link } from 'react-router'
import classnames from 'classnames'

import FacebookLogin from 'react-facebook-login'
import GoogleLogin from 'react-google-login'

import Button from '../Common/Button'
import Mask from './Mask'

import $ from 'jquery'
import UserAction from '../../actions/UserAction'

import { message } from 'antd'

const SignupWithPhone = props => {
  const cls = classnames({
    hidden: props.pathname !== '/sign_up_phone'
  })

  const onSubmit = (e, phone, code, password, passwordRepeat) => {
    e.stopPropagation()
    console.log(phone, password, passwordRepeat)
    // if userName is email
    UserAction.SendSignUpMail()

    // if userName is phone

  }

  const error = () => {
    message.error('This is a message of error')
  }

  const onClickLogin = {}

  const getCode = (e, phone) => {
    e.stopPropagation()
    if(phone) {
      UserAction.RedceiveSignUpSms(86, 15542203979)
    } else {
      //TODO
    }
  }

  let phone = '',
      code = '',
      password = '',
      passwordRepeat = ''

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
            <input type="phone" className="fr" onChange={event => phone = event.target.value.trim()} /> <br/>

            <Button
              width="70px"
              height="24px"
              fontSize="12px"
              className="green get_code"
              handleSubmit={e => getCode(e, phone)}
              value="Get code"
            />
          </div>

          <div className="input_box code_number">
            <span className="fl color_blueness" onClick={event => $(event.target).next('input').focus()}>Code</span>
            <input type="number" className="fr" onChange={event => code = event.target.value.trim()} /> <br/>
            <span className="msg">plz 得得 AD </span>
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
          handleSubmit={e => onSubmit(e, phone, code, password, passwordRepeat)}
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

export default SignupWithPhone
