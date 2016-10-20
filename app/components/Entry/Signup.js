import React from 'react'
import { RouteTransition, presets } from 'react-router-transition'
import { Link } from 'react-router'
import classnames from 'classnames'

import Button from '../Common/Button'
import Mask from './Mask'

const Signup = props => {
  const cls = classnames({
    hidden: props.location.pathname !== '/sign_up'
  });

  return (
    <div className={cls}>
      <Mask pathname="/sign_up" />
      <RouteTransition { ...presets.pop } className="sign_up_page" pathname="/sign_up">
        <p className="h1 color_green">Create a free account</p>

        <Button
          width="320px"
          height="44px"
          fontSize="22px"
          className="red"
          handleSubmit={() => onSignup()}
          value="Sign up with Google"
        />

        <br/>
        <br/>

        <Button
          width="320px"
          height="44px"
          fontSize="22px"
          className="deongaree"
          handleSubmit={() => onSignup()}
          value="Sign up with Facebook"
        />

        <p className="subtitle">Already have an account? &nbsp;&nbsp;&nbsp;&nbsp;<Link to="/login"><strong className="color_green">LOG IN</strong></Link></p>

        <hr style={{height: '1px', border: 'none', borderTop: '1px solid #eee', marginTop: '40px'}} />
        <p className="h1 color_green or">OR</p>

        <form>
          <div className="input_box">
            <span className="fl color_blueness">Username</span>
            <input type="text" className="fr" />
          </div>
          <div className="input_box">
            <span className="fl color_blueness">Email Address</span>
            <input type="email" className="fr" />  <br/>
          </div>
          <div className="input_box">
            <span className="fl color_blueness">Password</span>
            <input type="password" className="fr" />
          </div>

          <div className="input_box">
            <span className="fl color_blueness">Confirm Password</span>
            <input type="password" className="fr" />
          </div>
        </form>

        <Button
          width="280px"
          height="38px"
          fontSize="18px"
          className="green"
          handleSubmit={() => onSignup()}
          value="Sign up"
        />

        <br/>

        <small className="aside color_blueness in_block">
          By creating an account, you agree to Find-A-Size’s <a>Terms of Services</a> and <a>Privacy Policy</a>.
        </small>
      </RouteTransition>
    </div>
  )
}

export default Signup
