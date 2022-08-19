import React from "react";
import "../styles/AuthStyles.css";
import { Formik } from "formik";
import { Navigate, useOutletContext, Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const login = async (data, setUser) => {
  axios
    .post(`/auth/login`, data)
    .then((response) => {
      const accessToken = response.data.token;
      const user = response.data.user;

      setUser(user);
      console.log("user logged in", response.data);
      localStorage.setItem("access-token", JSON.stringify(accessToken));
      localStorage.setItem("user-state", JSON.stringify(true));
    })
    .catch((err) => {
      swal(err.response.data.error, {icon: "error"});
    });
};

function Login() {
  const [user, setUser] = useOutletContext();

  if (user?.id) {
    return <Navigate to="/tasks" />;
  }

  return (
    <>
    <Formik
      initialValues={{
        userName: "",
        password: "",
      }}
      
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        await login(values, setUser);
        resetForm({ values: "" });
        setSubmitting(false);
      }}
    >
      {(formik) => (
        <form className="login-form flex-column" onSubmit={formik.handleSubmit}>
          <header className="">Welcome back</header>

          <section className="input-label flex-column">
            <div className="label-error">
              <label className="login-label" htmlFor="userName">
                User name
              </label>
              {formik.touched.userName && formik.errors.userName ? (
                <div className="error-msg">{formik.errors.userName}</div>
              ) : (
                <div></div>
              )}
            </div>
            <input
              id="userName"
              name="userName"
              type="text"
              {...formik.getFieldProps("userName")}
            />
          </section>

          <section className="input-label flex-column">
            <div className="label-error">
              <label className="login-label" htmlFor="password">
                Password
              </label>
              {formik.touched.password && formik.errors.password ? (
                <div className="error-msg">{formik.errors.password}</div>
              ) : (
                <div></div>
              )}
            </div>
            <input
              id="password"
              name="password"
              type="password"
              {...formik.getFieldProps("password")}
            />
          </section>
          <div className="regisetr-link">New to Remind.me? <Link to="/register">Sign Up</Link></div>
          <button className="login-btn">Login</button>
        </form>
      )}
    </Formik>

    </>
  );
}

export default Login;
