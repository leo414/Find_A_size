import React from 'react'
import { RouteTransition, presets } from 'react-router-transition'
import { Link } from 'react-router'
import classnames from 'classnames'

import Button from '../Common/Button'
import Mask from './Mask'

const FindPassword = props => {
  const cls = classnames({
    hidden: props.location.pathname !== '/find_password'
  });

  return (
    <div className={cls}>
      <Mask pathname="/find_password" />
      <RouteTransition { ...presets.pop } className="find_password" pathname="/find_password">
        <p className="h1 color_green">Forgot your Password?</p>

        <form>
          <input type="email" placeholder="Email Address" />  <br/>
        </form>

        <Button
          width="250px"
          height="38px"
          fontSize="18px"
          className="green"
          handleSubmit={() => onSignup()}
          value="Reset Password"
        />

        <p className="subtitle">Know your password? &nbsp;&nbsp;&nbsp;&nbsp;<Link to="/login"><strong className="color_green">LOG IN</strong></Link></p>
      </RouteTransition>
    </div>
  )
}

export default FindPassword
