import React from 'react'
import ProductListLayout from './ProductListLayout'

import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import GetProductStore from '../../stores/GetProductStore'
import GetProductAction from '../../actions/GetProductAction'
import ProductManageStore from '../../stores/ProductManageStore'
import ProductManageAction from '../../actions/ProductManageAction'

import { message } from 'antd'

import $ from 'jquery'

let self;
class ProductListContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = ({
      productSuggest: {
        Count: '',
        PageCount: '',
        PageIndex: '',
        PageSize: '',
        Total: '',
        Result: [],
        flag: '',
      },
      ProductRelated: {
        Count: '',
        PageCount: '',
        PageIndex: '',
        PageSize: '',
        Total: '',
        Result: [],
        flag: '',
      },
      loading: false,
    })
  }
  componentDidMount() {
    /* Carousel figure controler */
    $(() => {
      let i = 5 // This is equal to the number of products show in a row
      let page = 1
      let jqWidth = $('.box').width()

      // before ajaxa pageSize === 0
      // let pageSize = Math.ceil($(`.wrap-${this.props.type} ul li`).length / i)
      let pageSize = 6

      const $wrap = $(`.wrap-${this.props.type}`)

      // Towards the right
      $(`.next-${this.props.type}`).click(() => {
        if (page == pageSize) {
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
          $wrap.animate({left: '-=' + jqWidth * (pageSize - 1)}, '1000')
          page = pageSize
        } else {
          $wrap.animate({left: '+=' + jqWidth}, '1000')
          page--
        }
      })
    })

    if(this.props.type === 'A') {
      GetProductAction.ProductSuggest(1, 30)
    } else if(this.props.type === 'B') {
      GetProductAction.ProductRelated(1, 30)
    }
  }

  onProductStoreChange(data){
    if(data.productSuggest.flag === 'productSuggest' || data.ProductRelated.flag === 'productRelated') {
      this.setState({
        productSuggest: { ...data.productSuggest },
        ProductRelated: { ...data.ProductRelated },
      })
    }
  }

  onProductManageStoreChange(data){
    if(data.productWatch.flag !== 'productWatch') return
    if(data.productWatch.success === true) {
      message.success('add list success')
      this.setState({loading: false})
    } else if (data.productWatch.success === false) {
      message.error('add list false, please try again')
      this.setState({loading: false})
    }
  }

  addList(productId, watchValue){
    self.setState({
      loading: true,
    })
    ProductManageAction.ProductWatch(productId, watchValue)
  }

  render() {
    self = this
    let data
    if(this.props.type === 'A') {
      data = this.state.productSuggest.Result
    } else if (this.props.type === 'B') {
      data = this.state.ProductRelated.Result
    }

    return (
      <ProductListLayout
        title={this.props.children}
        type={this.props.type}
        data={data}
        addList={this.addList}
        loading={this.state.loading}
       />
    )
  }
}

ReactMixin.onClass(ProductListContainer, Reflux.listenTo(GetProductStore, 'onProductStoreChange'))
ReactMixin.onClass(ProductListContainer, Reflux.listenTo(ProductManageStore, 'onProductManageStoreChange'))
export default ProductListContainer
