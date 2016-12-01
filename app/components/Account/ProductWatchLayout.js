import React from 'react'

import { InputNumber, Rate } from 'antd'
import Button from '../Common/Button'
import { Spin, Pagination } from 'antd'

const ProductWatchLayout = props => {
  const {
    data,
    total,
    onSelectPage,
  } = props

  const loadingStyle={
    width: '1000px',
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

    return data.map((item, index) => (
      <section className="price_watch_list container" key={index}>
        <div className="product_list_search">

          <section className="product_info in_block">
            <div className="media_hd fl">
              <img src={item.Product.ImageUrl} alt="Product"/>
            </div>
            <div className="media_bd fr">
              <h4 className="media_title">{item.Product.Title}</h4>
              <p className="media_desc">{item.Product.Description}</p>
              <strong>
                Dimensions: {item.Product.Length}*{item.Product.Width}*{item.Product.Height} inches <br/>
                Material: {item.Product.Material} <br/>
                Weight: {item.Product.Weight} <br/>
                Color: {item.Product.Color} <br/>
              </strong>
            </div>
          </section>

          <section className="product_price in_block">
            <div className="price_container">
              <em>Current Price:</em>
              <span className="price">${item.OriginalPrice}</span>
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
              <span className="price">${item.WatchValue}</span>
            </div>

            <div className="price_container">
              <em>Difference:</em>
              <span className="price">
                {item.OriginalPrice - item.WatchValue ? '+' : <span><i className="down fz-18 color_yellow" />-</span>}
                ${Math.abs(item.OriginalPrice - item.WatchValue).toFixed(2)}
              </span>
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
      <Pagination
        defaultCurrent={1}
        total={total * 10}
        onChange={onSelectPage}
        showSizeChanger={false}
      />
    </article>
  )
}

export default ProductWatchLayout
