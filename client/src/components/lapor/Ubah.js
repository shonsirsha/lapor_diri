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

  const [saved, setSaved] = useState(true);

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
    setSaved(false);
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
      setUser({
        nama_depan: authContext.user.nama_depan,
        nama_belakang: authContext.user.nama_belakang,
        paspor: authContext.user.paspor,
        email: authContext.user.email,
        ponsel: authContext.user.ponsel,
        alamat: authContext.user.alamat,
        kota_kodepos: authContext.user.kota_kodepos,
      });
      console.log(authContext.user.nama_depan);
    } else {
      console.log(authContext.user);
    }
    //todo is to setUser for each var into its inputs.
  }, [authContext.user]);
  if (isAuthenticated && !loading) {
    return (
      <Container style={{ marginTop: "32px", position: "relative" }}>
        <Alert className='statusBanner' variant='success'>
          Data tersimpan
        </Alert>
        <Row>
          <Col>
            <h2>Data {nama_depan + " " + nama_belakang} saat ini</h2>
            <Button
              style={{ marginTop: "8px" }}
              variant='outline-success'
              href='#unggah'
            >
              Unggah Dokumen{" "}
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
                          value={nama_depan}
                        />
                      </Form.Group>

                      <Form.Group>
                        <FormLabel
                          htmlFor='nama_belakang'
                          text='Nama Belakang'
                        />
                        <FormInput
                          inputName='nama_belakang'
                          inputType='text'
                          onChangeMethod={onChange}
                          value={nama_belakang}
                        />
                      </Form.Group>

                      <Form.Group>
                        <FormLabel htmlFor='paspor' text='Nomor Paspor' />
                        <FormInput
                          inputName='paspor'
                          inputType='text'
                          onChangeMethod={onChange}
                          value={paspor}
                        />
                      </Form.Group>

                      <Button
                        type='submit'
                        style={{ marginTop: "8px" }}
                        variant='success'
                        href='#unggah'
                      >
                        Simpan & perbarui
                      </Button>
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
                    <Form style={{ marginBottom: "32px" }} onSubmit={onSubmit}>
                      <Form.Group>
                        <FormLabel htmlFor='alamat' text='Alamat di Jerman' />
                        <FormInput
                          inputName='alamat'
                          inputType='text'
                          onChangeMethod={onChange}
                          value={alamat}
                        />
                      </Form.Group>

                      <Form.Group>
                        <FormLabel
                          htmlFor='kota_kodepos'
                          text='Kodepos & Kota'
                        />
                        <FormInput
                          inputName='kota_kodepos'
                          inputType='text'
                          onChangeMethod={onChange}
                          value={kota_kodepos}
                        />
                      </Form.Group>

                      <Button
                        type='submit'
                        style={{ marginTop: "8px" }}
                        variant='success'
                        href='#unggah'
                      >
                        Simpan & perbarui
                      </Button>
                    </Form>
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
                    <Form style={{ marginBottom: "32px" }} onSubmit={onSubmit}>
                      <Form.Group>
                        <FormLabel htmlFor='email' text='Email' />
                        <FormInput
                          inputName='email'
                          inputType='text'
                          onChangeMethod={onChange}
                          value={email}
                        />
                      </Form.Group>

                      <Form.Group>
                        <FormLabel htmlFor='ponsel' text='Ponsel' />
                        <FormInput
                          inputName='ponsel'
                          inputType='text'
                          onChangeMethod={onChange}
                          value={ponsel}
                        />
                      </Form.Group>

                      <Button
                        type='submit'
                        style={{ marginTop: "8px" }}
                        variant='success'
                        href='#unggah'
                      >
                        Simpan & perbarui
                      </Button>
                    </Form>
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
  } else {
    return <div></div>;
  }
};

export default Ubah;
