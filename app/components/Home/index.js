import React from 'react'
import { hashHistory } from 'react-router'
import NavContainer from '../Layout/NavContainer'
import Footer from '../Layout/Footer'
import ProductListContainer from '../Product/ProductListContainer'

import Search from '../Search'
import EmailSignUp from './EmailSignUp'

class Home extends React.Component {
  render() {
    return (
      <div>
        <NavContainer isHome={true} isLogin={this.props.isLogin}/>
        <Search />

        <hr style={{height: '1px', border: 'none', borderTop: '1px solid #ccc', margin: '50px 0'}} />

        <ProductListContainer type="A">Popular Products</ProductListContainer>
        <ProductListContainer type="B">You may interetsed in these…</ProductListContainer>

        <hr style={{height: '1px', border: 'none', borderTop: '1px solid #ccc', margin: '50px 0'}} />

        <EmailSignUp />
        <Footer />
      </div>
    )
  }
}

export default Home
