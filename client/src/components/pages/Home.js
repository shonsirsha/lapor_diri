import React, { Fragment, useContext, useEffect } from "react";

import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";
const Home = () => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const { clearAllAlerts } = alertContext;

  const { loadUser } = authContext;
  useEffect(() => {
    clearAllAlerts();
    loadUser();
    //eslint-disable-next-line
  }, []);
  return (
    <Fragment>
      <div>{/* <RegisterForm /> */}</div>
    </Fragment>
  );
};

export default Home;
