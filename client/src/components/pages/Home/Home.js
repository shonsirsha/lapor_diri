import React, { Fragment, useContext, useEffect } from "react";
import { Jumbotron, Button, Container } from "react-bootstrap";

import AlertContext from "../../../context/alert/alertContext";
import AuthContext from "../../../context/auth/authContext";
import HomeGuest from "./HomeGuest";
import HomeAuth from "./HomeAuth";

import { Link } from "react-router-dom";

const Home = () => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const { clearAllAlerts } = alertContext;

  const { loadUser, loading, isAuthenticated } = authContext;
  useEffect(() => {
    clearAllAlerts();
    loadUser();
    //eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <Jumbotron className='hero'>
        <Container>
          <h1 className='heroh1'>Selamat Datang di Layanan Mandiri</h1>
          <h2 style={{ marginBottom: "32px" }} className='lead'>
            Lapor diri secara mandiri dan gratis untuk WNI di wilayah Jerman
          </h2>
          {!isAuthenticated || loading ? (
            <div>
              <Link to='/register'>
                <Button style={{ marginRight: "8px" }} variant='success'>
                  Mendaftar
                </Button>{" "}
              </Link>
              <Link to='/login'>
                <Button variant='success'>Masuk</Button>{" "}
              </Link>
            </div>
          ) : (
            ""
          )}
        </Container>
      </Jumbotron>
      <Container>
        {!loading && !isAuthenticated ? <HomeGuest /> : <HomeAuth />}
      </Container>
    </Fragment>
  );
};

export default Home;
