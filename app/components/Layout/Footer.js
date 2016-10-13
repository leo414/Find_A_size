import React from 'react'
import {Link} from 'react-router'

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <a href="#" className="in_block logo">Find-A-Size</a>
      <div className="in_block aside">
        1400 Sunset St,<br/>
        Suite 200<br/>
        Dallas, TX 75001
      </div>
      <div className="in_block aside">
        Contact us:<br/>
        info@findasize.com
      </div>
      <div className="in_block aside">
        <a href="#"><i className="facebook"/></a>&nbsp;&nbsp;&nbsp;&nbsp;
        <a href="#"><i className="tuite" /></a>
      </div>
    </div>

    <small className="small">2016 © Find-a-size. All rights reserved</small>
  </footer>
)

export default Footer
