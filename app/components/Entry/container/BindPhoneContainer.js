import React from 'react'
import BindPhoneLayout from '../layout/BindPhoneLayout'

class BindPhoneContainer extends React.Component {
  onSubmit(password){
    console.log(password)
  }

  render() {
    return (
      <BindPhoneLayout
        pathname={this.props.location.pathname}
        onSubmit={this.onSubmit}
      />
    )
  }
}

export default BindPhoneContainer
