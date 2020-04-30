import React, { useEffect, useState, useContext, Fragment } from "react";
import AuthContext from "../../../context/auth/authContext";
import ToastContext from "../../../context/toast/toastContext";
import ResetPasswordContext from "../../../context/reset-password/resetPasswordContext";

import FormInput from "../../layouts/FormInputs/FormInput";
import { Form, Button, Card, InputGroup } from "react-bootstrap";

const Reset = () => {
  const authContext = useContext(AuthContext);
  const toastContext = useContext(ToastContext);
  const resetPasswordContext = useContext(ResetPasswordContext);

  const { showToast } = toastContext;
  const { sendRequestEmail, passwordResetSuccess } = resetPasswordContext;

  const [email, setEmail] = useState(null);
  const onChange = (e) => {
    setEmail(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (email !== "") {
      sendRequestEmail({ email });
    }
  };

  useEffect(() => {
    if (passwordResetSuccess !== null) {
      if (passwordResetSuccess === true) {
        showToast(
          "Link untuk me-reset kata sandi telah dikirim ke Email Anda",
          "success",
          2500
        );
      } else {
        showToast("Email tidak dapat ditemukan", "danger", 3000);
      }
    }
  }, [passwordResetSuccess]);

  return (
    <Fragment>
      <Card.Title style={{ textAlign: "center" }}>Temukan Akun Anda</Card.Title>
      <Form style={{ marginBottom: "32px" }} onSubmit={onSubmit}>
        <Form.Group controlId="email">
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Alamat E-mail</InputGroup.Text>
            </InputGroup.Prepend>
            <FormInput
              value={email}
              inputName="email"
              inputType="email"
              onChangeMethod={onChange}
              autocomplete="off"
            />
          </InputGroup>
        </Form.Group>

        <Button type="submit" variant="success">
          Kirim
        </Button>
      </Form>
    </Fragment>
  );
};

export default Reset;
