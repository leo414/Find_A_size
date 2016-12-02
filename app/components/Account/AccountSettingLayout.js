import React from 'react'
import { Link } from 'react-router'
import { Switch, Icon } from 'antd'

import Button from '../Common/Button'

class AccountSettingLayout extends React.Component {
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
    const { Email, Phone, IsEmailNotification, IsPhoneVerified } = this.props.data
    return (
      <section className="accout_setting">
        <hr style={{height: '1px', border: 'none', borderTop: '1px solid #ccc', margin: '15px 0'}} />
        <div className="title">
          <p className="h1 color_green">Account Setting</p>
        </div>

        <div>
          <p className="fl">
            <strong>Email Address:</strong>&nbsp;
            {
              Email ?
              Email :
              <Link to="bind_mail">Connect Email</Link>
            }
          </p>
          <div className="fr">
            <strong>Push Notification for Price Alert?</strong>
            <Switch
              disabled={!Email}
              defaultChecked={!Email}
              checkedChildren={<Icon type="check" />}
              unCheckedChildren={<Icon type="cross" />}
              onChange={e => console.log(e)}
            />
          </div>
        </div>

        <div>
          <p className="fl">
            <strong>Phone Number:</strong>&nbsp;
            {
              Phone ?
              Phone :
              <Link to="bind_phone">Connect Phone Number</Link>
            }
          </p>
          <div className="fr">
            <strong>Push Notification for Price Alert?</strong>
            <Switch
              disabled={!Phone}
              defaultChecked={!Phone}
              checkedChildren={<Icon type="check" />}
              unCheckedChildren={<Icon type="cross" />}
              onChange={e => console.log(e)}
            />
          </div>
        </div>

        <p>
          <strong>Password:</strong>&nbsp;******&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/change_password">Change password</Link>
        </p>
        <hr style={{height: '1px', border: 'none', borderTop: '1px solid #ccc', margin: '15px 0'}} />
      </section>
    )
  }
}

export default AccountSettingLayout
