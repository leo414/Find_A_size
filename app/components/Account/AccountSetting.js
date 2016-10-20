import React from 'react'

import { Radio } from 'antd'
const RadioGroup = Radio.Group

import Button from '../Common/Button'

class AccoutSetting extends React.Component {
  constructor(props) {
    super(props)
    this.state = ({
       valueOne: 1,
       valueTwo: 2,
    })

    this.onChangeFirst = this.onChangeFirst.bind(this)
    this.onChangeTwo = this.onChangeTwo.bind(this)
  }

  onChangeFirst(e) {
    console.log('radio checked', e.target.value)
    this.setState({
      valueOne: e.target.value,
    });
  }

  onChangeTwo(e) {
    console.log('radio checked', e.target.value)
    this.setState({
      valueTwo: e.target.value,
    });
  }

  render() {
    return (
      <section className="accout_setting">
        <hr style={{height: '1px', border: 'none', borderTop: '1px solid #ccc', margin: '15px 0'}} />
        <div className="title">
          <p className="h1 fl color_green">Account Setting</p>

          <Button
            width="120px"
            height="40px"
            fontSize="20px"
            className="white fr"
            handleSubmit={() => onSignup()}
            value="Edit"
          />
        </div>

        <div className="fl">
          <strong>User Name: </strong>Johnny Hill <br/>
          <strong>UEmail Address:</strong>Johnny Hill@gmail.com <br/>
          <strong>Password:</strong>******<br/>
          <strong>Phone Number:</strong>123-456-7890
        </div>

        <div className="fr">
          <br/>
          <strong>Push Notification for Price Alert?</strong>
          <RadioGroup onChange={this.onChangeFirst} value={this.state.valueOne}>
            <Radio key="a" value={1}>Yes</Radio>
            <Radio key="b" value={2}>No</Radio>
          </RadioGroup>

          <br/><br/>

          <strong>Push Notification for Price Alert?</strong>
          <RadioGroup onChange={this.onChangeTwo} value={this.state.valueTwo}>
            <Radio key="a" value={1}>Yes</Radio>
            <Radio key="b" value={2}>No</Radio>
          </RadioGroup>
        </div>

        <div className="clear_both" />

        <footer className="account_connect">
          <strong>Social Account:</strong>
          <Button
            width="340px"
<<<<<<< HEAD
            height="60px"
=======
            height="70px"
>>>>>>> master
            fontSize="20px"
            className="deongaree"
            handleSubmit={() => onSignup()}
            value="Connected with Facebook"
          />
          <strong>
            <a href="" className="color_deongaree link"><em>Remove Link</em></a>
          </strong>
        </footer>

        <hr style={{height: '1px', border: 'none', borderTop: '1px solid #ccc', margin: '15px 0'}} />
      </section>
    )
  }
}

export default AccoutSetting
