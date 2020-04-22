import React, { Fragment, useContext, useEffect, useState } from "react";

import FormInput from "../../layouts/FormInputs/FormInput";
import FormLabel from "../../layouts/FormInputs/FormLabel";
import AlertContext from "../../../context/alert/alertContext";
import AuthContext from "../../../context/auth/authContext";
import Spinner from "../../layouts/Spinner";
import FileUpload from "../../layouts/FormInputs/FileUpload";

import {
  Modal,
  Button,
  Row,
  Col,
  Card,
  Container,
  Alert,
  Accordion,
  Form,
  Toast,
  FormGroup,
  ProgressBar,
  ListGroup,
} from "react-bootstrap";

const HomeAuth = (props) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const {
    changePassword,
    error,
    updateUser,
    loadUser,
    isAuthenticated,
    loading,
  } = authContext;
  const { setAlert, clearAllAlerts } = alertContext;

  const [showModal, setShowModal] = useState(false);
  const [fileMelde, setFileMelde] = useState(null);
  const [fileMeldeProgress, setFileMeldeProgress] = useState(0);
  const toggleShowModal = () => {
    setShowModal(!showModal);
  };
  const [user, setUser] = useState({
    _id: "",
    nama_depan: "",
    nama_belakang: "",
    paspor: "",
    password: "",
    kantor_pengeluaran: "",
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
    kantor_pengeluaran,
    email,
    status,
    ponsel,
    alamat,
    kota_kodepos,
    melde_pic,
    paspor_pic,
  } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmitChangePassword = (e) => {
    e.preventDefault();
    changePassword(user, password);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updateUser(user);
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
        status: authContext.user.status,
        ponsel: authContext.user.ponsel,
        alamat: authContext.user.alamat,
        kota_kodepos: authContext.user.kota_kodepos,
        melde_pic: authContext.user.melde_pic,
        paspor_pic: authContext.user.paspor_pic,
      });
    } else {
    }
  }, [authContext.user]);
  if (isAuthenticated && !loading) {
    return (
      <Container style={{ marginTop: "32px", position: "relative" }}>
        <Modal show={showModal} onHide={toggleShowModal}>
          <Modal.Header closeButton>
            <Modal.Title>Ubah Kata Sandi</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              style={{ marginBottom: "32px" }}
              onSubmit={onSubmitChangePassword}
            >
              <Form.Group>
                <FormLabel htmlFor='password' text='Kata Sandi Baru' />
                <FormInput
                  inputName='password'
                  inputType='password'
                  onChangeMethod={onChange}
                  value={password}
                  minLength='6'
                />
                <Form.Text className='text-muted'>
                  Kata sandi harus mengandung 6 karakter atau lebih.
                </Form.Text>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={toggleShowModal}>
              Batal
            </Button>
            <Button variant='success' onClick={onSubmitChangePassword}>
              Simpan & perbarui
            </Button>
          </Modal.Footer>
        </Modal>

        <Row style={{ marginBottom: "16px" }}>
          <Col>
            {status && !loading ? (
              <Alert key='1' variant='success'>
                <p class='lead'>Pendaftaran Anda telah lengkap.</p>
              </Alert>
            ) : (
              <Alert key='1' variant='warning'>
                <b>PENTING</b>
                <p class='lead'>
                  Pendaftaran Anda{" "}
                  <b>
                    belum lengkap.
                    <br /> Mohon unggah dokumen yang diperlukan.
                  </b>
                </p>
                <Button href='#unggah' variant='warning'>
                  Unggah dokumen
                </Button>
              </Alert>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>Data Anda saat ini</h2>
            <Button
              style={{ marginTop: "4px", marginBottom: "8px" }}
              variant='outline-success'
              onClick={toggleShowModal}
            >
              Ubah Kata Sandi
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
                  Kontak / Detail Akun
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
            <h2 style={{ marginBottom: "16px" }}>Unggah dokumen</h2>
          </Col>
        </Row>
        <Row style={{ marginBottom: "32px" }}>
          <Col>
            <Accordion defaultActiveKey='0'>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey='0'>
                  Dokumen
                </Accordion.Toggle>
                <Accordion.Collapse eventKey='0'>
                  <Card.Body>
                    <ListGroup variant='flush'>
                      <ListGroup.Item>
                        <FileUpload
                          labelText='Meldebescheinigung'
                          pathToFirebase='melde'
                          documentName='melde'
                          userId={user._id}
                          documentUrl={melde_pic}
                        />
                      </ListGroup.Item>
                      <ListGroup.Item style={{ marginTop: "8px" }}>
                        <FileUpload
                          labelText='Paspor'
                          pathToFirebase='paspor'
                          documentName='paspor'
                          userId={user._id}
                          documentUrl={paspor_pic}
                        />
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>

            {/* */}
          </Col>
        </Row>
      </Container>
    );
  } else {
    return <Spinner />;
  }
};

export default HomeAuth;
