import React, { useEffect, useState, useContext, Fragment } from "react";
import ToastContext from "../../../context/toast/toastContext";
import ResetPasswordContext from "../../../context/reset-password/resetPasswordContext";

import FormInput from "../../layouts/FormInputs/FormInput";
import { Form, Button, Card, InputGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const Request = ({ uidEncrypted }) => {
  const history = useHistory();

  const toastContext = useContext(ToastContext);
  const resetPasswordContext = useContext(ResetPasswordContext);

  const { showToast } = toastContext;
  const {
    checkUid,
    uidValid,
    resetPassword,
    passwordResetSuccess,
  } = resetPasswordContext;

  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });
  const { password, confirmPassword } = passwords;

  useEffect(() => {
    checkUid(uidEncrypted);
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (passwordResetSuccess !== null) {
      if (passwordResetSuccess === true) {
        showToast("Kata sandi berhasil diubah", "success");
      } else {
        showToast(
          "Terjadi kesalahan dalam penggantian kata sandi. Mohon ulangi kembali.",
          "danger",
          3000
        );
      }
    }
  }, passwordResetSuccess);

  useEffect(() => {
    if (uidValid === false) {
      history.push("/reset-kata-sandi");
    }
  }, [uidValid]);

  const onChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== "" || confirmPassword !== "") {
      if (password === confirmPassword) {
        resetPassword({ password: password, uidEncrypted: uidEncrypted });
        setTimeout(() => {
          history.push("/login");
        }, 2000);
      } else {
        showToast("Kata sandi tidak sama. Mohon ulangi lagi.", "danger", 2500);
      }
    }
  };
  if (uidValid === true && passwordResetSuccess !== true) {
    return (
      <Fragment>
        <Card.Title style={{ textAlign: "center" }}>
          Reset Kata Sandi
        </Card.Title>
        <Form style={{ marginBottom: "32px" }} onSubmit={onSubmit}>
          <Form.Group controlId="password">
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>Kata Sandi Baru</InputGroup.Text>
              </InputGroup.Prepend>
              <FormInput
                value={password}
                inputName="password"
                inputType="password"
                onChangeMethod={onChange}
                minLength={6}
                autocomplete="off"
              />
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>Ulangi Kata Sandi</InputGroup.Text>
              </InputGroup.Prepend>
              <FormInput
                value={confirmPassword}
                inputName="confirmPassword"
                inputType="password"
                onChangeMethod={onChange}
                minLength={6}
                autocomplete="off"
              />
            </InputGroup>
          </Form.Group>
          <Button type="submit" variant="success">
            Reset
          </Button>
        </Form>
      </Fragment>
    );
  } else {
    return null;
  }
};

export default Request;
