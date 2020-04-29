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

  const { loadUser, isAuthenticated, loading } = authContext;
  const { showToast } = toastContext;
  const { checkUid, uidValid } = resetPasswordContext;

  return <div>reset</div>;
};

export default Reset;
