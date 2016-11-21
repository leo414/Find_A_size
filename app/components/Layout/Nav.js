import React from 'react'
import {Link, IndexLink} from 'react-router'

const Nav = ({isLogin}) => (
  <nav className="nav">
    <div className="container">
      <IndexLink to="/" className="logo in_block">Find-A-Size</IndexLink>
      <div className="search in_block">
        <input type="text"/>
        <i className="sousuo-small" />
      </div>

      {
        isLogin ?
        <div className="entry in_block">
          <Link to="/account">My Account</Link>
          &nbsp;|&nbsp;
          <Link to="/sign_up">Log Out</Link>
        </div>

        :

        <div className="entry in_block">
          <Link to="/login">Log in</Link>
          &nbsp;|&nbsp;
          <Link to="/sign_up">Sign up</Link>
        </div>
      }

      <Link className="my_list fr"><i className="ring" />&nbsp;My List</Link>
    </div>
  </nav>
)

export default Nav
