import React from 'react'

import { InputNumber, Spin, Button } from 'antd'

const SearchResultLayout = props => {
  const { data, loading, addList } = props

  const onChange = value => {
    console.log('changed', value)
  }

  const buttonStyle = {
    width: '88px',
    height: '30px',
    lineHeight: '30px',
    fontSize: "12px",
    padding: 0,
    marginTop: '10px',
    backgroundColor: '#146eb4',
  }

  const loadingStyle = {}

  const renderProductList = () => {
    if(!data.length) {
      return (
        <div style={loadingStyle}>
          <Spin size="large" /><br/>
          loading...
        </div>
      )
    }

    return data.map((product, index) => {
      let price = ''
      return (
        <div className="product_list_search" key={index}>
          <section className="product_info in_block">
            <div className="media_hd fl">
              <img src={product.ImageUrl} alt="Product"/>
            </div>
            <div className="media_bd fr">
              <h4 className="media_title">{product.Title}</h4>
              <p className="media_desc">{product.Description}</p>
              <strong>
                Dimensions: {product.Length}*{product.Width}*{product.Height} inches <br/>
                Material: {product.Material} <br/>
                Weight: {product.Weight} <br/>
                Color: {product.Color} <br/>
              </strong>
            </div>
          </section>

          <section className="product_price in_block">
            <div className="price_container">
              <em className="fl">Current Price:</em>
              <div className="fr">
                {product.Price}$ <br/>
                <a className="btn yellow fl" style={{width: "88px", height: "24px", lineHeight: '24px', fontSize: "12px"}} href={product.LinkUrl} target="_blank">
                  BUY NOW!
                </a>
              </div>
            </div>

            <div className="price_container">
              <em className="fl">Price Watch:</em>

              <div className="fr">
                <InputNumber min={1} onChange={value => price = value} />
                <strong>$</strong>
                <br/>
                <Button onClick={() => addList(price, product.Id)} type="primary" loading={loading} style={buttonStyle}>
                  Add to list
                </Button>
              </div>
            </div>
          </section>
        </div>
      )}
    )
  }

  return (
    <article className="search_result container">
      {renderProductList()}
    </article>
  )
}

export default SearchResultLayout
