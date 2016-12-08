import React from 'react'

import { InputNumber, Spin, Button, Pagination } from 'antd'
import SynchronizeAction from '../../actions/SynchronizeAction'

const SearchResultLayout = props => {
  const { data, loading, addList, total, isSearchEmpty, isSearch } = props

  const onSelectPage = index => {
    SynchronizeAction.productSearchPageIndex(index)
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

  const loadingStyle={
    width: '1000px',
    height: '350px',
    background: 'rgba(0,0,0,0.05)',
    textAlign: 'center',
    paddingTop: '160px',
  }

  const renderProductList = () => {
    if(isSearch) {
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
              <h4 className="media_title"><a href={product.LinkUrl} target="_blank">{product.Title}</a></h4>
              <p className="media_desc">{product.Description}</p>
              <strong>
                Dimensions: {product.Length/100}*{product.Width/100}*{product.Height/100} inches <br/>
                Material: {product.Material} <br/>
                Weight: {product.Weight} Pounds<br/>
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
                <Button onClick={() => addList(price, product.Id)} type="primary" loading={loading.id === product.Id ? loading.state : false} style={buttonStyle}>
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
      {
        data.length ?
        <Pagination
          defaultCurrent={1}
          total={total}
          onChange={onSelectPage}
          showSizeChanger={false}
        />
        :  null
      }
      {
        isSearchEmpty ?
        <h1 style={{fontSize: '20px'}}>Nothing was found.</h1>
        : null
      }
    </article>
  )
}

export default SearchResultLayout
