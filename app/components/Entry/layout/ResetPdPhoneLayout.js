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

const ResetPdPhoneLayout = props => {
  const {
    pathname,
    getCode,
    onResetPssword,
    isClickGetCode,
    loading,
  } = props

  const cls = classnames({
    hidden: pathname !== '/reset_pd_phone'
  })

  const buttonStyle = {
    width: '280px',
    height: '38px',
    fontSize: "18px",
    backgroundColor: '#146eb4',
  }

  let phone = '',
      code = '',
      password = '',
      passwordRepeat = ''

  return (
    <div className={cls}>
      <Mask pathname="/reset_pd_phone" />
      <RouteTransition { ...presets.pop } className="sign_up_phone" style={{height: '520px', top: '12%'}} pathname="/reset_pd_phone">
        <p className="h1 color_green">FORGOT YOUR PASSWORD?</p>
        <Link className="fz_middle" to="send_pd_mail">Through the mailbox to retrieve the password</Link>
        <hr style={{height: '1px', border: 'none', borderTop: '1px solid #eee', marginTop: '40px'}} />
        <form>
          <div className="input_box phone_number">
            <span className="fl color_blueness" onClick={event => $(event.target).next('input').focus()}>Phone Number</span>
            <input
              type="number"
              readOnly={isClickGetCode ? "readOnly" : ''}
              className="fr"
              id="reset_password_phone_phone"
            />

            <br/>
            {
              isClickGetCode ?
              null
              :
              <ButtonSelf
                width="70px"
                height="24px"
                fontSize="12px"
                className="green get_code"
                handleSubmit={() => getCode($('#reset_password_phone_phone').val().trim())}
                value="Get code"
              />
            }
          </div>

          <div className="input_box code_number">
            <span className="fl color_blueness" onClick={event => $(event.target).next('input').focus()}>Code</span>
            <input type="number" className="fr" id="reset_password_phone_code" /> <br/>
          </div>
          <div className="input_box">
            <span className="fl color_blueness" onClick={event => $(event.target).next('input').focus()}>Password</span>
            <input type="password" className="fr" id="reset_password_phone_password" />
          </div>
          <div className="input_box">
            <span className="fl color_blueness" onClick={event => $(event.target).next('input').focus()}>Confirm Password</span>
            <input type="password" className="fr" id="reset_password_phone_passwordRepeat" />
          </div>
        </form>

        <Button
          onClick={() => onResetPssword(
            $('#reset_password_phone_phone').val().trim(), $('#reset_password_phone_code').val().trim(), $('#reset_password_phone_password').val().trim(), $('#reset_password_phone_passwordRepeat').val().trim(),
          )}
          type="primary"
          loading={loading}
          style={buttonStyle}
        >
          Reset
        </Button>
        <p className="subtitle">Know your password? &nbsp;&nbsp;&nbsp;&nbsp;<Link to="/login"><strong className="color_green">LOG IN</strong></Link></p>
      </RouteTransition>
    </div>
  )
}

export default ResetPdPhoneLayout
