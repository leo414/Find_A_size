import React from 'react'
import ResetPdMailLayout from '../layout/ResetPdMailLayout'

class ResetPdMailContainer extends React.Component {
  onSubmit(password){
    console.log(password)
  }

  render() {
    return (
      <ResetPdMailLayout
        pathname={this.props.location.pathname}
        onSubmit={this.onSubmit}
      />
    )
  }
}

export default ResetPdMailContainer
