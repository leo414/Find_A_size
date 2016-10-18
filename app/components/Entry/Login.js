import React from 'react'
import { RouteTransition, presets } from 'react-router-transition'
import { Link } from 'react-router'
import classnames from 'classnames'

import Button from '../Common/Button'
import Mask from './Mask'

const Login = props => {
  const cls = classnames({
    hidden: props.location.pathname !== '/login'
  });

  return (
    <div className={cls}>
      <Mask pathname="/login" />
      <RouteTransition { ...presets.pop } className="login_page" pathname="/login">
        <p className="h1 color_green">WELCOME BACK!</p>

        <Button
          width="320px"
          height="44px"
          fontSize="22px"
          className="red"
          handleSubmit={() => onSignup()}
          value="Log in with Google"
        />

        <br/>
        <br/>

        <Button
          width="320px"
          height="44px"
          fontSize="22px"
          className="deongaree"
          handleSubmit={() => onSignup()}
          value="Log in with Facebook"
        />

        <p className="subtitle">Don’t have an account? &nbsp;&nbsp;&nbsp;&nbsp;<Link to="/sign_up"><strong className="color_green">SIGN UP</strong></Link></p>

        <hr style={{height: '1px', border: 'none', borderTop: '1px solid #eee', marginTop: '40px'}} />
        <p className="h1 color_green or">OR</p>

        <form>
          <input type="text" placeholder="Username" /> <br/>
          <input type="email" placeholder="Email Address" />  <br/>
          <input type="password" placeholder="Password" />
        </form>

        <Button
          width="250px"
          height="38px"
          fontSize="18px"
          className="green"
          handleSubmit={() => onSignup()}
          value="LOG IN"
        />

        <p className="subtitle"><Link to="find_password">Forgot your password?</Link></p>
      </RouteTransition>
    </div>
  )
}

export default Login
