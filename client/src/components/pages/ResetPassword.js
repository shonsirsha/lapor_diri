import React, { useEffect, useState, useContext, Fragment } from "react";
import AuthContext from "../../context/auth/authContext";
import ToastContext from "../../context/toast/toastContext";
import ResetPasswordContext from "../../context/reset-password/resetPasswordContext";

import FormInput from "../layouts/FormInputs/FormInput";
import { Form, Button, Card, InputGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import RequestResetPassword from "./ResetPassword/Request";
import ActualResetPassword from "./ResetPassword/Reset";

const ResetPassword = () => {
  const [renderedComponent, setRenderedComponent] = useState(null);

  const history = useHistory();

  const authContext = useContext(AuthContext);
  const toastContext = useContext(ToastContext);
  const resetPasswordContext = useContext(ResetPasswordContext);

  const { loadUser, isAuthenticated, loading } = authContext;
  const { showToast } = toastContext;
  const { checkUid, uidValid } = resetPasswordContext;

  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });

  const authResult = new URLSearchParams(window.location.search);
  const uid = authResult.get("user");
  useEffect(() => {
    loadUser();

    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (uid !== null) {
      setRenderedComponent(<ActualResetPassword />);
    } else {
      alert(uid);

      setRenderedComponent(<RequestResetPassword />);
    }
  }, [uid]);

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
    //checkUid(uid);

    //eslint-disable-next-line
  }, [isAuthenticated]);

  const showLocalToast = (msg, type, timeout) => {
    showToast(msg, type, timeout);
    //    resetStates();
  };

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
  if (!isAuthenticated && !loading) {
    return renderedComponent;
    //   return (
    //     <Fragment>
    //       <Card.Title style={{ textAlign: "center" }}>
    //         Reset Kata Sandi
    //       </Card.Title>
    //       <Form style={{ marginBottom: "32px" }} onSubmit={onSubmit}>
    //         <Form.Group controlId='password'>
    //           <InputGroup>
    //             <InputGroup.Prepend>
    //               <InputGroup.Text>Kata Sandi</InputGroup.Text>
    //             </InputGroup.Prepend>
    //             <FormInput
    //               value={password}
    //               inputName='password'
    //               inputType='password'
    //               onChangeMethod={onChange}
    //             />
    //           </InputGroup>
    //         </Form.Group>

    //         <Form.Group controlId='confirmPassword'>
    //           <InputGroup>
    //             <InputGroup.Prepend>
    //               <InputGroup.Text>Ulangi Kata Sandi</InputGroup.Text>
    //             </InputGroup.Prepend>
    //             <FormInput
    //               value={confirmPassword}
    //               inputName='confirmPassword'
    //               inputType='password'
    //               onChangeMethod={onChange}
    //             />
    //           </InputGroup>
    //         </Form.Group>
    //         <Button type='submit' variant='success'>
    //           Reset
    //         </Button>
    //       </Form>
    //     </Fragment>
    //   );
  } else {
    return <div></div>;
  }
};

export default ResetPassword;
