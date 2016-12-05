import React from 'react'
import SearchResultLayout from './SearchResultLayout'
import { hashHistory } from 'react-router'

import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import ProductSearchStore from '../../stores/ProductSearchStore'

import ProductManageStore from '../../stores/ProductManageStore'
import ProductManageAction from '../../actions/ProductManageAction'

import { Modal } from 'antd'

class SearchResultContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = ({
      productSearch: {
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

    this.addList = this.addList.bind(this)
  }

  onProductStoreChange(data){
    console.log(data)
    if(data.productSearch.flag === 'productSearch') {
      this.setState({
        productSearch: { ...data.productSearch },
      })
    }
  }

  onProductManageStoreChange(data){
    console.log(data)
    if(data.productWatch.flag !== 'productWatch') return
    if(data.productWatch.success === true) {
      this.success('add list success')
      this.setState({loading: false})
    } else if (data.productWatch.success === false) {
      this.error('please login')
      this.setState({loading: false})
    }
  }

  addList(price, productId){
    console.log(arguments)
    if(!price) return
    if(localStorage.isLogin === 'false') {
      this.error('please login')
      return
    }
    this.setState({loading: true})
    ProductManageAction.ProductWatch(productId, price)
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

  render(){
    return (
      <SearchResultLayout
        data={this.state.productSearch.Result}
        addList={this.addList}
        loading={this.state.loading}
      />
    )
  }
}

ReactMixin.onClass(SearchResultContainer, Reflux.listenTo(ProductManageStore, 'onProductManageStoreChange'))
ReactMixin.onClass(SearchResultContainer, Reflux.listenTo(ProductSearchStore, 'onProductStoreChange'))
export default SearchResultContainer
