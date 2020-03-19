import React, { Fragment } from "react";

import RegisterForm from "../auth/RegisterForm";
const Home = () => {
  return (
    <Fragment>
      <div style={{ marginTop: "32px" }} className='container'>
        <h1>Formulir Layanan Mandiri</h1>
        <RegisterForm />
      </div>
    </Fragment>
  );
};

export default Home;
