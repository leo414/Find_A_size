import React from 'react'
import { Select,  Input, Col, Slider } from 'antd'

const Option = Select.Option;
const InputGroup = Input.Group;

class SearchFilter extends React.Component {
  // constructor(props) {
  //   super(props)
  //   this.rateHandleChange = this.rateHandleChange.bind(this)
  // }

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
             <div className="triangle in_block">
               <span className="triangle_top"></span>
               <span className="triangle_bottom active"></span>
             </div>
             &nbsp;&nbsp;| &nbsp;
             Rating &nbsp;
             <div className="triangle in_block">
               <span className="triangle_top active"></span>
               <span className="triangle_bottom"></span>
             </div>
          </div>
        </section>
      </article>
    )
  }
}

export default SearchFilter
