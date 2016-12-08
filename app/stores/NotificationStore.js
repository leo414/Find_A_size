import Reflux from 'reflux'
import NotificationAction from '../actions/NotificationAction'
import HttpErrorCallBack from '../tools/HttpErrorCallBack'

const NotificationStore = Reflux.createStore({
  listenables: NotificationAction,

  init() {
    this.data = {
      changeNotification: {
        success: '',
        flag:'',
      },
      hintMessage: '',
    }
  },

  onChangeNotificationCompleted(res){
    
    if(res.Success){
      this.data.changeNotification.success = true
    }else{
      this.data.changeNotification.success = false
      this.data.hintMessage = res.ErrorMsg
    }
    this.data.changeNotification.flag = 'changeNotification'
    this.trigger(this.data)
  },
  onChangeNotificationFailed(res){
    HttpErrorCallBack(res)
  },
})

export default NotificationStore
