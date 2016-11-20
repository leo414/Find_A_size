const FACEBOOK_APPID = '1165695376849717'
const GOOGLE_CLIENTID = '1079426487628-kr12vvcob66p2p5fm8r1n0kf7qqnbi26.apps.googleusercontent.com'

const URL = 'http://dev.api.yiforme.com/?api='

const API = {
  FACEBOOK_APPID,
  GOOGLE_CLIENTID,
  USER: {
    ReceiveSignUpSms: URL + 'User.ReceiveSignUpSms',
    SendSignUpMail: URL + 'User.SendSignUpMail',
    FacebookSignIn: URL + 'User.FacebookSignIn',
    GoogleSignIn: URL + 'User.GoogleSignIn',
  },
}

export default API
