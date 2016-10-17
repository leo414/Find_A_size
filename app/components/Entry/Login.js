import React from 'react'

import Button from '../Common/Button'

const Login = () => {
  return (
    <div>
      <div id="mask"></div>
      <section className="login_page">
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

        <p className="subtitle">Don’t have an account? &nbsp;&nbsp;&nbsp;&nbsp;<a><strong className="color_green">SIGN UP</strong></a></p>

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

        <p className="subtitle"><a>Forgot your password?</a></p>
      </section>
    </div>
  )
}

export default Login
