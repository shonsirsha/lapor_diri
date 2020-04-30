import React, { useEffect, useState, useContext, Fragment } from "react";
import AuthContext from "../../context/auth/authContext";
import ResetPasswordContext from "../../context/reset-password/resetPasswordContext";

import { useHistory } from "react-router-dom";
import RequestResetPassword from "./ResetPassword/Request";
import ActualResetPassword from "./ResetPassword/Reset";

const ResetPassword = () => {
  const [renderedComponent, setRenderedComponent] = useState(null);

  const history = useHistory();

  const authContext = useContext(AuthContext);
  const resetPasswordContext = useContext(ResetPasswordContext);

  const { loadUser, isAuthenticated, loading } = authContext;
  const { resetUpdateStatus } = resetPasswordContext;

  const authResult = new URLSearchParams(window.location.search);
  const uid = authResult.get("user");

  useEffect(() => {
    loadUser();
    resetUpdateStatus();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (uid !== null) {
      setRenderedComponent(<ActualResetPassword uidEncrypted={uid} />);
    } else {
      setRenderedComponent(<RequestResetPassword />);
    }
  }, [uid]);

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
    //eslint-disable-next-line
  }, [isAuthenticated]);

  if (!isAuthenticated && !loading) {
    return renderedComponent;
  } else {
    return <div></div>;
  }
};

export default ResetPassword;
