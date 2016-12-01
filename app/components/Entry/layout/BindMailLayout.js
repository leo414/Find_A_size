import React from 'react'
import { RouteTransition, presets } from 'react-router-transition'
import { Link } from 'react-router'
import classnames from 'classnames'

import { Button } from 'antd'
import Mask from '../Mask'

import $ from 'jquery'

const BindMailLayout = props => {
  const {
    pathname,
    onSubmit,
    loading,
  } = props

  const cls = classnames({
    hidden: pathname !== '/bind_mail'
  })

  const buttonStyle = {
    width: '280px',
    height: '38px',
    fontSize: "18px",
    backgroundColor: '#146eb4',
  }

  let email = ''

  return (
    <div className={cls}>
      <Mask pathname="/bind_mail" />
      <RouteTransition { ...presets.pop } style={{height: '290px'}} className="find_password" pathname="/bind_mail">
        <p className="h1 color_green">CONNECT WITH MAIL</p>

        <form>
          <div className="input_box">
            <span className="fl color_blueness" onClick={event => $(event.target).next('input').focus()}>Email Address</span>
            <input type="email" className="fr" onChange={event => email = event.target.value.trim()} /> <br/>
          </div>
        </form>

        <Button onClick={() => onSubmit(email)} type="primary" loading={loading} style={buttonStyle}>
          Send Email
        </Button>
      </RouteTransition>
    </div>
  )
}

export default BindMailLayout
