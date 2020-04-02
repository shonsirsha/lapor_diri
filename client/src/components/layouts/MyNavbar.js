import React, { Fragment, useContext } from "react";
import { Navbar, Nav } from "react-bootstrap";
import Logo from "../imgs/logo.png";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

const MyNavbar = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading, user } = authContext;

  const onLogout = () => {};
  const authLinks = (
    <Fragment>
      <Navbar.Text>
        Halo, <a href='#login'>{user ? user.nama_depan : null}! | </a>
      </Navbar.Text>

      {/* <i className='fas fa-sign-out' />{" "} */}
      <Nav.Link onClick={onLogout}>Keluar</Nav.Link>
    </Fragment>
  );

  const guessLinks = (
    <Fragment>
      <Nav.Link>
        <Link className='noStyleLink' to='/register'>
          Daftar
        </Link>
      </Nav.Link>
      <Nav.Link>
        <Link className='noStyleLink' to='/login'>
          Masuk
        </Link>
      </Nav.Link>
    </Fragment>
  );

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
          <Nav className='ml-auto'>
            {isAuthenticated ? authLinks : guessLinks}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Fragment>
  );
};

export default MyNavbar;
