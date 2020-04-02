import React, { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layouts/MyNavbar";
import Home from "./components/pages/Home";
import Register from "./components/auth/RegisterForm";
import AuthState from "./context/auth/AuthState";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./components/routing/PrivateRoute";
import "bootstrap/dist/css/bootstrap.min.css";
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path='/register' component={Register} />
            <Route exact path='/' component={Home} />
            <PrivateRoute exact path='/lapor' component={Home} />
          </Switch>
        </Fragment>
      </Router>
    </AuthState>
  );
};

export default App;
