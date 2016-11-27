import Reflux from 'reflux'
import HttpFactory from '../tools/HttpFactory'
import API from '../API'
const { USER } = API

const UserBindAction = Reflux.createActions({
  SendBindingMail: {asyncResult: true},
})

UserAction.SendBindingMail.listen(function(Email){
  let data = {
    Email,
  }

  HttpFactory.fetch(USER.SendBindingMail, data, this.completed, this.failed)
})

export default UserBindAction
