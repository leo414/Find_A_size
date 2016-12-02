import React from 'react'
import SearchResultLayout from './SearchResultLayout'

import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import ProductSearchStore from '../../stores/ProductSearchStore'

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
    })
  }

  onProductStoreChange(data){
    if(data.productSearch.flag === 'productSearch') {
      this.setState({
        productSearch: { ...data.productSearch },
      })
    }
  }

  render(){
    return (
      <SearchResultLayout

      />
    )
  }
}

ReactMixin.onClass(SearchResultContainer, Reflux.listenTo(ProductSearchStore, 'onProductStoreChange'))
export default SearchResultContainer
