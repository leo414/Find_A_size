import React from 'react'
import { hashHistory } from 'react-router'
import { RouteTransition, presets } from 'react-router-transition'

import { Modal } from 'antd'
const confirm = Modal.confirm

class Mask extends React.Component {
  showConfirm() {
    confirm({
      title: 'Sure to leave the current page?',
      okText: 'OK',
      cancelText: 'Cancel',
      onOk() {
        hashHistory.push('/')
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
