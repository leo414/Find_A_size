import React from 'react'

import NavContainer from '../Layout/NavContainer'
import Footer from '../Layout/Footer'
import ProductListContainer from '../Product/ProductListContainer'

import AccountSetting from './AccountSetting'
import ProductWatchContainer from './ProductWatchContainer'


const Account = () => {
  return (
    <div>
      <NavContainer />
      <ProductWatchContainer />
      <AccountSetting />
      <ProductListContainer type="A">Popular Products</ProductListContainer>
      <ProductListContainer type="B">You may interetsed in these…</ProductListContainer>
      <Footer />
    </div>
  )
}

export default Account
