import React, { useEffect, useState, useContext, Fragment } from "react";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import FormInput from "../layouts/FormInputs/FormInput";
import JumbotronSignup from "../layouts/JumbotronSignup";
import { Container, Form, Button, Card, InputGroup } from "react-bootstrap";
const Cek = () => {
  return (
    <Fragment>
      <Card.Title style={{ textAlign: "center" }}>Cek Registrasi</Card.Title>
      <Form style={{ marginBottom: "32px" }}>
        <Form.Group controlId='nama_belakang'>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Nama Belakang</InputGroup.Text>
            </InputGroup.Prepend>
            <FormInput inputName='nama_belakang' inputType='text' />
          </InputGroup>
        </Form.Group>

        <Form.Group controlId='paspor'>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Nomor Paspor</InputGroup.Text>
            </InputGroup.Prepend>
            <FormInput inputName='paspor' inputType='text' />
          </InputGroup>
        </Form.Group>
        <Button type='submit' variant='success'>
          Cek
        </Button>
      </Form>
    </Fragment>
  );
};

export default Cek;
