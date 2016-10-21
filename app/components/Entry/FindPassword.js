import React from 'react'
import { RouteTransition, presets } from 'react-router-transition'
import { Link } from 'react-router'
import classnames from 'classnames'

import Button from '../Common/Button'
import Mask from './Mask'

import $ from 'jquery'
import { message } from 'antd'

const FindPassword = props => {
  const cls = classnames({
    hidden: props.location.pathname !== '/find_password'
  });

  const onSubmit = (e, email) => {
    e.stopPropagation()
    console.log(email)
    if(!email) error()
  }

  const error = () => {
    message.error('This is a message of error')
  }

  let email = ''

  return (
    <div className={cls}>
      <Mask pathname="/find_password" />
      <RouteTransition { ...presets.pop } className="find_password" pathname="/find_password">
        <p className="h1 color_green">Forgot your Password?</p>

        <form>
          <div className="input_box">
            <span className="fl color_blueness" onClick={event => $(event.target).next('input').focus()}>Email Address</span>
            <input type="email" className="fsr" onChange={event => email = event.target.value.trim()} /> <br/>
          </div>
        </form>

        <Button
          width="280px"
          height="38px"
          fontSize="18px"
          className="green"
          handleSubmit={e => onSubmit(e, email)}
          value="Reset Password"
        />

        <p className="subtitle">Know your password? &nbsp;&nbsp;&nbsp;&nbsp;<Link to="/login"><strong className="color_green">LOG IN</strong></Link></p>
      </RouteTransition>
    </div>
  )
}

export default FindPassword
