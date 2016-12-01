import React from 'react'
import { hashHistory } from 'react-router'
import ProductListLayout from './ProductListLayout'

import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import GetProductStore from '../../stores/GetProductStore'
import GetProductAction from '../../actions/GetProductAction'
import ProductManageStore from '../../stores/ProductManageStore'
import ProductManageAction from '../../actions/ProductManageAction'

import { message, Modal } from 'antd'
const confirm = Modal.confirm

import $ from 'jquery'

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
      productRelated: {
        Count: '',
        PageCount: '',
        PageIndex: '',
        PageSize: '',
        Total: '',
        Result: [],
        flag: '',
      },
      pageIndex: 0,
    })

    this.addList = this.addList.bind(this)
    this.fetchData = this.fetchData.bind(this)
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

    this.fetchData()
  }

  fetchData(type){
    type = type || this.props.type
    const initData = {
      Count: '',
      PageCount: '',
      PageIndex: '',
      PageSize: '',
      Total: '',
      Result: [],
      flag: '',
    }
    let pageIndex = this.state.pageIndex + 1

    if(this.props.type === 'A') {
      this.setState({ productSuggest: initData })
      GetProductAction.ProductSuggest(pageIndex, 30)
    } else if(this.props.type === 'B') {
      this.setState({ productRelated: initData })
      GetProductAction.ProductRelated(pageIndex, 30)
    }
    this.setState({pageIndex})
  }

  onProductStoreChange(data){
    if(data.productSuggest.flag === 'productSuggest' || data.productRelated.flag === 'productRelated') {
      this.setState({
        productSuggest: { ...data.productSuggest },
        productRelated: { ...data.productRelated },
      })
    }
  }

  onProductManageStoreChange(data){
    console.log(data)
    if(data.productWatch.flag !== 'productWatch') return
    if(data.productWatch.success === true) {
      message.success('add list success')
      this.setState({
        loading: {
          state: false,
          id: '',
        }
      })
    } else if (data.productWatch.success === false) {
      this.setState({
        loading: {
          state: false,
          id: '',
        }
      })
      confirm({
        title: 'Want to delete these items?',
        content: 'When clicked the OK button, this dialog will be closed after 1 second',
        okText: 'OK',
        cancelText: 'Cancel',
        onOk() {
          hashHistory.push('/login')
        },
        onCancel() {},
      })
    }
  }

  addList(productId){
    if(!localStorage.isLogin) {
      confirm({
        title: 'Want to delete these items?',
        content: 'When clicked the OK button, this dialog will be closed after 1 second',
        okText: 'OK',
        cancelText: 'Cancel',
        onOk() {
          hashHistory.push('/login')
        },
        onCancel() {},
      })

      return false
    }

    // ProductManageAction.ProductWatch(productId, watchValue)
  }

  render() {
    let data
    if(this.props.type === 'A') {
      data = this.state.productSuggest.Result
    } else if (this.props.type === 'B') {
      data = this.state.productRelated.Result
    }

    return (
      <ProductListLayout
        title={this.props.children}
        type={this.props.type}
        data={data}
        addList={this.addList}
        fetchData={this.fetchData}
       />
    )
  }
}

ReactMixin.onClass(ProductListContainer, Reflux.listenTo(GetProductStore, 'onProductStoreChange'))
ReactMixin.onClass(ProductListContainer, Reflux.listenTo(ProductManageStore, 'onProductManageStoreChange'))
export default ProductListContainer
