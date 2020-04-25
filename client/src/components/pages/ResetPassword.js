import React, { useEffect, useState, useContext, Fragment } from "react";
import ToastContext from "../../context/toast/toastContext";

import FormInput from "../layouts/FormInputs/FormInput";
import { Form, Button, Card, InputGroup } from "react-bootstrap";
const ResetPassword = () => {
  const toastContext = useContext(ToastContext);

  const { showToast } = toastContext;

  const [user, setUser] = useState({
    email: "",
    paspor: "",
  });

  const showLocalToast = (msg, type, timeout) => {
    showToast(msg, type, timeout);
    //    resetStates();
  };

  const { email, paspor } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === "" || paspor === "") {
    } else {
     //reset password here
    }
  };

  return (
    <Fragment>
      <Card.Title style={{ textAlign: "center" }}>Reset Kata Sandi</Card.Title>
      <Form style={{ marginBottom: "32px" }} onSubmit={onSubmit}>
        <Form.Group controlId='email'>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Email</InputGroup.Text>
            </InputGroup.Prepend>
            <FormInput
              value={email}
              inputName='email'
              inputType='email'
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
          Reset
        </Button>
      </Form>
    </Fragment>
  );
};

export default ResetPassword;
