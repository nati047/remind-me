import React from "react";
import "../styles/Login.css";
import { Formik, } from 'formik'; 
import * as Yup from 'yup';
import "yup-phone";

function Register({ user }) {
  
  // useEffect(() => {
  //   if (user && user.id) history.push('/tasks');
  // }, [user, history]);

  return(
    <Formik 
      initialValues={{
        userName: '',
        phoneNumber: '',
        password: ''
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        console.log(values);

        setTimeout(() => {
          resetForm({ values: '' })
          setSubmitting(false)
        }, 3000)
      }}
      validationSchema={Yup.object({
        userName: Yup.string().required().min(5, 'Must be 5 charachters or more'),
        phoneNumber: Yup.string().phone("CA").required(),
        password: Yup.string().required().min(8, 'Must be more than 8 cahracters').max(15, 'must be less than 16 characters')
      })}
    >
      { formik => (
        <form className="login-form flex-column" onSubmit={formik.handleSubmit} >
          <header className="" >Singn Up</header>

          <section className="input-label flex-column">
            <div className="label-error">
              <label className="login-label" htmlFor='userName' >User name</label>
              {formik.touched.userName && formik.errors.userName ? (
                  <div className='error-msg' >{formik.errors.userName}</div>
                ) : <div></div>}
            </div>
            <input
              id='userName'
              name='userName'
              type='text'
              {...formik.getFieldProps('userName')}
            />
          </section>

          <section className="input-label flex-column">
            <div className="label-error">
              <label className="login-label" htmlFor='phoneNumber' >Phone number</label>
              {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                  <div className='error-msg' >{formik.errors.phoneNumber}</div>
                ) : <div></div>}
            </div>
            <input
              id='phoneNumber'
              name={'phoneNumber'}
              type='text'
              placeholder="+12345678910"
              {...formik.getFieldProps('phoneNumber')}
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

          <button className="login-btn">Sign Up</button>

        </form>
      )}

    </Formik>
  );
};

export default Register;