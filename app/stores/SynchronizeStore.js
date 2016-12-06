import Reflux from 'reflux'
import SynchronizeAction from '../actions/SynchronizeAction'

const SynchronizeStore = Reflux.createStore({
  listenables: SynchronizeAction,

  init() {
    this.data = {
      productSearchPageIndex: {
        pageIndex: '',
      },
    }
  },

	productSearchPageIndex(pageIndex) {
	   this.data.productSearchPageIndex.pageIndex = pageIndex
     this.trigger(this.data)
	},
})

export default SynchronizeStore
