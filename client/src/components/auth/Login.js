import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";

import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  InputGroup,
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
      <div
        style={{
          marginTop: "64px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        className='container'
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
              <Button type='submit' variant='primary'>
                Masuk
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Login;
