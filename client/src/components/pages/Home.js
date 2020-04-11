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

  const notice = (
    <Row>
      <Col>
        <Alert
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          key='1'
          variant='warning'
        >
          <h3>PEMBERITAHUAN</h3>
          <b>
            Bagi WNI yang telah lapor diri sebelum adanya aplikasi ini, harap
            mengaktualisasi datanya dengan{" "}
            <Link style={{ textDecoration: "underline" }} to='/cekregistrasi'>
              Cek Registrasi
            </Link>
          </b>
        </Alert>
      </Col>
    </Row>
  );

  const guestHome = (
    <Fragment>
      {notice}
      <Row>
        <Col style={{ marginBottom: "64px" }}>
          <Accordion defaultActiveKey='0'>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant='link' eventKey='0'>
                  Mengapa Lapor Diri?
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey='0'>
                <Card.Body>
                  <p className='lead'>
                    Hal hal mengenai lapor diri telah di atur dalam
                    undang-undang:
                  </p>
                  <p>
                    <b>
                      UU Nomor 12 Tahun 2006 Tentang Kewarganegaraan Republik
                      Indonesia{" "}
                    </b>
                  </p>
                  <p>
                    <b>
                      UU Nomor 23 Tahun 2006 Tentang Administrasi Kependudukan
                    </b>
                  </p>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant='link' eventKey='1'>
                  Manfaat Lapor Diri
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey='1'>
                <Card.Body>
                  <p className='lead'>
                    Dengan melaporkan diri pengatasan masalah akan menjadi lebih
                    mudah :
                  </p>
                  <ol>
                    <li>
                      Pembuatan Dokumen yang hilang akan menjadi lebih cepat dan
                      mudah pengurusannya
                    </li>
                    <li>
                      Dapat memberikan bantuan secara cepat apabila terjadi
                      musibah
                    </li>
                    <li>
                      Pemberian Informasi yang akurat kepada keluarga di
                      Indonesia
                    </li>
                    <li>
                      Memberi kemudahan dalam mengurus surat-surat yang
                      membutuhkan legalisasi pada perwakilan RI di Jerman
                    </li>
                  </ol>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Col>
        <Col>
          <p className='lead'>Terkadang ada musibah yang menimpa seperti : </p>
          <ul>
            <li>Kecurian</li>
            <li>Kecelakaan</li>
            <li>Bencana Alam</li>
            <li>Sakit parah</li>
            <li>Meninggal dunia</li>
          </ul>
          <p>
            yang dimana dapat menyebabkan keluarga di Indonesia kehilangan
            kontak dan Pihak Universitas menanyakan kehadiran dan dengannya LaDi
            semua permasalahan akan menjadi lebih mudah dan akan mendapatkan
            penyelesaian yang lebih cepat.{" "}
          </p>
          <p>
            <b>Ayo Lapor Diri!</b>
          </p>
        </Col>
      </Row>
    </Fragment>
  );

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
            <Link to='/ubah'>
              <Button style={{ marginRight: "8px" }} variant='success'>
                Ubah / Perbarui Data
              </Button>{" "}
            </Link>
          )}
        </Container>
      </Jumbotron>
      <Container>{loading || !isAuthenticated ? guestHome : null}</Container>
    </Fragment>
  );
};

export default Home;
