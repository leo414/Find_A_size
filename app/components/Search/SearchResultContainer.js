import React from 'react'
import SearchResultLayout from './SearchResultLayout'
import { hashHistory } from 'react-router'

import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import ProductSearchStore from '../../stores/ProductSearchStore'
import IsProductingStore from '../../stores/IsProductingStore'

import ProductManageStore from '../../stores/ProductManageStore'
import ProductManageAction from '../../actions/ProductManageAction'

import { Modal, message} from 'antd'

class SearchResultContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = ({
      productSearch: {
        Count: '',
        PageCount: '',
        PageIndex: '',
        PageSize: '',
        Total: 100,
        Result: [],
        flag: '',
      },
      loading: {
        state: false,
        id: '',
      },
      searchEmpty: false,
      isSearch: false,
    })

    this.addList = this.addList.bind(this)
  }

  onIsProductingStoreChange(data){
    this.setState({
      isSearch: data.searchState
    })
  }

  onProductStoreChange(data){

    if(data.productSearch.flag === 'productSearch') {
      if(data.productSearch.Result.length){
        this.setState({
          productSearch: { ...data.productSearch },
          searchEmpty: false,
        })
      } else {
        this.setState({
          productSearch: { ...data.productSearch },
          searchEmpty: true,
        })
      }
    }
  }

  onProductManageStoreChange(data){

    if(data.productWatch.flag !== 'productWatch') return
    if(data.productWatch.success === true) {
      this.success('add list success')
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
      hashHistory.push('/login')
    }
  }

  addList(price, productId){
    if(!price) {
      message.error('Please enter a price')
      return
    }
    if(localStorage.isLogin === 'false') {
      hashHistory.push('/login')
      return
    }
    this.setState({
      loading: {
        state: true,
        id: productId,
      }
    })
    ProductManageAction.ProductWatch(productId, price)
  }

  success(content) {
    Modal.success({
      title: 'Success',
      content,
      okText: 'OK',
    })
  }

  render(){
    return (
      <SearchResultLayout
        data={this.state.productSearch.Result}
        total={this.state.productSearch.Total / 10}
        addList={this.addList}
        loading={this.state.loading}
        isSearchEmpty={this.state.searchEmpty}
        isSearch={this.state.isSearch}
      />
    )
  }
}

ReactMixin.onClass(SearchResultContainer, Reflux.listenTo(ProductManageStore, 'onProductManageStoreChange'))
ReactMixin.onClass(SearchResultContainer, Reflux.listenTo(ProductSearchStore, 'onProductStoreChange'))
ReactMixin.onClass(SearchResultContainer, Reflux.listenTo(IsProductingStore, 'onIsProductingStoreChange'))
export default SearchResultContainer
