import Reflux from 'reflux'
import SynchronizeAction from '../actions/SynchronizeAction'

const SynchronizeStore = Reflux.createStore({
  listenables: SynchronizeAction,

  init() {
    this.data = {
      productSearch: {
        pageIndex: '',
        flag: 'pageIndex'
      },
    }
  },

  onProductSearchPageIndexCompleted(res){
    console.log(res)
  },
})

export default SynchronizeStore
