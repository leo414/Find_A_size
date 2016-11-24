import React from 'react'
import ResetPdPhoneLayout from '../layout/ResetPdPhoneLayout'

class ResetPdPhoneContainer extends React.Component {
  onSubmit(password){
    console.log(password)
  }

  render() {
    return (
      <ResetPdPhoneLayout
        pathname={this.props.location.pathname}
        onSubmit={this.onSubmit}
      />
    )
  }
}

export default ResetPdPhoneContainer
