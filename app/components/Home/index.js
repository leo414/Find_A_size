import React from 'react'
import Nav from '../Layout/Nav'
import Footer from '../Layout/Footer'
import Search from './Search'
import ProductList from './ProductList'

const Home = () => (
  <div>
    <Nav />
    <Search />
    <ProductList />
    <Footer />
  </div>
)

export default Home
