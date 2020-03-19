import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import FormInput from "./RegisterForm/FormInput";
const RegisterForm = props => {
  const authContext = useContext(AuthContext);
  const { registerUser } = authContext;
  useEffect(() => {}, []);

  const [user, setUser] = useState({
    nama_depan: "",
    nama_belakang: "",
    paspor: "",
    password: "",
    email: "",
    ponsel: "",
    alamat: "",
    kota_kodepos: ""
  });

  const {
    nama_depan,
    nama_belakang,
    paspor,
    password,
    email,
    ponsel,
    alamat,
    kota_kodepos
  } = user;

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();

    registerUser({
      nama_depan,
      nama_belakang,
      paspor,
      password,
      email,
      ponsel,
      alamat,
      kota_kodepos
    });
  };

  return (
    <Form style={{ marginBottom: "32px" }} onSubmit={onSubmit}>
      <Form.Group controlId='nama_depan'>
        <Form.Label htmlFor='nama_depan'>Nama Depan</Form.Label>
        <FormInput
          inputName='nama_depan'
          inputType='text'
          onChangeMethod={onChange}
        />
      </Form.Group>

      <Form.Group controlId='nama_belakang'>
        <Form.Label htmlFor='nama_belakang'>Nama Belakang</Form.Label>
        <FormInput
          inputName='nama_belakang'
          inputType='text'
          onChangeMethod={onChange}
        />
      </Form.Group>

      <Form.Group controlId='paspor'>
        <Form.Label htmlFor='paspor'>Nomor Paspor (tanpa spasi)</Form.Label>
        <FormInput
          inputName='paspor'
          inputType='text'
          onChangeMethod={onChange}
        />
      </Form.Group>

      <Form.Group controlId='password'>
        <Form.Label htmlFor='password'>Password</Form.Label>
        <FormInput
          inputName='password'
          inputType='password'
          onChangeMethod={onChange}
        />
      </Form.Group>

      <Form.Group controlId='password'>
        <Form.Label htmlFor='email'>Email</Form.Label>
        <FormInput
          inputName='email'
          inputType='email'
          onChangeMethod={onChange}
        />
        <Form.Text className='text-muted'>
          Kami tidak akan pernah membagikan email Anda dengan orang lain.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId='password'>
        <Form.Label htmlFor='ponsel'>Nomor Ponsel</Form.Label>
        <FormInput
          inputName='ponsel'
          inputType='text'
          onChangeMethod={onChange}
        />
      </Form.Group>

      <Form.Group controlId='alamat'>
        <Form.Label htmlFor='alamat'>Alamat di Jerman</Form.Label>
        <FormInput
          inputName='alamat'
          inputType='text'
          onChangeMethod={onChange}
        />
      </Form.Group>

      <Form.Group controlId='kota_kodepos'>
        <Form.Label htmlFor='kota_kodepos'>Kota & Kodepos</Form.Label>
        <FormInput
          inputName='kota_kodepos'
          inputType='text'
          onChangeMethod={onChange}
        />
      </Form.Group>

      <Button variant='primary' type='submit'>
        Daftar
      </Button>
    </Form>
  );
};

export default RegisterForm;
