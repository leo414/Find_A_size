import Reflux from 'reflux'
import HttpFactory from '../tools/HttpFactory'
import API from '../API'
const { USER } = API

const UserAction = Reflux.createActions({
  SendSignUpSms: {asyncResult: true},
  ReceiveSignUpSms: {asyncResult: true},
  SendSignUpMail: {asyncResult: true},

  FacebookSignIn: {asyncResult: true},
  GoogleSignIn: {asyncResult: true},
})

UserAction.SendSignUpSms.listen(function(Phone, Code, Password){
  let data = {
    Phone,
    Code,
    Password,
  }

  HttpFactory.fetch(USER.SendSignUpSms, data, this.completed, this.failed)
})

UserAction.ReceiveSignUpSms.listen(function(Prefix, Phone){
  let data = {
    Prefix,
    Phone,
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
  console.log(data)
  console.log(USER.GoogleSignIn)
  HttpFactory.fetch(USER.GoogleSignIn, data, this.completed, this.failed)
})

export default UserAction
