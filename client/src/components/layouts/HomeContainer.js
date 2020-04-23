import React, { Fragment, useEffect, useState } from "react";
import JumbotronSignup from "./JumbotronSignup";
import { Container, Card } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Spinner from "./Spinner";
import Login from "../pages/Login";
import CekRegistrasi from "../pages/Cek";
const HomeContainer = () => {
  let route = useLocation().pathname;
  return (
    <Fragment>
      <Container
        style={{
          marginTop: "64px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card style={{ width: "80%" }}>
          <Card.Body>
            {route === "/login" ? <Login /> : <CekRegistrasi />}
          </Card.Body>
        </Card>
      </Container>
      <JumbotronSignup />
    </Fragment>
  );
};

export default HomeContainer;
