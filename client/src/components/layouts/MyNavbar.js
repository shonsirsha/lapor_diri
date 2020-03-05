import React, { Fragment } from "react";
import Logo from "../imgs/logo.png";

const MyNavbar = () => {
  return (
    <Fragment>
      <div className='navbar bg-light'>
        <div className='container'>
          <img src={Logo} width='80%' height='80%' />
        </div>
        {/* <ul>{isAuthenticated ? authLinks : guessLinks}</ul> */}
      </div>
    </Fragment>
  );
};

export default MyNavbar;
