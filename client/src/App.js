import React, { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layouts/MyNavbar";
import Home from "./components/pages/Home";
import Register from "./components/auth/RegisterForm";
import AuthState from "./context/auth/AuthState";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <AuthState>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path='/register' component={Register} />
            {/* <Home /> */}
          </Switch>
        </Fragment>
      </Router>
    </AuthState>
  );
}

export default App;
