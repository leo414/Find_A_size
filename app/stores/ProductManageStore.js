import Reflux from 'reflux'
import ProductManageAction from '../actions/ProductManageAction'
import HttpErrorCallBack from '../tools/HttpErrorCallBack'

const ProductManageStore = Reflux.createStore({
  listenables: ProductManageAction,

  init() {
    this.data = {
      productWatch: {
        success: '',
        flag: '',
      },

      productWatchDel: {
        success: '',
        flag: '',
      },

      hintMessage: '',
    }
  },

  onProductWatchCompleted(res){
    if(res.Success){
      this.data.productWatch.success = true
    }else{
      this.data.productWatch.success = false
      this.data.hintMessage = res.ErrorMsg
    }
    this.data.productWatch.flag = 'productWatch'
    this.trigger(this.data)
  },
  onProductWatchFailed(res){
    HttpErrorCallBack(res)
  },

  onProductWatchDelCompleted(res){
    if(res.Success){
      this.data.productWatchDel.success = true
    }else{
      this.data.productWatchDel.success = false
      this.data.hintMessage = res.ErrorMsg
    }
    this.data.productWatchDel.flag = 'productWatchDel'
    this.trigger(this.data)
  },
  onProductWatchDelFailed(res){
    HttpErrorCallBack(res)
  },

})

export default ProductManageStore
