import React from 'react'
import Button from '../Common/Button'

const EmailSignUp = () => {
  const onSignup = () => console.log('Sign Up')

  return (
    <section className="container email_signup">
      <div className="title">
        <h1>Get the best deal on your favorite furnitures!</h1>
        <p>We will watch the price for you so you will never miss a good deal</p>
      </div>

      <div className="signup in_block">
        <input type="text" placeholder="Email Address" />
        &nbsp;
        <Button
          width="212px"
          height="50px"
          fontSize="24px"
          buttonType="green"
          handleSubmit={() => onSignup()}
          value="SIGN UP"
        />
      </div>
    </section>
  )
}

export default EmailSignUp
