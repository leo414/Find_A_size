import React from 'react'

import ProductSearchAction from '../../actions/ProductSearchAction'

import { Select, Input, Col, Slider } from 'antd'
const Option = Select.Option

import './slide.scss'

class SearchFilter extends React.Component {
  // constructor(props) {
  //   super(props)
  //   this.rateHandleChange = this.rateHandleChange.bind(this)
  // }

  componentDidMount(){
    ProductSearchAction.ProductSearch()
  }

  rateHandleChange(value) {
    console.log(`selected ${value}`);
  }

  materialHandleChange(value) {
    console.log(`selected ${value}`);
  }

  colorHandleChange(value) {
    console.log(`selected ${value}`);
  }

  rangeHandleChange(value) {

  }

  formatter(value) {
    return `$${value}`;
  }

  render() {
    return (
      <article>
        <section className="search_input container">
          <div className="title">
            <h1>Looking for a furniture? Never by full priced furnitures!</h1>
            <p>Watch the price drop and save on the best price ever!</p>
          </div>

          <div className="search">
            <input className="in_block" type="text" placeholder="Search" />
            <span className="search_icon in_block"><i className="sousuo" /></span>
          </div>
          <small className="small">Example: industrial coffee table</small>
        </section>

        <section className="search_filter container">
          <div className="fl">
            <h3><em>Refine by:</em></h3>
            Dimensions(inches):<br/>
            <div className="slide_box_dimensions">
              Height
              <Slider tipFormatter={this.formatter} range min={0} max={1000} defaultValue={[150, 800]} onChange={this.rangeHandleChange} />
            </div>

            <div className="slide_box_dimensions">
              Length
              <Slider tipFormatter={this.formatter} range min={0} max={1000} defaultValue={[150, 800]} onChange={this.rangeHandleChange} />
            </div>

            <div className="slide_box_dimensions">
              Width
              <Slider tipFormatter={this.formatter} range min={0} max={1000} defaultValue={[150, 800]} onChange={this.rangeHandleChange} />
            </div>

          </div>

          <div className="fr">
            Funiture Material:&nbsp;&nbsp;
            <Select size="large" defaultValue="wood" style={{ width: 120 }} onChange={this.materialHandleChange}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="yiminghe">yiminghe</Option>
            </Select>
            <br/>

            Color:&nbsp;&nbsp;
            <Input placeholder="example: white" style={{width: 120}} />
            <br/>

            <div className="slide_box">
              Price Range:&nbsp;&nbsp;
              <Slider tipFormatter={this.formatter} range min={0} max={1000} defaultValue={[150, 800]} onChange={this.rangeHandleChange} />
            </div>

          </div>
        </section>

        <section className="search_limit container">
          <h1 className="fl">We found these amazing deals for you!</h1>
          <div className="fr sorted">
            <em>Sorted by: &nbsp;</em>
            <span>Relevence</span>
             &nbsp;| &nbsp;
             Price &nbsp;
             <i className="sort_up" />
          </div>
        </section>
      </article>
    )
  }
}

export default SearchFilter
