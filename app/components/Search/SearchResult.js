import React from 'react'

import { InputNumber } from 'antd'
import Button from '../Common/Button'

const SearchResult = () => {
  const onChange = value => {
    console.log('changed', value)
  }

  return (
    <article className="search_result container">
      <div className="product_list_search">

        <section className="product_info in_block">
          <div className="media_hd fl">
            <img src="http://ww2.sinaimg.cn/large/801b780agw1f8t61u4ig4j20im0rsq3x.jpg" alt="Product"/>
          </div>
          <div className="media_bd fr">
            <h4 className="media_title">Wood and metal industrial vintage chair</h4>
            <p className="media_desc">
              Online project hosting using Git. Includes source-code browser, in-line editing, wikis, and ticketing. Free for public
            </p>
            <strong>
              Dimensions: 24*2418 inches <br/>
              Material: Wood/Metal <br/>
              Weight: xxx <br/>
              Color: brown <br/>
            </strong>
          </div>
        </section>

        <section className="product_price in_block">
          <div className="price_container">
            <em className="fl">Current Price:</em>
            <div className="fr">
              129.99 <br/>
             <Button
               width="88px"
               height="24px"
               fontSize="12px"
               className="yellow"
               handleSubmit={() => onSignup()}
               value="BUY NOW!"
             />
            </div>
          </div>

          <div className="price_container">
            <em className="fl">Price Watch:</em>

            <div className="fr">
              <InputNumber min={0.1} step={0.1} onChange={onChange} />
              <strong>$</strong>
              <br/>
              <Button
                width="88px"
                height="24px"
                fontSize="12px"
                className="green"
                handleSubmit={() => onSignup()}
                value="Add to list"
              />
            </div>
          </div>
        </section>

      </div>
    </article>
  )
}

export default SearchResult
