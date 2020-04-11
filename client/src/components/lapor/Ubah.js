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
  Toast,
} from "react-bootstrap";
import FormInput from "../auth/RegisterForm/FormInput";
import FormLabel from "../auth/RegisterForm/FormLabel";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";
import { Link } from "react-router-dom";

const Ubah = (props) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { error, updateUser, loadUser, isAuthenticated, loading } = authContext;
  const { setAlert, clearAllAlerts } = alertContext;

  const [saved, setSaved] = useState(true);
  const [showBanner, setShowBanner] = useState(false);
  const toggleShowBanner = () => {
    setShowBanner(!showBanner);
  };
  const [user, setUser] = useState({
    _id: "",
    nama_depan: "",
    nama_belakang: "",
    paspor: "",
    kantor_pengeluaran: "",
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
    kantor_pengeluaran,
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
    updateUser(user);
    // registerUser({
    //   nama_depan,
    //   nama_belakang,
    //   paspor,
    //   password,
    //   email,
    //   ponsel,
    //   alamat,
    //   kota_kodepos,
    // });

    setShowBanner(false);
    setTimeout(() => {
      setShowBanner(true);
    }, 350);

    setTimeout(() => {
      setShowBanner(false);
    }, 1850);
  };

  useEffect(() => {
    clearAllAlerts();
    loadUser();
  }, []);

  useEffect(() => {
    if (authContext.user) {
      setUser({
        _id: authContext.user._id,
        nama_depan: authContext.user.nama_depan,
        nama_belakang: authContext.user.nama_belakang,
        paspor: authContext.user.paspor,
        kantor_pengeluaran: authContext.user.kantor_pengeluaran,
        email: authContext.user.email,
        ponsel: authContext.user.ponsel,
        alamat: authContext.user.alamat,
        kota_kodepos: authContext.user.kota_kodepos,
      });
      console.log(authContext.user.nama_depan);
    } else {
      console.log(authContext.user);
    }
  }, [authContext.user]);
  if (isAuthenticated && !loading) {
    return (
      <Container style={{ marginTop: "32px", position: "relative" }}>
        <Toast
          className='statusBanner'
          show={showBanner}
          onClose={toggleShowBanner}
        >
          <Toast.Header>
            <strong className='mr-auto'>Pemberitahuan</strong>
          </Toast.Header>
          <Toast.Body>
            {" "}
            <Alert variant={saved ? "success" : "danger"}>
              {saved ? "Data tersimpan" : "Data belum tersimpan"}
            </Alert>
          </Toast.Body>
        </Toast>

        <Row>
          <Col>
            <h2>Data Anda saat ini</h2>
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

                      <Form.Group>
                        <FormLabel
                          htmlFor='kantor_pengeluaran'
                          text='Kantor Pengeluaran Paspor'
                        />
                        <FormInput
                          inputName='kantor_pengeluaran'
                          inputType='text'
                          onChangeMethod={onChange}
                          value={kantor_pengeluaran}
                        />
                      </Form.Group>

                      <Button
                        type='submit'
                        style={{ marginTop: "8px" }}
                        variant='success'
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
                        <FormLabel htmlFor='alamat' text='Nama Jalan' />
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
                        <FormLabel htmlFor='ponsel' text='Nomor Ponsel' />
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