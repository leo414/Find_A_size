import React from 'react'

import Button from '../Common/Button'
import { Spin, Pagination } from 'antd'

const ProductWatchLayout = props => {
  const {
    data,
    total,
    onSelectPage,
    addList,
    newPrice,
    productId,
    deleteWatch,
    isDataEmpty,
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
    if(isDataEmpty){
      return <div>you don't pay attention to anything</div>
    }

    if(!data.length && !isDataEmpty) {
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
                { item.Product.Length ? <span>L: {item.Product.Length}&nbsp;&nbsp;</span> : null }
                { item.Product.Width ? <span>W: {item.Product.Width}&nbsp;&nbsp;</span> : null }
                { item.Product.Height ? <span>H: {item.Product.Height}&nbsp;&nbsp;</span> : null }

                inches <br/>

                {
                  item.Product.Material == 'None' ? null :
                  <span>Material: {item.Product.Material} <br/></span>
                }
                {
                  item.Product.Weight == 0 ? null :
                  <span>Weight: {item.Product.Weight} Pounds<br/></span>
                }
                {
                  item.Product.Color == '' ? null :
                  <span>Color: {item.Product.Color} <br/></span>
                }

              </strong>
            </div>
          </section>

          <section className="product_price in_block">
            <div className="price_container">
              <em>Current Price:</em>
              <span className="price">${item.OriginalPrice}</span>
              <Button
                width="80px"
                height="24px"
                fontSize="12px"
                className="green"
                handleSubmit={() => deleteWatch(item.Product.Id)}
                value="Delete"
              />
            </div>

            <div className="price_container">
              <em>Price Watch:</em>
              <span className="price">$
                { (item.Product.Id === productId && newPrice) ? newPrice : item.WatchValue }
              </span>
              <Button
                width="88px"
                height="24px"
                fontSize="12px"
                className="yellow"
                handleSubmit={() => addList(item.Product.Id)}
                value="Change"
              />
            </div>

            <div className="price_container">
              <em>Difference:</em>
              <span className="price">
                {item.OriginalPrice - item.WatchValue ? '+' : <span><i className="down fz-18 color_yellow" />-</span>}
                ${Math.abs(item.OriginalPrice - item.WatchValue).toFixed(2)}
              </span>
              <a className="btn yellow" style={{width: "88px", height: "24px", lineHeight: '24px', fontSize: "12px"}} href={item.Product.LinkUrl} target="_blank">
                BUY NOW!
              </a>
            </div>
          </section>

        </div>
      </section>
    ))
  }

  return (
    <article className="my_account">
      <p className="h1 color_green">My Account</p>
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
