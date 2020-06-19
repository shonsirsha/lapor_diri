import React, { useContext, useEffect, useState } from "react";

import FormInput from "../../layouts/FormInputs/FormInput";
import FormLabel from "../../layouts/FormInputs/FormLabel";
import AlertContext from "../../../context/alert/alertContext";
import AuthContext from "../../../context/auth/authContext";
import ToastContext from "../../../context/toast/toastContext";

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
  ListGroup,
} from "react-bootstrap";

const HomeAuth = () => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const toastContext = useContext(ToastContext);

  const {
    changePassword,
    updateUser,
    loadUser,
    isAuthenticated,
    loading,
    updateStatus,
    resetUpdateStatus,
  } = authContext;

  const { showToast } = toastContext;

  const { clearAllAlerts } = alertContext;

  const [showModal, setShowModal] = useState(false);
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
    pasfoto_pic: "",
    melde_pic: "",
    paspor_pic: "",
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

  const showLocalToast = (msg, type, timeout) => {
    showToast(msg, type, timeout);
    resetUpdateStatus();
  };

  useEffect(() => {
    clearAllAlerts();
    loadUser();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (updateStatus === 1) {
      showLocalToast("Data tersimpan", "success"); // data has been saved successfully
    } else if (updateStatus === 0) {
      showLocalToast(
        "Terjadi kesalahan dalam menyimpan. Mohon coba lagi.", // there was an error saving the data
        "danger",
        2500
      );
    }
    //eslint-disable-next-line
  }, [updateStatus]);

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
        pasfoto_pic: authContext.user.pasfoto_pic,
        melde_pic: authContext.user.melde_pic,
        paspor_pic: authContext.user.paspor_pic,
      });
    }
  }, [authContext.user]);

  if (isAuthenticated && !loading) {
    return (
      <Container className="mt-32">
        <Modal show={showModal} onHide={toggleShowModal}>
          <Modal.Header closeButton>
            <Modal.Title>Ubah Kata Sandi</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="mb-32" onSubmit={onSubmitChangePassword}>
              <Form.Group>
                <FormLabel htmlFor="password" text="Kata Sandi Baru" />
                <FormInput
                  inputName="password"
                  inputType="password"
                  onChangeMethod={onChange}
                  value={password}
                  minLength={6}
                />
                <Form.Text className="text-muted">
                  Kata sandi harus mengandung 6 karakter atau lebih.
                </Form.Text>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={toggleShowModal}>
              Batal
            </Button>
            <Button variant="success" onClick={onSubmitChangePassword}>
              Simpan & perbarui
            </Button>
          </Modal.Footer>
        </Modal>

        <Row className="mb-16">
          <Col>
            {status && !loading ? (
              <Alert key="1" variant="success">
                <p className="lead">Pendaftaran Anda telah lengkap.</p>
              </Alert>
            ) : (
              <Alert key="1" variant="warning">
                <b>PENTING</b>
                <p className="lead">
                  Pendaftaran Anda{" "}
                  <b>
                    belum lengkap.
                    <br /> Mohon unggah dokumen yang diperlukan.
                  </b>
                </p>
                <Button href="#unggah" variant="warning">
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
              className="mb-8 mt-8"
              variant="outline-success"
              onClick={toggleShowModal}
            >
              Ubah Kata Sandi
            </Button>
            <hr />
          </Col>
        </Row>
        <Row className="mb-32">
          <Col>
            <Accordion className="mb-16" defaultActiveKey="0">
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                  Data Diri
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <Form className="mb-32" onSubmit={onSubmit}>
                      <Form.Group>
                        <FormLabel htmlFor="nama_depan" text="Nama Depan" />
                        <FormInput
                          inputName="nama_depan"
                          inputType="text"
                          onChangeMethod={onChange}
                          value={nama_depan}
                        />
                      </Form.Group>

                      <Form.Group>
                        <FormLabel
                          htmlFor="nama_belakang"
                          text="Nama Belakang"
                        />
                        <FormInput
                          inputName="nama_belakang"
                          inputType="text"
                          onChangeMethod={onChange}
                          value={nama_belakang}
                        />
                      </Form.Group>

                      <Form.Group>
                        <FormLabel htmlFor="paspor" text="Nomor Paspor" />
                        <FormInput
                          inputName="paspor"
                          inputType="text"
                          onChangeMethod={onChange}
                          value={paspor}
                        />
                      </Form.Group>

                      <Form.Group>
                        <FormLabel
                          htmlFor="kantor_pengeluaran"
                          text="Kantor Pengeluaran Paspor"
                        />
                        <FormInput
                          inputName="kantor_pengeluaran"
                          inputType="text"
                          onChangeMethod={onChange}
                          value={kantor_pengeluaran}
                        />
                      </Form.Group>

                      <Button type="submit" className="mt-8" variant="success">
                        Simpan & perbarui
                      </Button>
                    </Form>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>

            <Accordion className="mb-16" defaultActiveKey="0">
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                  Alamat di Jerman
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <Form className="mb-32" onSubmit={onSubmit}>
                      <Form.Group>
                        <FormLabel htmlFor="alamat" text="Nama Jalan" />
                        <FormInput
                          inputName="alamat"
                          inputType="text"
                          onChangeMethod={onChange}
                          value={alamat}
                        />
                      </Form.Group>

                      <Form.Group>
                        <FormLabel
                          htmlFor="kota_kodepos"
                          text="Kodepos & Kota"
                        />
                        <FormInput
                          inputName="kota_kodepos"
                          inputType="text"
                          onChangeMethod={onChange}
                          value={kota_kodepos}
                        />
                      </Form.Group>

                      <Button type="submit" className="mt-8" variant="success">
                        Simpan & perbarui
                      </Button>
                    </Form>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>

            <Accordion defaultActiveKey="0">
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                  Kontak / Detail Akun
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <Form className="mb-32" onSubmit={onSubmit}>
                      {[{ Email: { email } }, { Ponsel: { ponsel } }].map(
                        (obj) =>
                          Object.keys(obj).map((key) =>
                            Object.keys(obj[key]).map((key2, i) => (
                              <Form.Group key={i}>
                                <FormLabel htmlFor={key2} text={key} />
                                <FormInput
                                  inputName={key2}
                                  inputType="text"
                                  onChangeMethod={onChange}
                                  value={obj[key][key2]}
                                />
                              </Form.Group>
                            ))
                          )
                      )}

                      <Button type="submit" className="mt-8" variant="success">
                        Simpan & perbarui
                      </Button>
                    </Form>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Col>
        </Row>
        <Row id="unggah">
          <Col>
            <h2 className="mb-16">Unggah dokumen</h2>
          </Col>
        </Row>
        <Row className="mb-32">
          <Col>
            <Accordion defaultActiveKey="0">
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                  Dokumen
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <ListGroup variant="flush">
                      {[
                        { pasfoto_pic: "Pas Foto" },
                        { melde_pic: "Meldebescheinigung" },
                        { paspor_pic: "Paspor" },
                      ].map((obj) =>
                        Object.keys(obj).map((key, i) => (
                          <ListGroup.Item className="mt-8" key={i}>
                            <FileUpload
                              labelText={obj[key]}
                              documentName={key}
                              userId={user._id}
                            />
                          </ListGroup.Item>
                        ))
                      )}
                    </ListGroup>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Col>
        </Row>
      </Container>
    );
  } else {
    return <Spinner />;
  }
};

export default HomeAuth;
