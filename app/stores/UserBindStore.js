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
})

export default UserBindStore
