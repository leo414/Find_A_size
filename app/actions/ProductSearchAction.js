import Reflux from 'reflux'
import HttpFactory from '../tools/HttpFactory'
import API from '../API'
const { PRODUCT } = API

const ProductSearchAction = Reflux.createActions({
  ProductSearch: {asyncResult: true},
})

ProductSearchAction.ProductSearch.listen(function(Wood, Metal){
  let data = {
    pageIndex: 1,
    pageSize: 3,
    key: 'tv',
    Fields: 'Title,Description,ImageUrl,LinkUrl,Price,Id,Color,Material,Length,Width,Height,Weight',
  }

  HttpFactory.fetch(PRODUCT.ProductSearch, data, this.completed, this.failed)
})

export default ProductSearchAction
