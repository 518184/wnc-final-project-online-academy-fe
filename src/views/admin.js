import React, { Component } from 'react';
import { HashRouter, Route, Switch, BrowserRouter } from 'react-router-dom';
import '../components/admin/scss/style.scss';
import onlineAcademy from '../views/onlineAcademy';
import appp from '../App';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('../components/admin/containers/TheLayout'));

// Pages
// const Login = React.lazy(() => import('../components/admin/views/pages/login/Login'));
// const Register = React.lazy(() => import('../components/admin/views/pages/register/Register'));
const Page404 = React.lazy(() => import('../components/admin/views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('../components/admin/views/pages/page500/Page500'));

class AdminAcademy extends Component {

  render() {
    return (
      <BrowserRouter>
          <React.Suspense fallback={loading}>
            <Switch>
              {/* <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
              <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} /> */}
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
              <Route path="/admin" name="Home" render={props => <TheLayout {...props}/>} />
              <Route exact={true} path="/home" component={appp} />
              <Route exact={true} path="/" component={appp} />
            </Switch>
          </React.Suspense>
      </BrowserRouter>
    );
  }
}

export default AdminAcademy;
