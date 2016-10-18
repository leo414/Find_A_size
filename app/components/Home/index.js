import React from 'react'
import Nav from '../Layout/Nav'
import Footer from '../Layout/Footer'
import ProductList from '../Layout/ProductList'

import Mask from '../Common/Mask'

import Login from '../Entry/Login'

import Search from '../Search'
import EmailSignUp from './EmailSignUp'

class Home extends React.Component {
  // constructor(props) {
  //   super(props)
  // }
  render() {
    return (
      <div>
        <Nav />
        <Search />


        <hr style={{height: '1px', border: 'none', borderTop: '1px solid #ccc', margin: '50px 0'}} />

        <ProductList type="A">Popular Products</ProductList>
        <ProductList type="B">You may interetsed in these…</ProductList>

        <hr style={{height: '1px', border: 'none', borderTop: '1px solid #ccc', margin: '50px 0'}} />

        <EmailSignUp />
        <Footer />
      </div>
    )
  }
}

export default Home
