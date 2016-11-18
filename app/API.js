const FACEBOOK_APPID = '1165695376849717'
const GOOGLE_CLIENTID = '1079426487628-kr12vvcob66p2p5fm8r1n0kf7qqnbi26.apps.googleusercontent.com'

const URL = 'http://dev.amazon.aiyaopai.com?api='

const API = {
  FACEBOOK_APPID,
  GOOGLE_CLIENTID,
  ReceiveSignUpSms: URL + 'User.ReceiveSignUpSms',
  SendSignUpMail: URL + 'User.SendSignUpMail', 
}

export default API
