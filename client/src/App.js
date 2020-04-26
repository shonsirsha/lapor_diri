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
import CekState from "./context/check-registration/CheckRegistrationState";
import ToastState from "./context/toast/ToastState";

import setAuthToken from "./utils/setAuthToken";
import "bootstrap/dist/css/bootstrap.min.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <AlertState key={"ASDAS"}>
        <CekState>
          <ToastState>
            <Router>
              <Fragment>
                <Navbar />
                <MyAlert key={1} />
                <MyToast />
                <Switch>
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/' component={Home} />
                  <Fragment>
                    {["/login", "/cek-registrasi", "/reset-kata-sandi"].map(
                      (path) => (
                        <Route
                          exact
                          path={path}
                          key={path}
                          component={HomeContainer}
                        />
                      )
                    )}
                  </Fragment>

                  {/* <Route
                    exact
                    path={"/cek-registrasi" | "/login" | "/reset-kata-sandi"}
                    component={HomeContainer}
                  /> */}
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
