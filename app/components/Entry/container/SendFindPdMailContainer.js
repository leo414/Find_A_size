import React from 'react'
import SendFindPdMailLayout from '../layout/SendFindPdMailLayout'

class SendFindPdMailContainer extends React.Component {
  onSubmit(password){
    console.log(password)
  }

  render() {
    return (
      <SendFindPdMailLayout
        pathname={this.props.location.pathname}
        onSubmit={this.onSubmit}
      />
    )
  }
}

export default SendFindPdMailContainer
