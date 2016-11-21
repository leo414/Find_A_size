
import Reflux from 'reflux'
import UserAction from '../actions/UserAction'
import HttpErrorCallBack from '../tools/HttpErrorCallBack'

const UserStore = Reflux.createStore({
  listenables: UserAction,

  init() {
    this.data =  {
      openUserLogin: {
        facebookLoginSuccess: false,
        googleLoginSuccess: false,
        hintMessage: '',
        flag:'',
      },
    }
  },

  onFacebookSignInCompleted(res){
    console.log(res)
    if(res.Success){
      this.openUserLogin.facebookLoginSuccess = true
    }else{
      this.data.hintMessage = res.ErrorMsg
    }
    this.data.flag = 'openUserLogin'
    this.trigger(this.data)
  },
  onGetInfoFailed(res){
    HttpErrorCallBack(res)
  },

  onGoogleSignInCompleted(res){
    console.log(res)
    if(res.Success){
      this.openUserLogin.googleLoginSuccess = true
    }else{
      this.data.hintMessage = res.ErrorMsg
    }
    this.data.flag = 'openUserLogin'
    this.trigger(this.data)
  },
  onGoogleFailed(res){
    HttpErrorCallBack(res)
  },

  onSendSignUpMailCompleted(res){

  },
  onSendSignUpMailFailed(res){
    HttpErrorCallBack(res)
  },

})

export default UserStore
