import React, { Fragment, useContext, useEffect } from "react";

import RegisterForm from "../auth/RegisterForm";
import AuthContext from "../../context/auth/authContext";
const Home = () => {
  const authContext = useContext(AuthContext);
  const { loadUser } = authContext;
  useEffect(() => {
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
