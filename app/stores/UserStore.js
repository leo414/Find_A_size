
import Reflux from 'reflux'
import UserAction from '../actions/UserAction'
import HttpErrorCallBack from '../tools/HttpErrorCallBack'

const UserStore = Reflux.createStore({
  listenables: UserAction,

  init() {
    this.data = {
      openUserLogin: {
        facebookLoginSuccess: false,
        googleLoginSuccess: false,
        flag:'',
      },
      sendSmsCode: {
        sendSmsSuccess: false,
        flag: '',
      },
      phoneSignup: {
        phoneSignupSuccess: false,
        flag: '',
      },
      mailSignup: {
        sendMailSuccess: false,
        flag: '',
      },

      hintMessage: '',
    }
  },

  onFacebookSignInCompleted(res){
    console.log(res)
    if(res.Success){
      this.data.openUserLogin.facebookLoginSuccess = true
    }else{
      this.data.hintMessage = res.ErrorMsg
    }
    this.data.openUserLogin.flag = 'openUserLogin'
    this.trigger(this.data)
  },
  onGetInfoFailed(res){
    HttpErrorCallBack(res)
  },

  onGoogleSignInCompleted(res){
    console.log(res)
    if(res.Success){
      this.data.openUserLogin.googleLoginSuccess = true
    }else{
      this.data.hintMessage = res.ErrorMsg
    }
    this.data.openUserLogin.flag = 'openUserLogin'
    this.trigger(this.data)
  },
  onGoogleFailed(res){
    HttpErrorCallBack(res)
  },

  onSendSignUpMailCompleted(res){
    console.log(res)
    if(res.Success){
      this.mailSignup.sendMailSuccess = true
    }else{
      this.data.hintMessage = res.ErrorMsg
    }
    this.data.mailSignup.flag = 'sendMail'
    this.trigger(this.data)
  },
  onSendSignUpMailFailed(res){
    HttpErrorCallBack(res)
  },

  onSendSignUpSmsCompleted(res){
    console.log(res)
    if(res.Success){
      this.data.sendSmsCode.sendSmsSuccess = true
    }else{
      this.data.hintMessage = res.ErrorMsg
    }
    this.data.sendSmsCode.flag = 'sendSms'
    this.trigger(this.data)
  },
  onSendSignUpSmsFailed(res){
    HttpErrorCallBack(res)
  },

  onReceiveSignUpSmsCompleted(res){
    console.log(res)

    if(res.Success){
      this.data.phoneSignup.phoneSignupSuccess = true
    }else{
      this.data.hintMessage = res.ErrorMsg
    }
    this.data.phoneSignup.flag = 'phoneSignup'
    this.trigger(this.data)
  },
  onReceiveSignUpSmsFailed(res){
    HttpErrorCallBack(res)
  },

})

export default UserStore
