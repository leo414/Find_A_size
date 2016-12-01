import React from 'react'

import { InputNumber, Rate } from 'antd'
import Button from '../Common/Button'
// import { Button, Spin } from 'antd'

const ProductWatchLayout = props => {
  const {
    data,
  } = props

  const loadingStyle={
    width: '1100px',
    height: '350px',
    background: 'rgba(0,0,0,0.05)',
    textAlign: 'center',
    paddingTop: '160px',
  }

  const buttonStyle = {
    width: '46%',
    height: '30px',
    fontSize: "14px",
    backgroundColor: '#146eb4',
    float: 'right',
    padding: 0,
  }

  const renderProductList = () => {
    if(!data.length) {
      return (
        <div style={loadingStyle}>
          <Spin size="large" /><br/>
          loading...
        </div>
      )
    }

    return data.map((product, index) => (
      <section className="price_watch_list container" key={index}>
        <div className="product_list_search">

          <section className="product_info in_block">
            <div className="media_hd fl">
              <img src={product.ImageUrl} alt="product"/>
            </div>
            <div className="media_bd fr">
              <h4 className="media_title">{product.Title}</h4>
              <p className="media_desc">{product.Description}</p>
              <strong>
                Dimensions: 24*2418 inches <br/>
                Material: Wood/Metal <br/>
                Color: brown <br/>
                Rating: <Rate disabled defaultValue={2} />
              </strong>
            </div>
          </section>

          <section className="product_price in_block">
            <div className="price_container">
              <em>Current Price:</em>
              <span className="price">${product.Price}</span>
              <Button
                width="88px"
                height="24px"
                fontSize="12px"
                className="green"
                handleSubmit={() => onSignup()}
                value="Change"
              />
            </div>

            <div className="price_container">
              <em>Price Watch:</em>
              <span className="price">$129.99</span>
            </div>

            <div className="price_container">
              <em>Difference:</em>
              <span className="price"><i className="down fz-18 color_yellow" />-$129.99</span>
              <Button
                width="88px"
                height="24px"
                fontSize="12px"
                className="yellow"
                handleSubmit={() => onSignup()}
                value="BUY NOW!"
              />
            </div>
          </section>

        </div>
      </section>
    ))
  }

  return (
    <article className="my_account">
      <p className="h1">My Account</p>
      <p className="subtitle">My Price Watch List</p>
      {renderProductList()}
    </article>
  )
}

export default ProductWatchLayout
