import React from 'react'
import classnames from 'classnames'
import ProductSearchAction from '../../actions/ProductSearchAction'

import { Select, Input, Col, Slider } from 'antd'
const Option = Select.Option
import './slide.scss'

import Reflux from 'reflux'
import ReactMixin from 'react-mixin'

import SynchronizeStore from '../../stores/SynchronizeStore'

let priceAsc = '',
    salesAsc = ''

class SearchFilter extends React.Component {
  constructor(props) {
    super(props)
    this.state = ({
      pageIndex: 1,
      key: '',
      material: '',
      color: '',
      price: ['', ''],
      length: ['', ''],
      width: ['', ''],
      height: ['', ''],
      searchData: {},
      isSubmit: false,
    })
    this.onMaterialChange = this.onMaterialChange.bind(this)
    this.onPriceChange = this.onPriceChange.bind(this)
    this.onColorChange = this.onColorChange.bind(this)
    this.onHeightChange = this.onHeightChange.bind(this)
    this.onLengthChange = this.onLengthChange.bind(this)
    this.onWidthChange = this.onWidthChange.bind(this)
    this.onSearchChange = this.onSearchChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onSalesAsc = this.onSalesAsc.bind(this)
    this.onPriceAsc = this.onPriceAsc.bind(this)
  }

  onStoreChange(data){
    this.setState({pageIndex: data.productSearchPageIndex.pageIndex})
    this.onSubmit()
  }

  onSalesAsc(){
    salesAsc = !salesAsc
    let searchData = {
      ...this.state.searchData,
      salesAsc,
    }
    this.setState({searchData})
    console.log(searchData)
    ProductSearchAction.ProductSearch(searchData)
  }

  onPriceAsc(){
    priceAsc = !priceAsc
    let searchData = {
      ...this.state.searchData,
      priceAsc,
    }
    this.setState({searchData})
    console.log(searchData)
    ProductSearchAction.ProductSearch(searchData)
  }

  onSearchChange(key){
    key = key.target.value.trim()
    this.setState({key})
  }

  onMaterialChange(material) {
    this.setState({material})
  }

  onPriceChange(price) {
    this.setState({price})
  }

  onColorChange(color){
    color = color.target.value.trim()
    this.setState({color})
  }

  onHeightChange(height){
    this.setState({height})
  }

  onLengthChange(length){
    this.setState({length})
  }

  onWidthChange(width){
    this.setState({width})
  }

  onSubmit(){
    const {
      pageIndex,
      key,
      material,
      color,
      price,
      length,
      height,
      width,
    } = this.state

    let priceStart = price[0],
        priceEnd = price[1],
        lengthStart = length[0],
        lengthEnd = length[1],
        widthStart = width[0],
        widthEnd = width[1],
        heightStart = height[0],
        heightEnd = height [1];

    let searchData = {
      pageIndex,
      key,
      color,
      material,
      lengthStart,
      lengthEnd,
      widthStart,
      widthEnd,
      heightStart,
      heightEnd,
      priceStart,
      priceEnd,
      salesAsc,
      priceAsc,
    }
    this.setState({
      searchData,
      isSubmit: true,
    })
    ProductSearchAction.ProductSearch(searchData)
  }

  formatter(value) {
    return `$${value}`;
  }

  render() {
    const cls = classnames({
      hidden: !this.state.isSubmit
    })

    return (
      <article>
        <section className="search_input container">
          <div className="title">
            <h1>Looking for a furniture? Never by full priced furnitures!</h1>
            <p>Watch the price drop and save on the best price ever!</p>
          </div>

          <div className="search">
            <input className="in_block" type="text" onChange={this.onSearchChange} placeholder="Search" />
            <span onClick={this.onSubmit} className="search_icon in_block"><i className="sousuo" /></span>
          </div>
          <small className="small">Example: industrial coffee table</small>
        </section>

        <section className="search_filter container">
          <div className="fl">
            <h3><em>Refine by:</em></h3>
            Dimensions(inches):<br/>
            <div className="slide_box_dimensions">
              Height
              <Slider range min={0} max={1000} defaultValue={[150, 800]} onChange={this.onHeightChange} />
            </div>

            <div className="slide_box_dimensions">
              Length
              <Slider range min={0} max={1000} defaultValue={[150, 800]} onChange={this.onLengthChange} />
            </div>

            <div className="slide_box_dimensions">
              Width
              <Slider range min={0} max={1000} defaultValue={[150, 800]} onChange={this.onWidthChange} />
            </div>

          </div>

          <div className="fr">
            Funiture Material:&nbsp;&nbsp;
            <Select size="large" defaultValue="Wood" style={{ width: 120 }} onChange={this.onMaterialChange}>
              <Option value="jack">Wood</Option>
              <Option value="lucy">Metal</Option>
              <Option value="Leather">Leather</Option>
              <Option value="Fabric">Fabric</Option>
              <Option value="Vinyl">Vinyl</Option>
              <Option value="Polyurethane">Polyurethane</Option>
              <Option value="Plastic">Plastic</Option>
              <Option value="Glass">Glass</Option>
              <Option value="Bamboo">Bamboo</Option>
              <Option value="Suede">Suede</Option>
            </Select>
            <br/>

            Color:&nbsp;&nbsp;
            <Input placeholder="example: white" onChange={this.onColorChange} style={{width: 120}} />
            <br/>

            <div className="slide_box">
              Price Range:&nbsp;&nbsp;
              <Slider tipFormatter={this.formatter} range min={0} max={5000} defaultValue={[150, 800]} onChange={this.onPriceChange} />
            </div>

          </div>
        </section>

        <section className={`search_limit container ${cls}`}>
          <h1 className="fl">We found these amazing deals for you!</h1>
          <div className="fr sorted">
            <em>Sorted by: &nbsp;</em>
            <span>Relevence</span>
             &nbsp;| &nbsp;
             Price &nbsp;
             <i onClick={this.onPriceAsc} style={{cursor: 'pointer'}} className="sort_up" />

             &nbsp;| &nbsp;
             Sales &nbsp;
             <i onClick={this.onSalesAsc} style={{cursor: 'pointer'}} className="sort_up" />
          </div>
        </section>
      </article>
    )
  }
}

ReactMixin.onClass(SearchFilter, Reflux.listenTo(SynchronizeStore, 'onStoreChange'))
export default SearchFilter
