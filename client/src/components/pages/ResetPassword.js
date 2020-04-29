import React, { useEffect, useState, useContext, Fragment } from "react";
import AuthContext from "../../context/auth/authContext";

import { useHistory } from "react-router-dom";
import RequestResetPassword from "./ResetPassword/Request";
import ActualResetPassword from "./ResetPassword/Reset";

const ResetPassword = () => {
  const [renderedComponent, setRenderedComponent] = useState(null);

  const history = useHistory();

  const authContext = useContext(AuthContext);
  const { loadUser, isAuthenticated, loading } = authContext;

  const authResult = new URLSearchParams(window.location.search);
  const uid = authResult.get("user");

  useEffect(() => {
    loadUser();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (uid !== null) {
      setRenderedComponent(<ActualResetPassword encryptedUid={uid} />);
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
