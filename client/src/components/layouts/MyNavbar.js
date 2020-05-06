import React, { Fragment, useContext } from "react";
import { Navbar, Nav } from "react-bootstrap";
import Logo from "../../imgs/logo.png";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

const MyNavbar = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logoutUser } = authContext;

  const onLogout = () => {
    logoutUser();
  };
  const authLinks = (
    <Fragment>
      {/* <i className='fas fa-sign-out' />{" "} */}
      <Link to="/" className="noStyleLink" onClick={onLogout}>
        Keluar
      </Link>
    </Fragment>
  );

  const guessLinks = (
    <Fragment>
      <Link
        data-cy-register-link
        className="noStyleLink"
        to="/register"
        style={{ marginRight: "8px" }}
      >
        Daftar
      </Link>
      <Link data-cy-login-link className="noStyleLink" to="/login">
        Masuk
      </Link>
    </Fragment>
  );

  return (
    <Fragment>
      <Navbar bg="light" variant="light">
        <Navbar.Brand href="/">
          <img
            alt=""
            src={Logo}
            width="60"
            height="60"
            className="d-inline-block align-top"
          />
          {"   "}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {isAuthenticated ? authLinks : guessLinks}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Fragment>
  );
};

export default MyNavbar;
