import React, { Fragment, useContext, useEffect, useState } from "react";
import {
  Jumbotron,
  Button,
  Row,
  Col,
  Card,
  Container,
  Alert,
  Accordion,
  Form,
} from "react-bootstrap";
import FormInput from "../auth/RegisterForm/FormInput";
import FormLabel from "../auth/RegisterForm/FormLabel";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";
import { Link } from "react-router-dom";

const Ubah = (props) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const {
    error,
    registerUser,
    loadUser,
    isAuthenticated,
    loading,
  } = authContext;
  const { setAlert, clearAllAlerts } = alertContext;

  const [user, setUser] = useState({
    nama_depan: "",
    nama_belakang: "",
    paspor: "",
    password: "",
    email: "",
    ponsel: "",
    alamat: "",
    kota_kodepos: "",
  });

  const {
    nama_depan,
    nama_belakang,
    paspor,
    password,
    email,
    ponsel,
    alamat,
    kota_kodepos,
  } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    registerUser({
      nama_depan,
      nama_belakang,
      paspor,
      password,
      email,
      ponsel,
      alamat,
      kota_kodepos,
    });
  };

  useEffect(() => {
    clearAllAlerts();
    loadUser();
  }, []);

  useEffect(() => {
    if (authContext.user) {
      console.log(authContext.user.nama_depan);
    } else {
      console.log(authContext.user);
    }
    //todo is to setUser for each var into its inputs.
  }, [authContext.user]);

  return (
    <Container style={{ marginTop: "32px" }}>
      <Row>
        <Col>
          <h2>Data Sean Liesanggoro saat ini</h2>
          <Button style={{ marginTop: "8px" }} variant='success' href='#unggah'>
            Unggah Dokumen{" "}
            {authContext.user ? authContext.user.first_name : "asdas"}
          </Button>
          <hr />
        </Col>
      </Row>
      <Row>
        <Col style={{ marginBottom: "64px" }}>
          <Accordion style={{ marginBottom: "16px" }} defaultActiveKey='0'>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey='0'>
                Data Diri
              </Accordion.Toggle>
              <Accordion.Collapse eventKey='0'>
                <Card.Body>
                  <Form style={{ marginBottom: "32px" }} onSubmit={onSubmit}>
                    <Form.Group>
                      <FormLabel htmlFor='nama_depan' text='Nama Depan' />
                      <FormInput
                        inputName='nama_depan'
                        inputType='text'
                        onChangeMethod={onChange}
                      />
                    </Form.Group>

                    <Form.Group>
                      <FormLabel htmlFor='nama_belakang' text='Nama Belakang' />
                      <FormInput
                        inputName='nama_belakang'
                        inputType='text'
                        onChangeMethod={onChange}
                      />
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>

          <Accordion style={{ marginBottom: "16px" }} defaultActiveKey='0'>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey='0'>
                Alamat di Jerman
              </Accordion.Toggle>
              <Accordion.Collapse eventKey='0'>
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

          <Accordion defaultActiveKey='0'>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey='0'>
                Kontak
              </Accordion.Toggle>
              <Accordion.Collapse eventKey='0'>
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
      </Row>
      <Row id='unggah'>
        <Col>
          <hr />
          <h2>Unggah dokumen</h2>
        </Col>
      </Row>
    </Container>
  );
};

export default Ubah;
