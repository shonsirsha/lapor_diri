import React from "react";
import "./App.css";
import Navbar from "./components/layouts/MyNavbar";
import Home from "./components/pages/Home";

import AuthState from "./context/auth/AuthState";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <AuthState>
      <Navbar />
      <Home />
    </AuthState>
  );
}

export default App;
