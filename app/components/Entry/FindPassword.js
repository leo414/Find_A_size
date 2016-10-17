import React from 'react'
import Button from '../Common/Button'

const FindPassword = () => (
  <section className="find_password hidden">
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

    <p className="subtitle">Know your password? &nbsp;&nbsp;&nbsp;&nbsp;<a><strong className="color_green">LOG IN</strong></a></p>
  </section>
)

export default FindPassword
