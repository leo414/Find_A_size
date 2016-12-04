import React from 'react'
import { hashHistory } from 'react-router'
import ProductListLayout from './ProductListLayout'

import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import GetProductStore from '../../stores/GetProductStore'
import GetProductAction from '../../actions/GetProductAction'
import ProductManageStore from '../../stores/ProductManageStore'
import ProductManageAction from '../../actions/ProductManageAction'

import { Modal, InputNumber } from 'antd'
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
      visible: false,
      productId: '',
      price: '',
    })

    this.addList = this.addList.bind(this)
    this.fetchData = this.fetchData.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.onPriceChange = this.onPriceChange.bind(this)
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
      // GetProductAction.ProductSuggest(pageIndex, 30)
    } else if(this.props.type === 'B') {
      this.setState({ productRelated: initData })
      // GetProductAction.ProductRelated(pageIndex, 30)
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
      // this.success('add list success')
      this.setState({
        productId: '',
        price: '',
      })
    } else if (data.productWatch.success === false) {
      this.setState({
        productId: '',
        price: '',
      })
      this.error('please login')
    }
  }

  addList(productId){
    if(localStorage.isLogin === 'false') {
      console.log(1)
      this.error('please login in')
      return false
    }
    this.setState({
      visible: true,
      productId,
    })
  }

  onPriceChange(price){
    this.setState({price})
  }

  handleOk() {
    if(!this.state.price) {
      this.formError('no price,place repeat')
      return
    }
    this.setState({visible: false})
    if(!this.state.productId) console.error('no productId')
    ProductManageAction.ProductWatch(this.state.productId, this.state.price)
  }

  handleCancel(e) {
    this.setState({
      visible: false,
    })
  }

  success(content) {
    Modal.success({
      title: 'Success',
      content,
      okText: 'OK',
    })
  }

  error(content) {
    Modal.error({
      title: 'Error',
      content,
      okText: 'OK',
      onOk(){
        hashHistory.push('/login')
      }
    })
  }

  formError(content) {
    Modal.error({
      title: 'Error',
      content,
      okText: 'OK',
    })
  }

  render() {
    let data
    if(this.props.type === 'A') {
      data = this.state.productSuggest.Result
    } else if (this.props.type === 'B') {
      data = this.state.productRelated.Result
    }

    return (
      <div>
        <Modal
          title="Price Watch"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="OK"
          cancelText="Cancel"
        >
          $&nbsp;<InputNumber min={1} size="large" onChange={this.onPriceChange} />
        </Modal>

        <ProductListLayout
          title={this.props.children}
          type={this.props.type}
          data={data}
          addList={this.addList}
          fetchData={this.fetchData}
         />
      </div>
    )
  }
}

ReactMixin.onClass(ProductListContainer, Reflux.listenTo(GetProductStore, 'onProductStoreChange'))
ReactMixin.onClass(ProductListContainer, Reflux.listenTo(ProductManageStore, 'onProductManageStoreChange'))
export default ProductListContainer
