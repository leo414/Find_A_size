import Reflux from 'reflux'
import HttpFactory from '../tools/HttpFactory'
import API from '../API'
const { USER } = API

const UserAction = Reflux.createActions({
  SendSignUpMail: {asyncResult: true},
  FacebookSignIn: {asyncResult: true},
  GoogleSignIn: {asyncResult: true},
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
