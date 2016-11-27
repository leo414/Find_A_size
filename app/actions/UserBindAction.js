import Reflux from 'reflux'
import HttpFactory from '../tools/HttpFactory'
import API from '../API'
const { USER } = API

const UserBindAction = Reflux.createActions({
  SendBindingMail: {asyncResult: true},
  SendBindingSms: {asyncResult: true},
  ReceiveBindingSms: {asyncResult: true},

  ChangePassword: {asyncResult: true},
})

UserAction.SendBindingMail.listen(function(Email){
  let data = {
    Email,
  }

  HttpFactory.fetch(USER.SendBindingMail, data, this.completed, this.failed)
})

UserAction.SendBindingSms.listen(function(Phone){
  let data = {
    Prefix: 86,
    Phone,
  }

  HttpFactory.fetch(USER.SendBindingSms, data, this.completed, this.failed)
})

UserAction.ReceiveBindingSms.listen(function(Phone, Code){
  let data = {
    Phone,
    Code,
  }

  HttpFactory.fetch(USER.ReceiveBindingSms, data, this.completed, this.failed)
})

UserAction.ChangePassword.listen(function(RawPassword, NewPassword){
  let data = {
    RawPassword,
    NewPassword,
  }

  HttpFactory.fetch(USER.ChangePassword, data, this.completed, this.failed)
})

export default UserBindAction
