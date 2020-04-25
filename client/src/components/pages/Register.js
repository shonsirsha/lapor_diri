import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import { Row, Col, Form, Button, Card, Container } from "react-bootstrap";
import FormInput from "../layouts/FormInputs/FormInput";
import FormLabel from "../layouts/FormInputs/FormLabel";
import AlertContext from "../../context/alert/alertContext";

const RegisterForm = (props) => {
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

  useEffect(() => {
    clearAllAlerts();
    loadUser();
  }, []);
  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }

    if (error) {
      setAlert(error, "danger");
    }
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
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
    scrollTop();

    registerUser({
      nama_depan,
      nama_belakang,
      paspor,
      kantor_pengeluaran,
      password,
      email,
      ponsel,
      alamat,
      kota_kodepos,
    });

    clearAllAlerts();
  };

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isAuthenticated && !loading) {
    return (
      <Container style={{ marginTop: "32px" }}>
        <h1>Formulir Layanan Mandiri</h1>
        <Form
          style={{ marginBottom: "32px", marginTop: "32px" }}
          onSubmit={onSubmit}
        >
          <Row>
            <Col sm={12} lg={6}>
              <Form.Group>
                <FormLabel htmlFor='nama_depan' text='Nama Depan' />
                <FormInput
                  inputName='nama_depan'
                  inputType='text'
                  onChangeMethod={onChange}
                />
              </Form.Group>
            </Col>

            <Col sm={12} lg={6}>
              <Form.Group>
                <FormLabel htmlFor='nama_belakang' text='Nama Belakang' />
                <FormInput
                  inputName='nama_belakang'
                  inputType='text'
                  onChangeMethod={onChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col sm={12} lg={6}>
              <Form.Group>
                <FormLabel htmlFor='email' text='Email' />

                <FormInput
                  inputName='email'
                  inputType='email'
                  onChangeMethod={onChange}
                />
                <Form.Text className='text-muted'>
                  Kami tidak akan pernah membagikan email Anda dengan orang
                  lain.
                </Form.Text>
              </Form.Group>
            </Col>
            <Col sm={12} lg={6}>
              <Form.Group>
                <FormLabel htmlFor='password' text='Kata Sandi' />

                <FormInput
                  inputName='password'
                  inputType='password'
                  minLength='6'
                  onChangeMethod={onChange}
                />
                <Form.Text className='text-muted'>
                  Kata sandi harus mengandung 6 karakter atau lebih.
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col sm={12} lg={6}>
              <Form.Group>
                <FormLabel htmlFor='paspor' text='Nomor Paspor (tanpa spasi)' />

                <FormInput
                  inputName='paspor'
                  inputType='text'
                  onChangeMethod={onChange}
                />
              </Form.Group>
            </Col>

            <Col sm={12} lg={6}>
              <Form.Group>
                <FormLabel
                  htmlFor='kantor_pengeluaran'
                  text='Kantor Pengeluaran Paspor'
                />

                <FormInput
                  inputName='kantor_pengeluaran'
                  inputType='text'
                  onChangeMethod={onChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group>
            <Form.Label htmlFor='ponsel'>Nomor Ponsel</Form.Label>

            <FormInput
              inputName='ponsel'
              inputType='text'
              onChangeMethod={onChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor='alamat'>Alamat di Jerman</Form.Label>

            <FormInput
              inputName='alamat'
              inputType='text'
              onChangeMethod={onChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor='kota_kodepos'>Kota & Kodepos</Form.Label>

            <FormInput
              inputName='kota_kodepos'
              inputType='text'
              onChangeMethod={onChange}
            />
          </Form.Group>

          <Button variant='success' type='submit'>
            Daftar
          </Button>
          {/* <Button
          id='testbtn'
          onClick={() => {
            alert("asdsa");
          }}
          variant='primary'
        >
          Test
        </Button> */}
        </Form>
      </Container>
    );
  } else {
    return <div></div>;
  }
};

export default RegisterForm;
