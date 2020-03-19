import React, { Fragment } from "react";
import { Navbar, Nav } from "react-bootstrap";
import Logo from "../imgs/logo.png";

const MyNavbar = () => {
  return (
    <Fragment>
      <Navbar bg='light' variant='light'>
        <Navbar.Brand href='/'>
          <img
            alt=''
            src={Logo}
            width='60'
            height='60'
            className='d-inline-block align-top'
          />
          {"   "}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          {/* <Nav className='ml-auto'>
            {isAuthenticated ? (
              <Nav.Link onClick={onLogout}>Logout</Nav.Link>
            ) : null}
          </Nav> */}
        </Navbar.Collapse>
      </Navbar>
    </Fragment>
  );
};

export default MyNavbar;
