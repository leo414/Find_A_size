import React from 'react'
import AccountSettingLayout from './AccountSettingLayout'

class AccountSettingContainer extends React.Component {
  render() {
    return (
      <AccountSettingLayout
        data={this.props.data}
      />
    )
  }
}

export default AccountSettingContainer
