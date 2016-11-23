import React from 'react'
import FindPasswordLayout from './FindPasswordLayout'

class FindPasswordContainer extends React.Component {
  onSubmit(password){
    console.log(password)
  }

  render() {
    return (
      <FindPasswordLayout
        pathname={this.props.location.pathname}
        onSubmit={this.onSubmit}
      />
    )
  }
}

export default FindPasswordContainer
