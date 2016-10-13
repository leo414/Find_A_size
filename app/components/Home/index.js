import React from 'react'
import Nav from '../Layout/Nav'
import Footer from '../Layout/Footer'
import Search from './Search'
import ProductList from './ProductList'
import EmailSignUp from './EmailSignUp'

const Home = () => (
  <div>
    <Nav />
    <Search />
    <ProductList />
    <EmailSignUp />
    <Footer />
  </div>
)

export default Home
