import React from 'react'
import ReactDOM from 'react-dom'

class Mask extends React.Component {
  static defaultProps = {
    open: false
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open && !this.props.open) {
      this.node = document.createElement('div')
      this.node.className = 'ReactModal'
      document.getElementsByTagName('body')[0].appendChild(this.node)
      let modal = (
          <div className="mask" id="mask">
            <div {...this.props}></div>
            {this.props.children}
          </div>
      )
      let allClass = document.getElementsByClassName('ReactModal')
      ReactDOM.render(modal, allClass[allClass.length - 1])
    }
    if (this.props.open && !nextProps.open) {
      ReactDOM.unmountComponentAtNode(this.node)
    }
  }

  render() {
    return null
  }
}

export default Mask
