import React, { Fragment, useEffect, useState } from "react";
import JumbotronSignup from "./JumbotronSignup";
import { Container, Card } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Login from "../pages/Login";
import CheckRegistration from "../pages/CheckRegistration";
import ResetPassword from "../pages/ResetPassword";
import Spinner from "./Spinner";
const HomeContainer = () => {
  const [renderedComponent, setRenderedComponent] = useState(null);
  let route = useLocation().pathname;
  route = route.replace(/\/+$/, "");

  useEffect(() => {
    if (route === "/login") {
      setRenderedComponent(<Login />);
    } else if (route === "/cek-registrasi") {
      setRenderedComponent(<CheckRegistration />);
    } else if (route === "/reset-kata-sandi") {
      setRenderedComponent(<ResetPassword />);
    }
  }, [route]);

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
            {renderedComponent ? renderedComponent : <Spinner />}
          </Card.Body>
        </Card>
      </Container>
      <JumbotronSignup />
    </Fragment>
  );
};

export default HomeContainer;
