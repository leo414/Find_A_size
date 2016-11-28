import React from 'react'

import NavContainer from '../Layout/NavContainer'
import Footer from '../Layout/Footer'
import ProductList from '../Layout/ProductList'

import AccountSetting from './AccountSetting'
import PriceWatchList from './PriceWatchList'


const Account = () => {
  return (
    <div>
      <Nav />
      <PriceWatchList />
      <AccountSetting />
      <ProductList type="A">Popular Products</ProductList>
      <ProductList type="B">You may interetsed in these…</ProductList>
      <Footer />
    </div>
  )
}

export default Account
