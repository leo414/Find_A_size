import React from 'react'

import NavContainer from '../Layout/NavContainer'
import Footer from '../Layout/Footer'
import ProductList from '../Product/ProductListContainer'

import AccountSetting from './AccountSetting'
import PriceWatchList from './PriceWatchList'


const Account = () => {
  return (
    <div>
      <NavContainer />
      <PriceWatchList />
      <AccountSetting />
      <ProductListContainer type="A">Popular Products</ProductListContainer>
      <ProductListContainer type="B">You may interetsed in these…</ProductListContainer>
      <Footer />
    </div>
  )
}

export default Account
