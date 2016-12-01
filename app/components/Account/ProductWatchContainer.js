import React from 'react'
import ProductWatchLayout from './ProductWatchLayout'
import { hashHistory } from 'react-router'

import Reflux from 'reflux'
import ReactMixin from 'react-mixin'

import GetProductStore from '../../stores/GetProductStore'
import GetProductAction from '../../actions/GetProductAction'

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
      }
    })
  }

  componentDidMount() {
    GetProductAction.ProductWatchSearch(1, 30)
  }

  onProductStoreChange(data){
    if(data.productWatchSearch.flag === 'productWatchSearch') {
      this.setState({
        productWatchSearch: { ...data.productWatchSearch },
      })
    }
  }

  render() {
    return <ProductWatchLayout data={this.state.productWatchSearch.Result} />
  }
}

ReactMixin.onClass(ProductWatchContainer, Reflux.listenTo(GetProductStore, 'onProductStoreChange'))
export default ProductWatchContainer
