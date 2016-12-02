import React from 'react'
import ProductWatchLayout from './ProductWatchLayout'
import { hashHistory } from 'react-router'

import Reflux from 'reflux'
import ReactMixin from 'react-mixin'

import GetProductStore from '../../stores/GetProductStore'
import GetProductAction from '../../actions/GetProductAction'
import ProductManageStore from '../../stores/ProductManageStore'
import ProductManageAction from '../../actions/ProductManageAction'

import { Modal, InputNumber } from 'antd'
const confirm = Modal.confirm

class ProductWatchContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = ({
      productWatchSearch: {
        Count: '',
        PageCount: '',
        PageIndex: '',
        PageSize: '',
        Total: '',
        Result: [],
        flag: '',
      },
      visible: false,
      productId: '',
      price: '',
    })

    this.onSelectPage = this.onSelectPage.bind(this)
    this.addList = this.addList.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.onPriceChange = this.onPriceChange.bind(this)
  }

  componentDidMount() {
    GetProductAction.ProductWatchSearch(1, 10)
  }

  onProductManageStoreChange(data){
    console.log(data)
    if(data.productWatch.flag !== 'productWatch') return
    if(data.productWatch.success === true) {
      // this.success('add list success')
      // this.setState({
      //   productId: '',
      //   price: '',
      // })
    } else if (data.productWatch.success === false) {
      // this.setState({
      //   productId: '',
      //   price: '',
      // })
    }
  }

  addList(productId){
    console.log(this)
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

  formError(content) {
    Modal.error({
      title: 'Error',
      content,
      okText: 'OK',
    })
  }


  onProductStoreChange(data){
    console.log(data)
    if(data.productWatchSearch.flag === 'productWatchSearch') {
      this.setState({
        productWatchSearch: { ...data.productWatchSearch },
      })
    }
  }

  onSelectPage(page){
    GetProductAction.ProductWatchSearch(page, 10)
  }

  render() {
    const { Total, Result } = this.state.productWatchSearch
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
          $&nbsp;<InputNumber defaultValue={0} size="large" onChange={this.onPriceChange} />
        </Modal>
        <ProductWatchLayout
          onSelectPage={this.onSelectPage}
          total={Total / 10}
          data={Result}
          addList={this.addList}
          newPrice={this.state.price}
          productId={this.state.productId}
        />
      </div>
    )
  }
}

ReactMixin.onClass(ProductWatchContainer, Reflux.listenTo(GetProductStore, 'onProductStoreChange'))
ReactMixin.onClass(ProductWatchContainer, Reflux.listenTo(ProductManageStore, 'onProductManageStoreChange'))
export default ProductWatchContainer
