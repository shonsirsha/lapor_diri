import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";

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
    <form onSubmit={onSubmit}>
      <div class='grid-2'>
        <div>
          <div className='form-group'>
            <label htmlFor='nama_depan'>Nama Depan</label>
            <input
              type='text'
              name='nama_depan'
              //  value={}
              onChange={onChange}
              required
            />
          </div>

          {/* <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              // value={}
              // onChange={}
              required
            />
          </div> */}
        </div>

        <div>
          <div className='form-group'>
            <label htmlFor='nama_belakang'>Nama Belakang</label>
            <input
              type='text'
              name='nama_belakang'
              //    value={}
              onChange={onChange}
              required
            />
          </div>
        </div>
      </div>

      <div class='grid-2'>
        <div>
          <div className='form-group'>
            <label htmlFor='paspor'>Nomor Paspor (tanpa spasi)</label>
            <input
              type='text'
              name='paspor'
              //    value={}
              onChange={onChange}
              required
            />
          </div>
        </div>

        <div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              // value={}
              onChange={onChange}
              required
            />
          </div>
        </div>
      </div>

      <div className='grid-2'>
        <div>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              name='email'
              //    value={}
              onChange={onChange}
              required
            />
          </div>
        </div>

        <div>
          <div className='form-group'>
            <label htmlFor='ponsel'>Nomor Ponsel</label>
            <input
              type='text'
              name='ponsel'
              //    value={}
              onChange={onChange}
              required
            />
          </div>
        </div>
      </div>

      <div className='grid-2'>
        <div>
          <div className='form-group'>
            <label htmlFor='alamat'>Alamat di Jerman</label>
            <input
              type='text'
              name='alamat'
              //    value={}
              onChange={onChange}
              required
            />
          </div>
        </div>

        <div>
          <div className='form-group'>
            <label htmlFor='kota_kodepos'>kota_kodepos</label>
            <input
              type='text'
              name='kota_kodepos'
              //    value={}
              onChange={onChange}
              required
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
