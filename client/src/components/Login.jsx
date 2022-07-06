import React from "react";
import "../styles/Login.css";
import { Formik, } from 'formik'; 
import { Navigate, useOutletContext } from 'react-router-dom';
import axios from "axios";
import swal from "sweetalert";

const login = async (data, setUser) => {
  axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, data)
  .then( response => {
    const accessToken = response.data.token;
    const user = response.data.user;

    setUser(user);
    
    localStorage.setItem("access-token", JSON.stringify(accessToken));
    localStorage.setItem("user-state", JSON.stringify(user));
    console.log("result from api", response)
  }).catch( err => {
    swal(err.response.data.error, "", "danger");
    console.log(err);
  })
}

function Login() {
  const [user, setUser] = useOutletContext();
  console.log('user in login', user)
  if (user?.id) {
    return (
      <Navigate to="/tasks" />
    );
  }
  return(
    <Formik 
      initialValues={{
        userName: '',
        password: ''
      }}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        console.log(values)
        await login(values, setUser);
        resetForm({ values: '' });
        setSubmitting(false);
      }}
    >
      { formik => (
        <form className="login-form flex-column" onSubmit={formik.handleSubmit} >
          <header className="" >Welcome back</header>

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