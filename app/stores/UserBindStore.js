import Reflux from 'reflux'
import UserBindAction from '../actions/UserBindAction'
import HttpErrorCallBack from '../tools/HttpErrorCallBack'

const UserBindStore = Reflux.createStore({
  listenables: UserBindAction,

  init() {
    this.data = {
      sendBindMail: {
        success: '',
        flag:'',
      },

      sendBindSms:{
        success: '',
        flag:'',
      },
      receiveSms: {
        success: '',
        flag:'',
      },

      changePassword: {
        Email: '',
        Phone: '',
        IsEmailNotification: '',
        IsPhoneNotification: '',
        success: '',
        flag:'',
      },

      userCurrent: {
        success: '',
        flag: '',
      },

      signOut: {
        success: '',
        flag: '',
      },
      hintMessage: '',
    }
  },

  onSendBindingMailCompleted(res){
    console.log(res)
    if(res.Success){
      this.data.sendBindMail.success = true
    }else{
      this.data.sendBindMail.success = false
      this.data.hintMessage = res.ErrorMsg
    }
    this.data.sendBindMail.flag = 'sendMail'
    this.trigger(this.data)
  },
  onSendBindingMailFailed(res){
    HttpErrorCallBack(res)
  },

  onSendBindingSmsCompleted(res){
    console.log(res)
    if(res.Success){
      this.data.sendBindSms.success = true
    }else{
      this.data.sendBindSms.success = false
      this.data.hintMessage = res.ErrorMsg
    }
    this.data.sendBindSms.flag = 'sendBindSms'
    this.trigger(this.data)
  },
  onSendBindingSmsFailed(res){
    HttpErrorCallBack(res)
  },

  onReceiveBindingSmsCompleted(res){
    console.log(res)
    if(res.Success){
      this.data.receiveSms.success = true
    }else{
      this.data.receiveSms.success = false
      this.data.hintMessage = res.ErrorMsg
    }
    this.data.receiveSms.flag = 'receiveSms'
    this.trigger(this.data)
  },
  onReceiveBindingSmsFailed(res){
    HttpErrorCallBack(res)
  },

  onChangePasswordCompleted(res){
    console.log(res)
    if(res.Success){
      this.data.changePassword.success = true
    }else{
      this.data.changePassword.success = false
      this.data.hintMessage = res.ErrorMsg
    }
    this.data.changePassword.flag = 'changePassword'
    this.trigger(this.data)
  },
  onChangePasswordFailed(res){
    HttpErrorCallBack(res)
  },

  onUserCurrentCompleted(res){
    console.log(res)
    if(res.Success){
      const { Email, Phone, IsPhoneVerified, IsEmailNotification } = res
      this.data.userCurrent = {
        Email,
        Phone,
        IsPhoneVerified,
        IsEmailNotification,
        success: true,
      }
    }else{
      this.data.userCurrent.success = false
      this.data.hintMessage = res.ErrorMsg
    }
    this.data.userCurrent.flag = 'userCurrent'
    this.trigger(this.data)
  },
  onUserCurrentFailed(res){
    HttpErrorCallBack(res)
  },

  onSignOutCompleted(res){
    console.log(res)
    if(res.Success){
      this.data.signOut.success = true
    }else{
      this.data.signOut.success = false
      this.data.hintMessage = res.ErrorMsg
    }
    this.data.signOut.flag = 'signOut'
    this.trigger(this.data)
  },
  onSignOutFailed(res){
    HttpErrorCallBack(res)
  },
})

export default UserBindStore
