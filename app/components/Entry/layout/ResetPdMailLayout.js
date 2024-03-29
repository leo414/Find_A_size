import React from 'react'
import { RouteTransition, presets } from 'react-router-transition'
import { Link } from 'react-router'
import classnames from 'classnames'

import { Button } from 'antd'
import Mask from '../Mask'

import $ from 'jquery'

const ResetPdMailLayout = ({pathname, onSubmit, loading}) => {
  const cls = classnames({
    hidden: pathname !== '/send_pd_mail'
  })

  const buttonStyle = {
    width: '280px',
    height: '38px',
    fontSize: "18px",
    backgroundColor: '#146eb4',
  }

  return (
    <div className={cls}>
      <Mask pathname="/send_pd_mail" />
      <RouteTransition { ...presets.pop } className="find_password" pathname="/send_pd_mail" style={{height: '360px'}}>
        <p className="h1 color_green">FORGOT YOUR PASSWORD?</p>
        <Link className="fz_middle" to="reset_pd_phone">Retrieve password via mobile phone</Link>

        <form>
          <div className="input_box">
            <span className="fl color_blueness" onClick={event => $(event.target).next('input').focus()}>Email</span>
            <input type="email" className="fr" id="reset_pd_mail_email" /> <br/>
          </div>
        </form>

        <Button onClick={() => onSubmit($('#reset_pd_mail_email').val().trim())} type="primary" loading={loading} style={buttonStyle}>
          Send Email
        </Button>

        <p className="subtitle">Know your password? &nbsp;&nbsp;&nbsp;&nbsp;<Link to="/login"><strong className="color_green">LOG IN</strong></Link></p>
      </RouteTransition>
    </div>
  )
}

export default ResetPdMailLayout
