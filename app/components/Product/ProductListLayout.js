import React from 'react'
import { Link } from 'react-router'
import { Button, Spin } from 'antd'

const ProductListLayout = props => {
  const { title, type, data, addList, loading } = props

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
      <li className="product" key={index}>
        {/* product */}
        <a href="javascript:void(0)">
          <img src={product.ImageUrl} alt="product" />
        </a>
        <a href="javascript:void(0)" className="product_title">{product.Title}</a>

        <hr style={{height: '1px', border: 'none', borderTop: '1px dashed #ccc'}} />
        <hr style={{height: '1px', border: 'none', opacity: 0}} />
        <hr style={{height: '1px', border: 'none', borderTop: '1px solid #ccc'}} />

        <p className="price">${product.Price}</p>

        <div className="submit">
          <a className="btn yellow fl" style={{width: "46%", height: "30px", lineHeight: '30px', fontSize: "14px"}} href={product.LinkUrl} target="_blank">
            BUY NOW!
          </a>

          <Button onClick={() => addList(product.Id, product.Price)} type="primary" loading={loading} style={buttonStyle}>
            Add to list
          </Button>
        </div>
      </li>
    ))
  }
  return (
    <section className="product_list">
      <div className="container">
        <p className="h1">{title}</p>

        { /* Carousel figure */ }
        { /* A line shows five products  */}
        <div className="carousel_container">
          <i className={`carousel_control arrow-left prev-${type}`} />
          <i className={`carousel_control arrow-right next-${type}`} />

          <div className="box">
            <div className={`wrap wrap-${type}`} style={{width: Math.ceil(data.length/5) * 1100 + 'px'}}>
              <ul>
                {renderProductList()}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}


export default ProductListLayout
