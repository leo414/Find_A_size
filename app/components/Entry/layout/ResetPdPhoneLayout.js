import React from 'react'
import { RouteTransition, presets } from 'react-router-transition'
import { Link } from 'react-router'
import classnames from 'classnames'

import FacebookLogin from 'react-facebook-login'
import GoogleLogin from 'react-google-login'

import Button from '../../Common/Button'
import Mask from '../Mask'

import $ from 'jquery'


import { message } from 'antd'

const ResetPdPhoneLayout = props => {
  const {
    sendSmsSuccess,
    phoneSignupSuccess,
    pathname,
    getCode,
    onSubmitSignup,
    isClickGetCode,
  } = props

  const cls = classnames({
    hidden: pathname !== '/reset_pd_phone'
  })

  let phone = '',
      code = '',
      password = '',
      passwordRepeat = ''

  return (
    <div className={cls}>
      <Mask pathname="/reset_pd_phone" />
      <RouteTransition { ...presets.pop } className="sign_up_phone" style={{height: '500px', top: '12%'}} pathname="/reset_pd_phone">
        <p className="h1 color_green">Find password</p>
        <hr style={{height: '1px', border: 'none', borderTop: '1px solid #eee', marginTop: '40px'}} />
        <form>
          <div className="input_box phone_number">
            <span className="fl color_blueness" onClick={event => $(event.target).next('input').focus()}>Phone Number</span>
            <input
              type="number"
              readOnly={isClickGetCode ? "readOnly" : ''}
              className="fr"
              onChange={event => phone = event.target.value.trim()}
            />

            <br/>
            {
              isClickGetCode ?
              <sapn className="get_code_msg">xxxxxxxxxx</sapn>
              :
              <Button
                width="70px"
                height="24px"
                fontSize="12px"
                className="green get_code"
                handleSubmit={() => getCode(phone, password, passwordRepeat)}
                value="Get code"
              />
            }
          </div>

          <div className="input_box code_number">
            <span className="fl color_blueness" onClick={event => $(event.target).next('input').focus()}>Code</span>
            <input type="number" className="fr" onChange={event => code = event.target.value.trim()} /> <br/>
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
          handleSubmit={() => {console.log(phone); onSubmitSignup(phone, code, password, passwordRepeat)}}
          value="Sign up"
        />
      </RouteTransition>
    </div>
  )
}

export default ResetPdPhoneLayout
