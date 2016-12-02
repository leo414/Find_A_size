import Reflux from 'reflux'
import HttpFactory from '../tools/HttpFactory'
import API from '../API'
const { PRODUCT } = API

const ProductSearchAction = Reflux.createActions({
  ProductSearch: {asyncResult: true},
})

ProductSearchAction.ProductSearch.listen(function(Wood, Metal){
  let data = {
    pageIndex: '',
    pageSize: 10,
    Fields: 'Title,ImageUrl,LinkUrl,Price,Id',
  }

  HttpFactory.fetch(PRODUCT.ProductSearch, data, this.completed, this.failed)
})

export default ProductSearchAction
