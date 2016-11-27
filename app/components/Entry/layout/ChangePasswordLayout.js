import React from 'react'
import { RouteTransition, presets } from 'react-router-transition'
import { Link } from 'react-router'
import classnames from 'classnames'

import { Button } from 'antd'
import Mask from '../Mask'

import $ from 'jquery'
import { message } from 'antd'

const ChangePasswordLayout = ({pathname, onSubmit, loading}) => {
  const cls = classnames({
    hidden: pathname !== '/change_password'
  })

  const buttonStyle = {
    width: '280px',
    height: '38px',
    fontSize: "18px",
    backgroundColor: '#146eb4',
  }

  let rawPassword = '',
      newPassword = ''

  return (
    <div className={cls}>
      <Mask pathname="/change_password" />
      <RouteTransition { ...presets.pop } style={{height: '350px'}} className="find_password" pathname="/change_password">
        <p className="h1 color_green">CHANGE YOUR PASSWORD</p>

        <form>
          <div className="input_box">
            <span className="fl color_blueness" onClick={event => $(event.target).next('input').focus()}>Raw Password</span>
            <input type="password" className="fr" onChange={event => rawPassword = event.target.value.trim()} /> <br/>
          </div>

          <div className="input_box">
            <span className="fl color_blueness" onClick={event => $(event.target).next('input').focus()}>New Password</span>
            <input type="password" className="fr" onChange={event => newPassword = event.target.value.trim()} /> <br/>
          </div>
        </form>

        <Button onClick={() => onSubmit(rawPassword, newPassword)} type="primary" loading={loading} style={buttonStyle}>
          Reset Password
        </Button>
      </RouteTransition>
    </div>
  )
}

export default ChangePasswordLayout
