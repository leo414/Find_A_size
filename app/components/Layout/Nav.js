import React from 'react'
import {Link} from 'react-router'

const Nav = () => (
  <nav className="nav">
    <div className="container">
      <Link className="logo in_block">Find-A-Size</Link>
      <div className="search in_block">
        <input type="text"/>
        <i className="sousuo-small" />
      </div>

      <div className="entry in_block">
        <Link href="#">Log in</Link>
        &nbsp;|&nbsp;
        <Link href="#">Sign up</Link>
      </div>

      <Link className="my_list fr"><i className="ring" />&nbsp;My List</Link>
    </div>
  </nav>
)

export default Nav
