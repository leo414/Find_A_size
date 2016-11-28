import Reflux from 'reflux'
import HttpFactory from '../tools/HttpFactory'
import API from '../API'
const { USER } = API

const UserBindAction = Reflux.createActions({
  UserCurrent: {asyncResult: true},
  SignOut: {asyncResult: true},

  SendBindingMail: {asyncResult: true},
  SendBindingSms: {asyncResult: true},
  ReceiveBindingSms: {asyncResult: true},

  ChangePassword: {asyncResult: true},
})

UserBindAction.UserCurrent.listen(function(){
  let data = {}

  HttpFactory.fetch(USER.UserCurrent, data, this.completed, this.failed)
})

UserBindAction.SignOut.listen(function(){
  let data = {}

  HttpFactory.fetch(USER.SignOut, data, this.completed, this.failed)
})

UserBindAction.SendBindingMail.listen(function(Email){
  let data = {
    Email,
  }

  HttpFactory.fetch(USER.SendBindingMail, data, this.completed, this.failed)
})

UserBindAction.SendBindingSms.listen(function(Phone){
  let data = {
    Prefix: 86,
    Phone,
  }

  HttpFactory.fetch(USER.SendBindingSms, data, this.completed, this.failed)
})

UserBindAction.ReceiveBindingSms.listen(function(Phone, Code){
  let data = {
    Phone,
    Code,
  }

  HttpFactory.fetch(USER.ReceiveBindingSms, data, this.completed, this.failed)
})

UserBindAction.ChangePassword.listen(function(RawPassword, NewPassword){
  let data = {
    RawPassword,
    NewPassword,
  }

  HttpFactory.fetch(USER.ChangePassword, data, this.completed, this.failed)
})

export default UserBindAction
