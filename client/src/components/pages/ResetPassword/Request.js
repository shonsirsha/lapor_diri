import React, { useEffect, useState, useContext, Fragment } from "react";
import ToastContext from "../../../context/toast/toastContext";
import ResetPasswordContext from "../../../context/reset-password/resetPasswordContext";

import FormInput from "../../layouts/FormInputs/FormInput";
import { Form, Button, Card, InputGroup } from "react-bootstrap";
import Spinner from "../../layouts/Spinner";

const Reset = () => {
  const toastContext = useContext(ToastContext);
  const resetPasswordContext = useContext(ResetPasswordContext);

  const { showToast } = toastContext;
  const {
    sendRequestEmail,
    passwordResetSuccess,
    resetUpdateStatus,
    error,
    loading,
  } = resetPasswordContext;

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
      if (passwordResetSuccess === false) {
        if (error === "user not found") {
          showToast("Email tidak dapat ditemukan", "danger", 2500);
        } else {
          showToast(
            "Telah terjadi kesalahan. Mohon coba kembali.",
            "danger",
            2500
          );
        }
        resetUpdateStatus();
      }
    }
    //eslint-disable-next-line
  }, [passwordResetSuccess]);

  return (
    <Fragment>
      <Card.Title className="text-center">Temukan Akun Anda</Card.Title>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          {passwordResetSuccess ? (
            <p className="text-center">
              Link untuk me-reset kata sandi telah terkirim. Mohon cek kembali
              kotak masuk Email Anda.
            </p>
          ) : (
            <Form className="mb-32" onSubmit={onSubmit}>
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
          )}
        </div>
      )}
    </Fragment>
  );
};

export default Reset;
