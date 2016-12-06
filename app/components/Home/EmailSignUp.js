import React from 'react'
import Button from '../Common/Button'
import { hashHistory } from 'react-router'

const EmailSignUp = () => {
  const onSignup = email => {
    hashHistory.push({pathname: '/sign_up', query: null, state: {email}})
  }

  let email = ''

  return (
    <section className="container email_signup">
      <div className="title">
        <h1>Get the best deal on your favorite furnitures!</h1>
        <p>We will watch the price for you so you will never miss a good deal</p>
      </div>

      <div className="signup in_block">
        <input type="text" placeholder="Email Address" onChange={event => email = event.target.value.trim()} />
        &nbsp;
        <Button
          width="212px"
          height="50px"
          fontSize="24px"
          className="green"
          handleSubmit={() => onSignup(email)}
          value="SIGN UP"
        />
      </div>
    </section>
  )
}

export default EmailSignUp
