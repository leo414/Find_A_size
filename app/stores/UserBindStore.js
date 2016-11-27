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
})

export default UserBindStore
