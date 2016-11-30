import React from 'react'
import { Link } from 'react-router'
import Button from '../Common/Button.js'

const ProductListLayout = props => {
  const { title, type, data } = props
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
                {
                  data.map((product, index) => (
                    <li className="product" key={index}>
                      {/* product */}
                      <a href={product.LinkUrl}>
                        <img src={product.ImageUrl} alt="product" />
                      </a>
                      <a href={product.LinkUrl} className="product_title">{product.Title}</a>

                      <hr style={{height: '1px', border: 'none', borderTop: '1px dashed #ccc'}} />
                      <hr style={{height: '1px', border: 'none', opacity: 0}} />
                      <hr style={{height: '1px', border: 'none', borderTop: '1px solid #ccc'}} />

                      <p className="price">${product.Price}</p>

                      <div className="submit">
                        <Button
                          width="46%"
                          height="30px"
                          fontSize="14px"
                          className="yellow fl"
                          handleSubmit={() => onSignup()}
                          value="BUY NOW!"
                        />

                        <Button
                          width="46%"
                          height="30px"
                          fontSize="14px"
                          className="green fr"
                          handleSubmit={() => onSignup()}
                          value="Add to list"
                        />
                      </div>
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>


        </div>
      </div>
    </section>
  )
}


export default ProductListLayout
