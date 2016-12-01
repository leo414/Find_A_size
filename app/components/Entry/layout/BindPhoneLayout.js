import React from 'react'
import { RouteTransition, presets } from 'react-router-transition'
import { Link } from 'react-router'
import classnames from 'classnames'

import { Button } from 'antd'
import Mask from '../Mask'

import $ from 'jquery'

const BindPhoneLayout = props => {
  const {
    pathname,
    getCode,
    onSubmit,
    loading,
    isClickGetCode,
  } = props

  const cls = classnames({
    hidden: pathname !== '/bind_phone'
  })

  const buttonStyle = {
    width: '280px',
    height: '38px',
    fontSize: "18px",
    backgroundColor: '#146eb4',
  }

  let phone = '',
      code = '';

  return (
    <div className={cls}>
      <Mask pathname="/bind_phone" />
      <RouteTransition { ...presets.pop } style={{height: '300px', top: '20%'}} className="sign_up_phone" pathname="/bind_phone">
        <p className="h1 color_green">CONNECT WITH PHONE NUMBER</p>

        <form>
          <div className="input_box phone_number">
            <span className="fl color_blueness" onClick={event => $(event.target).next('input').focus()}>Phone Number</span>
            <input
              type="number"
              className="fr"
              readOnly={isClickGetCode ? "readOnly" : ''}
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
                handleSubmit={() => getCode(phone, code)}
                value="Get code"
              />
            }
          </div>

          <div className="input_box">
            <span className="fl color_blueness" onClick={event => $(event.target).next('input').focus()}>Code</span>
            <input type="number" className="fr" onChange={event => code = event.target.value.trim()} /> <br/>
          </div>
        </form>

        <Button onClick={() => onSubmit(phone, code)} type="primary" loading={loading} style={buttonStyle}>
          Connect
        </Button>
      </RouteTransition>
    </div>
  )
}

export default BindPhoneLayout
