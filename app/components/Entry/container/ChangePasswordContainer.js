import React from 'react'
import ChangePasswordLayout from '../layout/ChangePasswordLayout'

class ChangePasswordContaienr extends React.Component {
  onSubmit(password){
    console.log(password)
  }

  render() {
    return (
      <ChangePasswordLayout
        pathname={this.props.location.pathname}
        onSubmit={this.onSubmit}
      />
    )
  }
}

export default ChangePasswordContaienr
