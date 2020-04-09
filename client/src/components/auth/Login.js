import React, { useEffect, useState, useContext, Fragment } from "react";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import { Link } from "react-router-dom";

import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  InputGroup,
  Jumbotron,
} from "react-bootstrap";
import FormInput from "./RegisterForm/FormInput";

const Login = (props) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { error, loginUser, loadUser, isAuthenticated, loading } = authContext;
  const { setAlert, clearAllAlerts } = alertContext;

  useEffect(() => {
    clearAllAlerts();
    loadUser();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }

    if (error === "Invalid credentials") {
      setAlert("Akun tidak dapat ditemukan", "danger");
      scrollTop();
    }
  }, [error, isAuthenticated]);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      //   setAlert("Please fill in all fields", "danger");
    } else {
      loginUser({
        email: email,
        password: password,
      });
    }
  };

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isAuthenticated && !loading) {
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
              <Card.Title style={{ textAlign: "center" }}>Masuk</Card.Title>
              <Form style={{ marginBottom: "32px" }} onSubmit={onSubmit}>
                <Form.Group controlId='email'>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text>Email</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormInput
                      onChangeMethod={onChange}
                      inputName='email'
                      inputType='email'
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group controlId='password'>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text>Kata Sandi</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormInput
                      onChangeMethod={onChange}
                      inputName='password'
                      inputType='password'
                    />
                  </InputGroup>
                </Form.Group>
                <Button type='submit' variant='outline-success'>
                  Masuk
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Container>
        <Jumbotron
          style={{
            marginBottom: "0px",
            marginTop: "64px",
            background: "#01712E",
          }}
        >
          <Container
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h1 className='heroh1special'>Belum mendaftar?</h1>
              <h1 className='heroh1special'>Segera laporkan diri Anda!</h1>
            </div>

            <Link to='/register'>
              <Button variant='success'>Daftar Sekarang</Button>{" "}
            </Link>
          </Container>
        </Jumbotron>
      </Fragment>
    );
  } else {
    return <div></div>;
  }
};

export default Login;
