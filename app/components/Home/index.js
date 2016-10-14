import React from 'react'
import Nav from '../Layout/Nav'
import Footer from '../Layout/Footer'
import ProductList from '../Layout/ProductList'

import Search from './Search'
import EmailSignUp from './EmailSignUp'

const Home = () => (
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

export default Home
