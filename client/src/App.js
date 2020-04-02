import React, { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/layouts/MyNavbar";

import Home from "./components/pages/Home";
import Register from "./components/auth/RegisterForm";
import Login from "./components/auth/Login";
import Lapor from "./components/lapor/Lapor";

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
            <Route exact path='/login' component={Login} />

            <PrivateRoute exact path='/lapor' component={Lapor} />
          </Switch>
        </Fragment>
      </Router>
    </AuthState>
  );
};

export default App;
