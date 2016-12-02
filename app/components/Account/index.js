import React from 'react'

import NavContainer from '../Layout/NavContainer'
import Footer from '../Layout/Footer'

import AccountSetting from './AccountSetting'
import ProductWatchContainer from './ProductWatchContainer'

const Account = () => {
  return (
    <div>
      <NavContainer />
      <ProductWatchContainer />
      <AccountSetting />
      <Footer />
    </div>
  )
}

export default Account
