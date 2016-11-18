import Reflux from 'reflux'
import HttpFactory from '../tools/HttpFactory'
import API from '../API'

const UserAction = Reflux.createActions({
  SendSignUpMail: {asyncResult: true},
})

UserAction.SendSignUpMail.listen(function(Email, Password){
  let data = {
    Email,
    Password,
  }

  HttpFactory.get(API.SendSignUpMail, data, this.completed, this.failed)
})

export default UserAction
