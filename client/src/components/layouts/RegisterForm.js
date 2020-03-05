import React from "react";

const RegisterForm = () => {
  return (
    <form

    //    onSubmit={onSubmit}
    >
      <div class='grid-2'>
        <div>
          <div className='form-group'>
            <label htmlFor='namadepan'>Nama Depan</label>
            <input
              type='text'
              name='namadepan'
              //    value={} onChange={}
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
            <label htmlFor='namabelakang'>Nama Belakang</label>
            <input
              type='text'
              name='namabelakang'
              //    value={} onChange={}
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
              //    value={} onChange={}
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
              // onChange={}
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
              //    value={} onChange={}
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
              //    value={} onChange={}
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
              //    value={} onChange={}
              required
            />
          </div>
        </div>

        <div>
          <div className='form-group'>
            <label htmlFor='kodepos'>Kodepos</label>
            <input
              type='text'
              name='kodepos'
              //    value={} onChange={}
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
          style={{ display: "inline-block", width: "15%" }}
        />
      </div>
    </form>
  );
};

export default RegisterForm;
