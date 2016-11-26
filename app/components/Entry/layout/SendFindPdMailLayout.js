import React from 'react'
import { RouteTransition, presets } from 'react-router-transition'
import { Link } from 'react-router'
import classnames from 'classnames'

import Button from '../../Common/Button'
import Mask from '../Mask'

import $ from 'jquery'
import { message } from 'antd'

const SendFindPdMailLayout = ({pathname, onSubmit}) => {
  const cls = classnames({
    hidden: pathname !== '/send_find_pd_mail'
  });

  let email = ''

  return (
    <div className={cls}>
      <Mask pathname="/send_find_pd_mail" />
      <RouteTransition { ...presets.pop } className="find_password" pathname="/send_find_pd_mail">
        <p className="h1 color_green">FORGOT YOUR PASSWORD?</p>

        <form>
          <div className="input_box">
            <span className="fl color_blueness" onClick={event => $(event.target).next('input').focus()}>Email Address</span>
            <input type="email" className="fr" onChange={event => email = event.target.value.trim()} /> <br/>
          </div>
        </form>

        <Button
          width="280px"
          height="38px"
          fontSize="18px"
          className="green"
          handleSubmit={() => onSubmit(email)}
          value="Submit"
        />

        <p className="subtitle">Know your password? &nbsp;&nbsp;&nbsp;&nbsp;<Link to="/login"><strong className="color_green">LOG IN</strong></Link></p>
      </RouteTransition>
    </div>
  )
}

export default SendFindPdMailLayout
