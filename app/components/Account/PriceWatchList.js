import React from 'react'

import { InputNumber, Rate } from 'antd'
import Button from '../Common/Button'

const PriceWatchList = () => {
  return (
    <article className="my_account">
      <p className="h1">My Account</p>
      <p className="subtitle">My Price Watch List</p>
      <section className="price_watch_list container">
        <div className="product_list_search">

          <section className="product_info in_block">
            <div className="media_hd fl">
              <img src="http://ww2.sinaimg.cn/large/801b780agw1f8t61u4ig4j20im0rsq3x.jpg" alt=""/>
            </div>
            <div className="media_bd fr">
              <h4 className="media_title">Wood and metal industrial vintage chair</h4>
              <p className="media_desc">
                Online project hosting using Git. Includes source-code browser, in-line editing, wikis, and ticketing. Free for public
              </p>
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
              <span className="price">$129.99</span>
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

      <section className="price_watch_list container">
        <div className="product_list_search">

          <section className="product_info in_block">
            <div className="media_hd fl">
              <img src="http://ww2.sinaimg.cn/large/801b780agw1f8t61u4ig4j20im0rsq3x.jpg" alt=""/>
            </div>
            <div className="media_bd fr">
              <h4 className="media_title">Wood and metal industrial vintage chair</h4>
              <p className="media_desc">
                Online project hosting using Git. Includes source-code browser, in-line editing, wikis, and ticketing. Free for public
              </p>
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
              <span className="price">$129.99</span>
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
    </article>
  )
}

export default PriceWatchList
