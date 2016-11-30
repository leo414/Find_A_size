import Reflux from 'reflux'
import GetProductAction from '../actions/GetProductAction'
import HttpErrorCallBack from '../tools/HttpErrorCallBack'

const GetProductStore = Reflux.createStore({
  listenables: GetProductAction,

  init() {
    this.data = {
      productSuggest: {
        Count: '',
        PageCount: '',
        PageIndex: '',
        PageSize: '',
        Total: '',
        Result: [],
        flag: '',
      },

      ProductRelated: {
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

  onProductSuggestCompleted(res){
    if(res.Success){
      const { Count, PageCount, PageIndex, PageSize, Total, Result } = res
      this.data.productSuggest = {
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
    this.data.productSuggest.flag = 'productSuggest'
    this.trigger(this.data)
  },
  onProductSuggestFailed(res){
    HttpErrorCallBack(res)
  },

  onProductRelatedCompleted(res){
    if(res.Success){
      const { Count, PageCount, PageIndex, PageSize, Total, Result } = res
      this.data.ProductRelated = {
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
    this.data.ProductRelated.flag = 'productRelated'
    this.trigger(this.data)
  },
  onProductRelatedFailed(res){
    HttpErrorCallBack(res)
  },

})

export default GetProductStore
