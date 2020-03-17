import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
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
    <form testId='register-form' onSubmit={onSubmit}>
      <div class='grid-2'>
        <div>
          <div className='form-group'>
            <label htmlFor='nama_depan'>Nama Depan</label>
            <FormInput
              inputName='nama_depan'
              inputType='text'
              onChangeMethod={onChange}
            />
          </div>
        </div>

        <div>
          <div className='form-group'>
            <label htmlFor='nama_belakang'>Nama Belakang</label>
            <FormInput
              inputName='nama_belakang'
              inputType='text'
              onChangeMethod={onChange}
            />
          </div>
        </div>
      </div>

      <div class='grid-2'>
        <div>
          <div className='form-group'>
            <label htmlFor='paspor'>Nomor Paspor (tanpa spasi)</label>
            <FormInput
              inputName='paspor'
              inputType='text'
              onChangeMethod={onChange}
            />
          </div>
        </div>

        <div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <FormInput
              inputName='password'
              inputType='password'
              onChangeMethod={onChange}
            />
          </div>
        </div>
      </div>

      <div className='grid-2'>
        <div>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <FormInput
              inputName='email'
              inputType='email'
              onChangeMethod={onChange}
            />
          </div>
        </div>

        <div>
          <div className='form-group'>
            <label htmlFor='ponsel'>Nomor Ponsel</label>
            <FormInput
              inputName='ponsel'
              inputType='text'
              onChangeMethod={onChange}
            />
          </div>
        </div>
      </div>

      <div className='grid-2'>
        <div>
          <div className='form-group'>
            <label htmlFor='alamat'>Alamat di Jerman</label>
            <FormInput
              inputName='alamat'
              inputType='text'
              onChangeMethod={onChange}
            />
          </div>
        </div>

        <div>
          <div className='form-group'>
            <label htmlFor='kota_kodepos'>kota_kodepos</label>
            <FormInput
              inputName='kota_kodepos'
              inputType='text'
              onChangeMethod={onChange}
            />
          </div>
        </div>
      </div>

      <div className='center-div'>
        <input
          type='submit'
          value='Daftar'
          className='btn btn-primary btn-pill'
          style={{ display: "inline-block", width: "180px" }}
        />
      </div>
    </form>
  );
};

export default RegisterForm;
