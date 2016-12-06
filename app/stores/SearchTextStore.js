import Reflux from 'reflux'
import SearchTextAction from '../actions/SearchTextAction'

const SearchTextStore = Reflux.createStore({
  listenables: SearchTextAction,

  init() {
    this.data = {
      searchText: '',
    }
  },

	searchText(text) {
	   this.data.searchText = text
     this.trigger(this.data)
	},
})

export default SearchTextStore
