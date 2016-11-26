import Reflux from 'reflux'
import HttpFactory from '../tools/HttpFactory'
import API from '../API'
const { USER } = API

const UserAction = Reflux.createActions({
  SendResetPasswordSms: {asyncResult: true},
  ReceiveResetPasswordSms: {asyncResult: true},

  SendSignUpSms: {asyncResult: true},
  ReceiveSignUpSms: {asyncResult: true},

  SendSignUpMail: {asyncResult: true},

  FacebookSignIn: {asyncResult: true},
  GoogleSignIn: {asyncResult: true},

  GetTicket: {asyncResult: true},
  UserLogin: {asyncResult: true},
})

UserAction.SendResetPasswordSms.listen(function(Prefix, Phone){
  let data = {
    Prefix,
    Phone,
  }

  HttpFactory.fetch(USER.SendResetPasswordSms, data, this.completed, this.failed)
})

UserAction.ReceiveResetPasswordSms.listen(function(Phone, Code, Password){
  let data = {
    Phone,
    Code,
    Password,
  }

  HttpFactory.fetch(USER.ReceiveResetPasswordSms, data, this.completed, this.failed)
})

UserAction.SendSignUpSms.listen(function(Prefix, Phone){
  let data = {
    Prefix,
    Phone,
  }

  HttpFactory.fetch(USER.SendSignUpSms, data, this.completed, this.failed)
})

UserAction.ReceiveSignUpSms.listen(function(Phone, Code, Password){
  let data = {
    Phone,
    Code,
    Password,
  }

  HttpFactory.fetch(USER.ReceiveSignUpSms, data, this.completed, this.failed)
})

UserAction.SendSignUpMail.listen(function(Email, Password){
  let data = {
    Email,
    Password,
  }

  HttpFactory.fetch(USER.SendSignUpMail, data, this.completed, this.failed)
})

UserAction.FacebookSignIn.listen(function(AccessToken){
  let data = {
    AccessToken
  }

  HttpFactory.fetch(USER.FacebookSignIn, data, this.completed, this.failed)
})

UserAction.GoogleSignIn.listen(function(AccessToken){
  let data = {
    AccessToken
  }
  HttpFactory.fetch(USER.GoogleSignIn, data, this.completed, this.failed)
})

UserAction.GetTicket.listen(function(UserName){
  let data = {
    UserName
  }
  HttpFactory.fetch(USER.GetTicket, data, this.completed, this.failed)
})

UserAction.UserLogin.listen(function(UserName, Password, Timestamp){
  let data = {
    UserName,
    Password,
    Timestamp,
  }
  HttpFactory.fetch(USER.UserLogin, data, this.completed, this.failed)
})

export default UserAction
