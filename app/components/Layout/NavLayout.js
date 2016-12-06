import React from 'react'
import {Link, IndexLink} from 'react-router'

import { Input } from 'antd'

const NavLayout = ({isLogin, onSignOut, onSearch}) => {
  let searchText = ''
  return (
    <nav className="nav">
      <div className="container">
        <IndexLink to="/" className="logo in_block">Find-A-Size</IndexLink>
        <div className="search in_block">
          <Input type="text" placeholder="xx" onChange={event => searchText = event.target.value.trim()}/>
          <i className="sousuo-small" onClick={() => onSearch(searchText)} />
        </div>

        {
          isLogin ?
          <div className="entry in_block">
            <Link to="/account">My Account</Link>
            &nbsp;|&nbsp;
            <a href="javascript:void(0)" onClick={onSignOut}>Log Out</a>
          </div>

          :

          <div className="entry in_block">
            <Link to="/login">Log in</Link>
            &nbsp;|&nbsp;
            <Link to="/sign_up">Sign up</Link>
          </div>
        }

        {/*<Link className="my_list fr"><i className="ring" />&nbsp;My List</Link>*/}
      </div>
    </nav>
  )
}

export default NavLayout
