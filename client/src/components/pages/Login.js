import React, { useEffect, useState, useContext, Fragment } from "react";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import FormInput from "../layouts/FormInputs/FormInput";
import { Link } from "react-router-dom";

import { Form, Button, Card, InputGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";
const Login = () => {
  const history = useHistory();

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
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }

    if (error === "Invalid credentials") {
      setAlert("Akun tidak dapat ditemukan", "danger");
      scrollTop();
    }
    //eslint-disable-next-line
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
        <p style={{ marginTop: "8px" }}>
          Lupa kata sandi? Reset kata sandi Anda{" "}
          <Link to='/reset-kata-sandi'>disini.</Link>
        </p>
      </Fragment>
    );
  } else {
    return <div></div>;
  }
};

export default Login;
