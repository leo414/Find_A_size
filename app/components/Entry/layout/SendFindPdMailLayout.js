import React from 'react'
import { RouteTransition, presets } from 'react-router-transition'
import { Link } from 'react-router'
import classnames from 'classnames'

import { Button } from 'antd'
import Mask from '../Mask'

import $ from 'jquery'

const SendFindPdMailLayout = ({pathname, onSubmit, loading}) => {
  const cls = classnames({
    hidden: pathname !== '/reset_pd_mail'
  })

  const buttonStyle = {
    width: '280px',
    height: '38px',
    fontSize: "18px",
    backgroundColor: '#146eb4',
  }

  let password = '',
      passwordRepeat = ''

  return (
    <div className={cls}>
      <Mask pathname="/reset_pd_mail" />
      <RouteTransition { ...presets.pop } className="find_password" pathname="/reset_pd_mail">
        <p className="h1 color_green">Reset your Password</p>

        <form>
          <div className="input_box">
            <span className="fl color_blueness" onClick={event => $(event.target).next('input').focus()}>Password</span>
            <input type="password" className="fr" onChange={event => password = event.target.value.trim()} /> <br/>
          </div>

          <div className="input_box">
            <span className="fl color_blueness" onClick={event => $(event.target).next('input').focus()}>Confirm Password</span>
            <input type="password" className="fr" onChange={event => passwordRepeat = event.target.value.trim()} /> <br/>
          </div>
        </form>

        <Button onClick={() => onSubmit(password, passwordRepeat)} type="primary" loading={loading} style={buttonStyle}>
          Reset password
        </Button>
      </RouteTransition>
    </div>
  )
}

export default SendFindPdMailLayout
