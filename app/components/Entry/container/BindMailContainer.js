import React from 'react'
import BindMailLayout from '../layout/BindMailLayout'

class BindMailContainer extends React.Component {
  onSubmit(password){
    console.log(password)
  }

  render() {
    return (
      <BindMailLayout
        pathname={this.props.location.pathname}
        onSubmit={this.onSubmit}
      />
    )
  }
}

export default BindMailContainer
