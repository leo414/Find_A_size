import Reflux from 'reflux'
import HttpFactory from '../tools/HttpFactory'
import API from '../API'
const { PRODUCT } = API

const ProductSearchAction = Reflux.createActions({
  ProductSearch: {asyncResult: true},
})

ProductSearchAction.ProductSearch.listen(function(search = {}){
  let data = {
    ...search,
    pageSize: 10,
    Fields: 'Title,Description,ImageUrl,LinkUrl,Price,Id,Color,Material,Length,Width,Height,Weight',
  }

  HttpFactory.fetch(PRODUCT.ProductSearch, data, this.completed, this.failed)
})

export default ProductSearchAction
