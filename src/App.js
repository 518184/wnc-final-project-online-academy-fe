import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Login from './views/login';
import OnlineAcademy from './views/onlineAcademy';

function App() {
  function PrivateRoute({ children, ...rest }) {
    const renderChildren = function ({ location }) {
      return localStorage.todoApp_accessToken ? children : (
        <Redirect
          to={{
            pathname: '/login',
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
        <Route path="/login">
          <Login />
        </Route>

        {/* <Route path="/login" render={() => <Login />} /> */}

        <PrivateRoute path="/">
          <OnlineAcademy />
        </PrivateRoute>
      </Switch>
    </Router>
    
  );
}

export default App;
