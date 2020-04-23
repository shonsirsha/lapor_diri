import React, { useEffect, useState, useContext, Fragment } from "react";
import CekContext from "../../context/cek/cekContext";

import FormInput from "../layouts/FormInputs/FormInput";
import { Form, Button, Card, InputGroup } from "react-bootstrap";
const Cek = () => {
  const cekContext = useContext(CekContext);

  const { cekRegistrasi } = cekContext;

  const [user, setUser] = useState({
    nama_belakang: "",
    paspor: "",
  });

  const { nama_belakang, paspor } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (nama_belakang === "" || paspor === "") {
    } else {
      cekRegistrasi({
        nama_belakang: nama_belakang,
        paspor: paspor,
      });
    }
  };

  return (
    <Fragment>
      <Card.Title style={{ textAlign: "center" }}>Cek Registrasi</Card.Title>
      <Form style={{ marginBottom: "32px" }} onSubmit={onSubmit}>
        <Form.Group controlId='nama_belakang'>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Nama Belakang</InputGroup.Text>
            </InputGroup.Prepend>
            <FormInput
              inputName='nama_belakang'
              inputType='text'
              onChangeMethod={onChange}
            />
          </InputGroup>
        </Form.Group>

        <Form.Group controlId='paspor'>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Nomor Paspor</InputGroup.Text>
            </InputGroup.Prepend>
            <FormInput
              inputName='paspor'
              inputType='text'
              onChangeMethod={onChange}
            />
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
