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

      sendResetSmsCode: {
        sendSmsSuccess: false,
        flag: '',
      },
      phoneResetPassword: {
        resetPasswordSuccess: false,
        flag: '',
      },

      mailResetPassword: {
        sendMilSuccess: false,
        flag: '',
      },
      receiveMailPassword: {
        resetPasswordSuccess: false,
        flag: '',
      },

      mailSignup: {
        sendMailSuccess: false,
        flag: '',
      },

      userTicket: {
        salt: '',
        flag: '',
      },

      userLogin: {
        loginSuccess: false,
        flag: '',
      },

      hintMessage: '',
    }
  },

  onFacebookSignInCompleted(res){
    
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
    
    if(res.Success){
      this.data.mailSignup.sendMailSuccess = true
    }else{
      this.data.mailSignup.sendMailSuccess = 'sendFail'
      this.data.hintMessage = res.ErrorMsg
    }
    this.data.mailSignup.flag = 'sendMail'
    this.trigger(this.data)
  },
  onSendSignUpMailFailed(res){
    HttpErrorCallBack(res)
  },

  onSendSignUpSmsCompleted(res){
    
    if(res.Success){
      this.data.sendSmsCode.sendSmsSuccess = true
    }else{
      this.data.sendSmsCode.sendSmsSuccess = 'sendFail'
      this.data.hintMessage = res.ErrorMsg
    }
    this.data.sendSmsCode.flag = 'sendSms'
    this.trigger(this.data)
  },
  onSendSignUpSmsFailed(res){
    HttpErrorCallBack(res)
  },

  onReceiveSignUpSmsCompleted(res){
    
    if(res.Success){
      this.data.phoneSignup.phoneSignupSuccess = true
    }else{
      this.data.phoneSignup.phoneSignupSuccess = 'signFail'
      this.data.hintMessage = res.ErrorMsg
    }
    this.data.phoneSignup.flag = 'phoneSignup'
    this.data.sendSmsCode.flag = ''
    this.trigger(this.data)
  },
  onReceiveSignUpSmsFailed(res){
    HttpErrorCallBack(res)
  },

  onSendResetPasswordSmsCompleted(res){
    
    if(res.Success){
      this.data.sendResetSmsCode.sendSmsSuccess = true
    }else{
      this.data.sendResetSmsCode.sendSmsSuccess = 'sendFail'
      this.data.hintMessage = res.ErrorMsg
    }
    this.data.sendResetSmsCode.flag = 'sendSms'
    this.trigger(this.data)
  },
  onSendResetPasswordSmsFailed(res){
    HttpErrorCallBack(res)
  },

  onReceiveResetPasswordSmsCompleted(res){
    
    if(res.Success){
      this.data.phoneResetPassword.resetPasswordSuccess = true
    }else{
      this.data.phoneResetPassword.resetPasswordSuccess = 'resetFail'
      this.data.hintMessage = res.ErrorMsg
    }
    this.data.phoneResetPassword.flag = 'resetPassword'
    this.trigger(this.data)
  },
  onReceiveResetPasswordSmsFailed(res){
    HttpErrorCallBack(res)
  },

  onSendResetPasswordMailCompleted(res){
    
    if(res.Success){
      this.data.mailResetPassword.sendMilSuccess = true
    }else{
      this.data.mailResetPassword.sendMilSuccess = 'resetFail'
      this.data.hintMessage = res.ErrorMsg
    }
    this.data.mailResetPassword.flag = 'resetPassword'
    this.trigger(this.data)
  },
  onSendResetPasswordMailFailed(res){
    HttpErrorCallBack(res)
  },
  onReceiveResetPasswordMailCompleted(res){
    
    if(res.Success){
      this.data.receiveMailPassword.resetPasswordSuccess = true
    }else{
      this.data.receiveMailPassword.resetPasswordSuccess = 'resetFail'
      this.data.hintMessage = res.ErrorMsg
    }
    this.data.receiveMailPassword.flag = 'resetPassword'
    this.trigger(this.data)
  },
  onReceiveResetPasswordMailFailed(res){
    HttpErrorCallBack(res)
  },

  onGetTicketCompleted(res){
    
    if(res.Success){
      this.data.userTicket.salt = res.Salt
    }else{
      this.data.hintMessage = res.ErrorMsg
    }
    this.data.userTicket.flag = 'getTicket'
    this.data.userLogin.loginSuccess = false
    this.trigger(this.data)
  },
  onGetTicketFailed(res){
    HttpErrorCallBack(res)
  },

  onUserLoginCompleted(res){
    
    if(res.Success){
      this.data.userLogin.loginSuccess = res.Success
    }else{
      this.data.userLogin.loginSuccess = 'loginFail'
      this.data.hintMessage = res.ErrorMsg
    }
    this.data.userLogin.flag = 'userLogin'
    this.trigger(this.data)
  },
  onUserLoginFailed(res){
    HttpErrorCallBack(res)
  },

})

export default UserStore
