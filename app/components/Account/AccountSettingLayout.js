import React from 'react'
import { Link } from 'react-router'
import { Switch, Icon, Button } from 'antd'

const AccountSettingLayout = props => {
  const { loading, onEmailNotificationChange, onPhoneNotificationChange, onSubmit } = props
  const { Email, Phone, IsEmailNotification, IsPhoneNotification } = props.data

  const buttonStyle = {
    width: '120px',
    height: '30px',
    fontSize: "14px",
    float: 'right',
    borderColor: '#146eb4',
    backgroundColor: '#146eb4',
    marginRight: '200px',
  }

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
            defaultChecked={IsEmailNotification}
            checkedChildren={<Icon type="check" />}
            unCheckedChildren={<Icon type="cross" />}
            onChange={e => onEmailNotificationChange(e)}
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
            defaultChecked={IsPhoneNotification}
            checkedChildren={<Icon type="check" />}
            unCheckedChildren={<Icon type="cross" />}
            onChange={e => onPhoneNotificationChange(e)}
          />
        </div>
      </div>

      <p>
        <strong>Password:</strong>&nbsp;******&nbsp;&nbsp;&nbsp;&nbsp;
        <Link to="/change_password">Change password</Link>
        <Button onClick={onSubmit} type="primary" loading={loading} style={buttonStyle}>
          Submit
        </Button>
      </p>
      <hr style={{height: '1px', border: 'none', borderTop: '1px solid #ccc', margin: '15px 0'}} />
    </section>
  )
}

export default AccountSettingLayout
