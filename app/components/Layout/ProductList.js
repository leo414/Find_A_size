import React from 'react'
import {Link} from 'react-router'
import Button from '../Common/Button.js'

import $ from 'jquery'

class ProductList extends React.Component {
  componentDidMount() {
    /* Carousel figure controler */
    $(() => {
      let i = 5 // This is equal to the number of products show in a row
      let page = 1
      let jqWidth = $('.box').width()
      let page_last = Math.ceil($(`.wrap-${this.props.type} ul li`).length / i)
      const $wrap = $(`.wrap-${this.props.type}`)

      // Towards the right
      $(`.next-${this.props.type}`).click(() => {
        if (page == page_last) {
          $wrap.animate({left: '0px'}, '1000')
          page = 1
        } else {
          $wrap.animate({left: '-=' + jqWidth}, '1000')
          page++
        }
      })

      // Towards the left
      $(`.prev-${this.props.type}`).click(() => {
        if (page == 1) {
          $wrap.animate({left: '-=' + jqWidth * (page_last - 1)}, '1000')
          page = page_last
        } else {
          $wrap.animate({left: '+=' + jqWidth}, '1000')
          page--
        }
      })
    })
  }

  render() {
    return (
      <section className="product_list">
        <div className="container">
          <p className="h1">{this.props.children}</p>

          { /* Carousel figure */ }
          { /* A line shows five products  */}
          <div className="carousel_container">
            <i className={`carousel_control arrow-left prev-${this.props.type}`} />
            <i className={`carousel_control arrow-right next-${this.props.type}`} />

            <div className="box">
              <div className={`wrap wrap-${this.props.type}`}>
                <ul>
                  {
                    [1,2,3,4,5,6,7,8,9,10,11,12,13].map((data, index) => (
                      <li className="product" key={index}>
                        {/* product */}
                        <Link  href="javascript:void(0)">
                          <img src="http://ww2.sinaimg.cn/large/801b780agw1f8rnuq8idej203k02ogle.jpg" alt="hdw" />
                        </Link>

                        <p className="tl">
                          <span className="underline tl">Product</span><br/>
                          Name
                        </p>

                        <hr style={{height: '1px', border: 'none', borderTop: '1px dashed #ccc'}} />
                        <hr style={{height: '1px', border: 'none', opacity: 0}} />
                        <hr style={{height: '1px', border: 'none', borderTop: '1px solid #ccc'}} />

                        <p className="price">$99.99</p>
                        List price: $19.99<br/>
                        Average price $15.15

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
}

export default ProductList
