import React from "react";

const RegisterForm = () => {
  return (
    <div className=''>
      <form

      //    onSubmit={onSubmit}
      >
        <div class='grid-2'>
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
        <div className='form-container'>
          <input
            type='submit'
            value='Login'
            className='btn btn-primary btn-block'
          />
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
