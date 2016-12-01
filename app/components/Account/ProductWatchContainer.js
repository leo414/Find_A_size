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

    this.onSelectPage = this.onSelectPage.bind(this)
  }

  componentDidMount() {
    GetProductAction.ProductWatchSearch(1, 10)
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
    return <ProductWatchLayout onSelectPage={this.onSelectPage} total={Total / 10} data={Result} />
  }
}

ReactMixin.onClass(ProductWatchContainer, Reflux.listenTo(GetProductStore, 'onProductStoreChange'))
export default ProductWatchContainer
