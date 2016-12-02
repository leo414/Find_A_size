import Reflux from 'reflux'
import HttpFactory from '../tools/HttpFactory'
import API from '../API'
const { PRODUCT } = API

const ProductManageAction = Reflux.createActions({
  ProductWatch: {asyncResult: true},
  ProductWatchDel: {asyncResult: true},
})

ProductManageAction.ProductWatch.listen(function(ProductId, WatchValue){
  let data = {
    ProductId,
    WatchValue,
  }

  HttpFactory.fetch(PRODUCT.ProductWatch, data, this.completed, this.failed)
})

ProductManageAction.ProductWatchDel.listen(function(ProductId){
  let data = {
    ProductId,
  }

  HttpFactory.fetch(PRODUCT.ProductWatchDel, data, this.completed, this.failed)
})

export default ProductManageAction
