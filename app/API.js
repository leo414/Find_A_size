const FACEBOOK_APPID = '274331262964498'
const GOOGLE_CLIENTID = '786601869556-smbn7sppb9b8msi562292dm4fq0flgdo.apps.googleusercontent.com'

const URL = 'http://dev.api.yiforme.com/?api='

const API = {
  FACEBOOK_APPID,
  GOOGLE_CLIENTID,
  USER: {
    SendResetPasswordSms: URL + 'User.SendResetPasswordSms',
    ReceiveResetPasswordSms: URL + 'User.ReceiveResetPasswordSms',

    SendResetPasswordMail: URL + 'User.SendResetPasswordMail',
    ReceiveResetPasswordMail: URL + 'User.ReceiveResetPasswordMail',

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

    UserCurrent: URL + 'User.Current',
    SignOut: URL + 'User.SignOut',

    ChangeNotification: URL + 'User.ChangeNotification',
  },

  PRODUCT: {
    ProductSuggest: URL + 'Product.Suggest',
    ProductRelated: URL + 'Product.Related',
    ProductWatch: URL + 'ProductWatch.Add',
    ProductWatchDel: URL + 'ProductWatch.Delete',
    ProductWatchSearch: URL + 'ProductWatch.Search',
    ProductSearch: URL + 'Product.Search',
  },
}

export default API
