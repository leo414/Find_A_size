import { Router } from 'react-router'

import Login from './Login'
import Signup from './Signup'
import FindPassword from './FindPassword'

const EntryRoute = () => (
  <Route path="user">
    <IndexRedirect to="login" />
    <Route path="login"  component={Login}/>
    <Route path="sign_up" component={Signup}/>
    <Route path="find_password" component={FindPassword}/>
  </Route>
)

export default EntryRoute
