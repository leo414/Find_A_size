import Reflux from 'reflux'
import HttpFactory from '../tools/HttpFactory'
import API from '../API'
const { USER } = API

const NotificationAction = Reflux.createActions({
  ChangeNotification: {asyncResult: true},
})

NotificationAction.ChangeNotification.listen(function(IsEmailNotification, IsPhoneNotification){
  let data = {
    IsEmailNotification,
    IsPhoneNotification,
  }

  HttpFactory.fetch(USER.ChangeNotification, data, this.completed, this.failed)
})

export default NotificationAction
