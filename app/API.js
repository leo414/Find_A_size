const FACEBOOK_APPID = '1165695376849717'
const GOOGLE_CLIENTID = '1079426487628-kr12vvcob66p2p5fm8r1n0kf7qqnbi26.apps.googleusercontent.com'

const URL = 'http://dev.api.yiforme.com/?api='

const API = {
  FACEBOOK_APPID,
  GOOGLE_CLIENTID,
  USER: {
    SendResetPasswordSms: URL + 'User.SendResetPasswordSms',
    ReceiveResetPasswordSms: URL + 'User.ReceiveResetPasswordSms',

    SendResetPasswordMail: URL + 'User.SendResetPasswordMail',
    ReceiveResetPasswordMail: URL + 'ReceiveResetPasswordMail',

    SendSignUpSms: URL + 'User.SendSignUpSms',
    ReceiveSignUpSms: URL + 'User.ReceiveSignUpSms',

    SendSignUpMail: URL + 'User.SendSignUpMail',

    FacebookSignIn: URL + 'User.FacebookSignIn',
    GoogleSignIn: URL + 'User.GoogleSignIn',

    GetTicket: URL + 'User.GetTicket',
    UserLogin: URL + 'User.SignIn',

    SendBindingMail: URL + 'User.SendBindingMail',
    SendBindingSms: URL + 'User.SendBindingSms',
    ReceiveBindingSms: URL + 'User.ReceiveBindingSms',

    ChangePassword: URL + 'User.ChangePassword',
  },
}

export default API
