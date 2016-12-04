import React from 'react'

import ProductSearchAction from '../../actions//ProductSearchAction'

import { Select,  Input, Col, Slider } from 'antd'
const Option = Select.Option;
const InputGroup = Input.Group;

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
            Funiture Material:&nbsp;&nbsp;
            <Select size="large" defaultValue="wood" style={{ width: 120 }} onChange={this.materialHandleChange}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="yiminghe">yiminghe</Option>
            </Select>
            <br/>

            Color:&nbsp;&nbsp;
            <Select size="large" defaultValue="lucy" style={{ width: 120 }} onChange={this.colorHandleChange}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="yiminghe">yiminghe</Option>
            </Select>
            <br/>

            Dimensions:&nbsp;&nbsp;
            <Input placeholder="Height" style={{width: 60}} />
            &nbsp; x &nbsp;
            <Input placeholder="Length" style={{width: 60}} />
            &nbsp; x &nbsp;
            <Input placeholder="Width" style={{width: 60}} />
            &nbsp;inches
          </div>

          <div className="fr">
            Price Range:&nbsp;&nbsp;
            <Slider range min={0} max={1000} defaultValue={[0, 1000]} onChange={this.rangeHandleChange} />
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
