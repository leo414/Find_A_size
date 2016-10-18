import React from 'react'
import { browserHistory } from 'react-router'
import { RouteTransition, presets } from 'react-router-transition'

import { Modal } from 'antd'
const confirm = Modal.confirm

class Mask extends React.Component {
  showConfirm() {
    confirm({
      title: 'Want to delete these items?',
      content: 'When clicked the OK button, this dialog will be closed after 1 second',
      okText: 'OK',
      cancelText: 'Cancel',
      onOk() {
        browserHistory.push('/')
      },
      onCancel() {},
    })
  }

  render() {
    return (
      <div onClick={this.showConfirm}>
        <RouteTransition { ...presets.fade } className="mask_component" pathname={this.props.pathname} />
      </div>
    )
  }
}

export default Mask
