import React, { Fragment, useContext, useEffect } from "react";
import {
  Jumbotron,
  Button,
  Row,
  Col,
  Card,
  Container,
  Alert,
  Accordion,
} from "react-bootstrap";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";
import HomeGuest from "../layouts/HomeGuest";
import HomeAuth from "../lapor/Lapor";
import Spinner from "../layouts/Spinner";

import { Link } from "react-router-dom";

const Home = () => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const { clearAllAlerts } = alertContext;

  const { loadUser, user, loading, isAuthenticated } = authContext;
  useEffect(() => {
    clearAllAlerts();
    loadUser();
    //eslint-disable-next-line
    console.log(isAuthenticated);
  }, []);

  return (
    <Fragment>
      <Jumbotron>
        <Container>
          <h1 className='heroh1'>Selamat Datang di Layanan Mandiri</h1>
          <h2 style={{ marginBottom: "32px" }} className='lead'>
            {!isAuthenticated || loading
              ? "Lapor diri secara mandiri dan gratis untuk WNI di wilayah Jerman"
              : "Anda telah terdaftar."}
          </h2>
          {!isAuthenticated || loading ? (
            <Link to='/register'>
              <Button style={{ marginRight: "8px" }} variant='success'>
                Mendaftar
              </Button>{" "}
            </Link>
          ) : (
            ""
          )}
        </Container>
      </Jumbotron>
      <Container>
        {loading ? (
          <Spinner />
        ) : !isAuthenticated ? (
          <HomeGuest />
        ) : (
          <HomeAuth />
        )}
      </Container>
    </Fragment>
  );
};

export default Home;
