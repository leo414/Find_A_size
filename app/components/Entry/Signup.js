import React from 'react'
import Button from '../Common/Button'

const Signup = () => (
  <section className="sign_up_page hidden">
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

    <p className="subtitle">Already have an account? &nbsp;&nbsp;&nbsp;&nbsp;<a><strong className="color_green">LOG IN</strong></a></p>

    <hr style={{height: '1px', border: 'none', borderTop: '1px solid #eee', marginTop: '40px'}} />
    <p className="h1 color_green or">OR</p>

    <form>
      <input type="text" placeholder="Username" /> <br/>
      <input type="email" placeholder="Email Address" />  <br/>
      <input type="password" placeholder="Password" />
      <input type="password" placeholder="Confirm Password" />
    </form>

    <Button
      width="250px"
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
  </section>
)

export default Signup
