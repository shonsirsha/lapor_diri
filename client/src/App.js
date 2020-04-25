import React, { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/layouts/MyNavbar";
import Footer from "./components/layouts/Footer";

import Home from "./components/pages/Home/Home";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Cek from "./components/pages/Cek";
import ResetPassword from "./components/pages/ResetPassword";
import HomeContainer from "./components/layouts/HomeContainer";

import MyAlert from "./components/layouts/MyAlert";
import MyToast from "./components/layouts/MyToast";

import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import CekState from "./context/check-registration/CheckRegistrationState";
import ToastState from "./context/toast/ToastState";

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
        <CekState>
          <ToastState>
            <Router>
              <Fragment>
                <Navbar />
                <MyAlert />
                <MyToast />
                <Switch>
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/' component={Home} />

                  <Route
                    exact
                    path={"/cek-registrasi" | "/login" | "/reset-kata-sandi"}
                    component={HomeContainer}
                  />
                </Switch>
                <Footer />
              </Fragment>
            </Router>
          </ToastState>
        </CekState>
      </AlertState>
    </AuthState>
  );
};

export default App;
