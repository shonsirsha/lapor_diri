import React, { useEffect, useState, useContext, Fragment } from "react";
import CheckContext from "../../context/check-registration/checkRegistrationContext";
import ToastContext from "../../context/toast/toastContext";

import FormInput from "../layouts/FormInputs/FormInput";
import { Form, Button, Card, InputGroup } from "react-bootstrap";
const CheckRegistration = () => {
  const checkContext = useContext(CheckContext);
  const toastContext = useContext(ToastContext);

  const { checkRegistration, status, registered, resetStates } = checkContext;
  const { showToast } = toastContext;

  const [user, setUser] = useState({
    nama_belakang: "",
    paspor: "",
  });

  const showLocalToast = (msg, type, timeout) => {
    showToast(msg, type, timeout);
    resetStates();
  };

  useEffect(() => {
    if (registered === false) {
      showLocalToast("Anda belum terdaftar", "danger", 2500); // you're not registered
    } else {
      if (status === 1) {
        showLocalToast("Anda sudah lapor diri", "success", 2500); // registered
      } else if (status === 0) {
        showLocalToast(
          "Anda telah terdaftar namun data Anda belum lengkap",
          "warning",
          2500
        );
        // you're registered but your data arent complete yet
      }
    }
  }, [status, registered]);

  const { nama_belakang, paspor } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (nama_belakang === "" || paspor === "") {
    } else {
      checkRegistration({
        nama_belakang: nama_belakang.toUpperCase(),
        paspor: paspor.toUpperCase(),
      });
    }
  };

  return (
    <Fragment>
      <Card.Title style={{ textAlign: "center" }}>Cek Registrasi</Card.Title>
      <Form style={{ marginBottom: "32px" }} onSubmit={onSubmit}>
        <Form.Group controlId='nama_belakang'>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Nama Belakang</InputGroup.Text>
            </InputGroup.Prepend>
            <FormInput
              value={nama_belakang}
              inputName='nama_belakang'
              inputType='text'
              onChangeMethod={onChange}
            />
          </InputGroup>
        </Form.Group>

        <Form.Group controlId='paspor'>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Nomor Paspor</InputGroup.Text>
            </InputGroup.Prepend>
            <FormInput
              value={paspor}
              inputName='paspor'
              inputType='text'
              onChangeMethod={onChange}
            />
          </InputGroup>
        </Form.Group>
        <Button type='submit' variant='success'>
          Cek
        </Button>
      </Form>
    </Fragment>
  );
};

export default CheckRegistration;
