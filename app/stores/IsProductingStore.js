import Reflux from 'reflux'
import IsProductingAction from '../actions/IsProductingAction'

const IsProductingStore = Reflux.createStore({
  listenables: IsProductingAction,

  init() {
    this.data = {
      searchState: false
    }
  },

	isSearch(state) {
	   this.data.searchState = state
     this.trigger(this.data)
	},
})

export default IsProductingStore
