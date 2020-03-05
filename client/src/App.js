import React from "react";
import "./App.css";
import Navbar from "./components/layouts/MyNavbar";
import Home from "./components/pages/Home";
function App() {
  return (
    <div>
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
