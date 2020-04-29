import React, { useEffect, useState, useContext, Fragment } from "react";
import AuthContext from "../../../context/auth/authContext";
import ToastContext from "../../../context/toast/toastContext";
import ResetPasswordContext from "../../../context/reset-password/resetPasswordContext";

import FormInput from "../../layouts/FormInputs/FormInput";
import { Form, Button, Card, InputGroup } from "react-bootstrap";

const Request = () => {
  const toastContext = useContext(ToastContext);
  const resetPasswordContext = useContext(ResetPasswordContext);

  const { showToast } = toastContext;

  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });
  const { password, confirmPassword } = passwords;

  const onChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password === "" || confirmPassword === "") {
      //show fail
    } else {
      if (password === confirmPassword) {
        //change password here
      } else {
        //show fail
      }
    }
  };

  return (
    <Fragment>
      <Card.Title style={{ textAlign: "center" }}>Reset Kata Sandi</Card.Title>
      <Form style={{ marginBottom: "32px" }} onSubmit={onSubmit}>
        <Form.Group controlId='password'>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Kata Sandi</InputGroup.Text>
            </InputGroup.Prepend>
            <FormInput
              value={password}
              inputName='password'
              inputType='password'
              onChangeMethod={onChange}
            />
          </InputGroup>
        </Form.Group>

        <Form.Group controlId='confirmPassword'>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Ulangi Kata Sandi</InputGroup.Text>
            </InputGroup.Prepend>
            <FormInput
              value={confirmPassword}
              inputName='confirmPassword'
              inputType='password'
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

export default Request;
