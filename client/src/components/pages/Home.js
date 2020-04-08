import React, { Fragment, useContext, useEffect } from "react";
import {
  Jumbotron,
  Button,
  Row,
  Col,
  Form,
  Card,
  Container,
  Alert,
} from "react-bootstrap";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";
import { Link } from "react-router-dom";

const Home = () => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const { clearAllAlerts } = alertContext;

  const { loadUser } = authContext;
  useEffect(() => {
    clearAllAlerts();
    loadUser();
    //eslint-disable-next-line
  }, []);
  return (
    <Fragment>
      <Jumbotron>
        <Container>
          <h1 className='heroh1'>Selamat Datang di Layanan Mandiri</h1>
          <h2 style={{ marginBottom: "32px" }} className='lead'>
            Lapor diri secara mandiri dan gratis untuk WNI di wilayah Jerman
          </h2>
          <Link to='/register'>
            <Button style={{ marginRight: "8px" }} variant='success'>
              Mendaftar
            </Button>{" "}
          </Link>

          <a href='#'>
            <Button variant='outline-success'>Pelajari lebih lanjut</Button>
          </a>
        </Container>
      </Jumbotron>
      <Container>
        <Row>
          <Col>
            <Alert style={{display: "flex", flexDirection: "column" ,alignItems: "center"}} key='1' variant='warning' >
            <h3>PEMBERITAHUAN</h3>
            <b>Bagi WNI yang telah lapor diri sebelum adanya aplikasi ini, harap mengaktualisasi datanya dengan <Link style={{textDecoration: "underline"}} to='/cekregistrasi'>Cek Registrasi</Link></b>
            </Alert>
          </Col>
        </Row>
      </Container>
      <div>{/* <RegisterForm /> */}</div>
    </Fragment>
  );
};

export default Home;
