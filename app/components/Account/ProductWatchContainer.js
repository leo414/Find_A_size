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
      deleteProductId: '',
      isDataEmpty: false,
    })

    this.onSelectPage = this.onSelectPage.bind(this)
    this.addList = this.addList.bind(this)
    this.deleteWatch = this.deleteWatch.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.onPriceChange = this.onPriceChange.bind(this)
  }

  componentDidMount() {
    GetProductAction.ProductWatchSearch(1, 10)
  }

  onProductManageStoreChange(data){

    if(data.productWatch.flag === 'productWatch'){
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

    if(data.productWatchDel.flag === 'productWatchDel'){
      if(data.productWatchDel.success === true) {
        let Result = this.state.productWatchSearch.Result.filter(item => item.Product.Id !== this.state.deleteProductId)
        if(Result.length){
          let productWatchSearch = this.state.productWatchSearch
          this.setState({
            productWatchSearch: {...productWatchSearch, Result}
          })
        } else {
          this.setState({
            isDataEmpty: true
          })
        }

      }
    }
  }

  addList(productId){
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
      this.formError('Please enter a price')
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

  deleteWatch(productId){
    const self = this
    confirm({
      title: 'Want to delete these items?',
      content: 'When clicked the OK button, this dialog will be closed after 1 second',
      okText: 'OK',
      cancelText: 'Cancel',
      onOk() {
        self.setState({
          deleteProductId: productId,
        })
        ProductManageAction.ProductWatchDel(productId)
      },
      onCancel() {},
    })
  }


  onProductStoreChange(data){

    if(data.productWatchSearch.flag === 'productWatchSearch') {
      if(data.productWatchSearch.Result.length){
        this.setState({
          productWatchSearch: { ...data.productWatchSearch },
        })
      } else {
        this.setState({
          isDataEmpty: true
        })
      }

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
          $&nbsp;<InputNumber min={1} size="large" onChange={this.onPriceChange} />
        </Modal>
        <ProductWatchLayout
          onSelectPage={this.onSelectPage}
          total={Total / 10}
          data={Result}
          addList={this.addList}
          newPrice={this.state.price}
          productId={this.state.productId}
          deleteWatch={this.deleteWatch}
          isDataEmpty={this.state.isDataEmpty}
        />
      </div>
    )
  }
}

ReactMixin.onClass(ProductWatchContainer, Reflux.listenTo(GetProductStore, 'onProductStoreChange'))
ReactMixin.onClass(ProductWatchContainer, Reflux.listenTo(ProductManageStore, 'onProductManageStoreChange'))
export default ProductWatchContainer
