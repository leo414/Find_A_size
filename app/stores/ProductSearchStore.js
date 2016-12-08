import Reflux from 'reflux'
import ProductSearchAction from '../actions/ProductSearchAction'
import IsProductingAction from '../actions/IsProductingAction'
import HttpErrorCallBack from '../tools/HttpErrorCallBack'

const ProductSearchStore = Reflux.createStore({
  listenables: ProductSearchAction,

  init() {
    this.data = {
      productSearch: {
        Count: '',
        PageCount: '',
        PageIndex: '',
        PageSize: '',
        Total: '',
        Result: [],
        flag: '',
      },
      hintMessage: '',
    }
  },

  onProductSearchCompleted(res){
    IsProductingAction.isSearch(false)
    
    if(res.Success){
      const { Count, PageCount, PageIndex, PageSize, Total, Result } = res
      this.data.productSearch = {
        Count,
        PageCount,
        PageIndex,
        PageSize,
        Total,
        Result,
      }
    }else{
      this.data.hintMessage = res.ErrorMsg
    }
    this.data.productSearch.flag = 'productSearch'
    this.trigger(this.data)
  },
  onProductSearchFailed(res){
    HttpErrorCallBack(res)
  },
})

export default ProductSearchStore
