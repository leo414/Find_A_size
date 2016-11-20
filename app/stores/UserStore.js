
import Reflux from 'reflux'
import UserAction from '../actions/UserAction'
import HttpErrorCallBack from '../tools/HttpErrorCallBack'

const UserStore = Reflux.createStore({
  listenables: UserAction,

  init() {
    this.data =  {
      info: {
        cityName: '',
        marks: '',
        nickName: '',
        signature: '',
        totalAlbums: '',
        views: '',
        avatar: '',
        tags: [],
      },
      markState: undefined,
      hintMessage: '',
      flag: '',
    }
  },

  onFacebookSignInCompleted(res){
    console.log(res)
    if(res.Success){

    }else{
      this.data.hintMessage = res.ErrorMsg
    }
    this.data.flag = 'FacebookSignIn'
    this.trigger(this.data)
  },

  onGetInfoFailed(res){
    HttpErrorCallBack(res)
  },

  onGoogleSignInCompleted(res){
    console.log(res)
    if(res.Success){

    }else{
      this.data.hintMessage = res.ErrorMsg
    }
    this.data.flag = 'FacebookSignIn'
    this.trigger(this.data)
  },

  onGoogleFailed(res){
    HttpErrorCallBack(res)
  },
})

export default UserStore
