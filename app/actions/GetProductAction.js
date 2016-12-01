import Reflux from 'reflux'
import HttpFactory from '../tools/HttpFactory'
import API from '../API'
const { PRODUCT } = API

const GetProductAction = Reflux.createActions({
  ProductSuggest: {asyncResult: true},
  ProductRelated: {asyncResult: true},
  ProductWatchSearch: {asyncResult: true},
})

GetProductAction.ProductSuggest.listen(function(PageIndex, PageSize){
  let data = {
    Fields: 'Title,ImageUrl,LinkUrl,Price,Id',
    PageIndex,
    PageSize,
  }

  HttpFactory.fetch(PRODUCT.ProductSuggest, data, this.completed, this.failed)
})

GetProductAction.ProductRelated.listen(function(PageIndex, PageSize){
  let data = {
    Fields: 'Title,ImageUrl,LinkUrl,Price,Id',
    PageIndex,
    PageSize,
  }

  HttpFactory.fetch(PRODUCT.ProductRelated, data, this.completed, this.failed)
})

GetProductAction.ProductWatchSearch.listen(function(PageIndex, PageSize){
  let data = {
    Fields: 'Notified,ProductId,OriginalPrice,WatchValue,Product.Id,Product.Title,' +
    'Product.ImageUrl,Product.LinkUrl,Product.Description,Product.Color,Product.Material,' +
    'Product.Length,Product.Weight,Product.Width,Product.Height,',
    PageIndex,
    PageSize,
  }

  HttpFactory.fetch(PRODUCT.ProductWatchSearch, data, this.completed, this.failed)
})

export default GetProductAction
