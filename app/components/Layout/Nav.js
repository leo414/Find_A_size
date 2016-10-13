import React from 'react'
import {Link} from 'react-router'

const Nav = () => (
  <nav className="nav">
    <div className="container">
      <span className="logo in_block">Find-A-Size</span>
      <div className="search in_block">
        <input type="text"/>
        <i className="sousuo-small" />
      </div>

      <div className="entry in_block">
        <Link href="#">Log in</Link>
        &nbsp;|&nbsp;
        <Link href="#">Sign up</Link>
      </div>

      <div className="my_list fr"><i className="ring" />&nbsp;My List</div>
    </div>
  </nav>
)

export default Nav
