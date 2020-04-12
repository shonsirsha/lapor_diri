import React, { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/layouts/MyNavbar";
import Footer from "./components/layouts/Footer";

import Home from "./components/pages/Home";
import Register from "./components/auth/RegisterForm";
import Login from "./components/auth/Login";
import UbahSandi from "./components/pages/UbahSandi";
import MyAlert from "./components/layouts/MyAlert";

import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";

import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./components/routing/PrivateRoute";
import "bootstrap/dist/css/bootstrap.min.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <AlertState>
        <Router>
          <Fragment>
            <Navbar />
            <MyAlert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/' component={Home} />
              <Route exact path='/login' component={Login} />
            </Switch>
            <Footer />
          </Fragment>
        </Router>
      </AlertState>
    </AuthState>
  );
};

export default App;
