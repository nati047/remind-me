import React from "react";
import "../styles/Login.css";
import { Formik, } from 'formik'; 
import PhoneInput from 'react-phone-number-input'

function Login( { user }) {
  
  // useEffect(() => {
  //   if (user && user.id) history.push('/tasks');
  // }, [user, history]);

  return(
    <Formik 
      initialValues={{
        login: '',
        password: ''
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        console.log(values);

        setTimeout(() => {
          resetForm({ values: '' })
          setSubmitting(false)
        }, 3000)
      }}
    >
      { formik => (
        <form className="login-form flex-column" onSubmit={formik.handleSubmit} >
          <header className="" >Welcome back</header>
          <section className="input-label flex-column">
            <div className="label-error">
              <label className="login-label" htmlFor='login' >User name</label>
              {formik.touched.login && formik.errors.login ? (
                  <div className='error-msg' >{formik.errors.login}</div>
                ) : <div></div>}
            </div>
            <input
              id='login'
              name='login'
              type='text'
              {...formik.getFieldProps('login')}
            />
          </section>

          <section className="input-label flex-column">
            <div className="label-error">
              <label className="login-label" htmlFor='password' >Password</label>
              {formik.touched.password && formik.errors.password ? (
                  <div className='error-msg' >{formik.errors.password}</div>
                ) : <div></div>}
            </div>
            <input
              id='password'
              name='password'
              type='password'
              {...formik.getFieldProps('password')}
            />
          </section>

          <button className="login-btn">Login</button>

        </form>
      )}

    </Formik>
  );
};

export default Login;