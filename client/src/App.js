import React, { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/layouts/MyNavbar";
import Footer from "./components/layouts/Footer";

import Home from "./components/pages/Home/Home";
import Register from "./components/pages/Register";
import HomeContainer from "./components/layouts/HomeContainer";

import MyAlert from "./components/layouts/MyAlert";
import MyToast from "./components/layouts/MyToast";

import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import CheckRegistrationState from "./context/check-registration/CheckRegistrationState";
import ToastState from "./context/toast/ToastState";
import ResetPasswordState from "./context/reset-password/ResetPasswordState";

import Impressum from "./components/pages/Impressum";
import Datenschutz from "./components/pages/Datenschutz";

import setAuthToken from "./utils/setAuthToken";
import "bootstrap/dist/css/bootstrap.min.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <AlertState>
        <CheckRegistrationState>
          <ResetPasswordState>
            <ToastState>
              <Router>
                <Fragment>
                  <Navbar />
                  <MyAlert />
                  <MyToast />
                  <Switch>
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/" component={Home} />
                    {["/login", "/cek-registrasi", "/reset-kata-sandi"].map(
                      (path, index) => (
                        <Route
                          exact
                          path={path}
                          key={index}
                          component={HomeContainer}
                        />
                      )
                    )}
                    <Route exact path="/impressum" component={Impressum} />
                    <Route exact path="/datenschutz" component={Datenschutz} />

                    <Route component={Home} />
                  </Switch>
                  <Footer />
                </Fragment>
              </Router>
            </ToastState>
          </ResetPasswordState>
        </CheckRegistrationState>
      </AlertState>
    </AuthState>
  );
};

export default App;
