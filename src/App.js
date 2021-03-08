import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Login from './views/login';
import OnlineAcademy from './views/onlineAcademy';
import OnlineAcademySignIn from "./views/onlineAcademySignIn";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  function PrivateRoute({ children, ...rest }) {
    const renderChildren = function ({ location }) {
      return localStorage.account_accessToken ? children : (
        <Redirect
          to={{
            pathname: '/home',
            state: { from: location }
          }}
        />
      );
    }
  
    return (
      <Route {...rest} render={renderChildren} />
    );
  }
  
  return (
    <Router>
      <Switch>
        <Route path="/home">
          <OnlineAcademy />
        </Route>
        <Route path="/login">
          <Login />
        </Route>

        {/* <Route path="/login" render={() => <Login />} /> */}

        <PrivateRoute path="/">
          <OnlineAcademySignIn />
        </PrivateRoute>
      </Switch>
    </Router>
    
  );
}

export default App;
