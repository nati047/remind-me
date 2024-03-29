import React from "react";
import axios from "axios";
import "../styles/AuthStyles.css";
import { Formik } from "formik";
import { useOutletContext, Navigate, Link } from "react-router-dom";
import * as Yup from "yup";
import "yup-phone";
import swal from "sweetalert";

const regisetrUser = async (newUserInfo, setUser) => {
  axios
    .post(`/auth/register`, newUserInfo)
    .then((response) => {
      const accessToken = response.data.token;
      const user = response.data.user;
      localStorage.setItem("access-token", accessToken);
      localStorage.setItem("user-state", JSON.stringify(true));
      setUser(user);
    })
    .catch((err) => {
      swal(err.response.data.error, { icon: "error" });
      console.log(err.response.data.error);
    });
};

function Register() {
  const [user, setUser] = useOutletContext();
  if (user?.id) {
    return <Navigate to="/tasks" />;
  }

  return (
    <Formik
      initialValues={{
        userName: "",
        phoneNumber: "",
        password: "",
      }}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        await regisetrUser(values, setUser);
        resetForm({ values: "" });
        setSubmitting(false);
      }}
      validationSchema={Yup.object({
        userName: Yup.string()
          .required()
          .min(5, "Must be 5 charachters or more"),
        phoneNumber: Yup.string()
          .phone("CA")
          .required("phone number is required"),
        password: Yup.string()
          .required()
          .min(8, "Must be more than 8 cahracters")
          .max(15, "must be less than 16 characters"),
      })}
    >
      {(formik) => (
        <form className="login-form flex-column" onSubmit={formik.handleSubmit}>
          <header className="">Singn Up</header>

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
              <label className="login-label" htmlFor="phoneNumber">
                Phone number
              </label>
              {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                <div className="error-msg">{formik.errors.phoneNumber}</div>
              ) : (
                <div></div>
              )}
            </div>
            <input
              id="phoneNumber"
              name={"phoneNumber"}
              type="text"
              placeholder="+12345678910"
              {...formik.getFieldProps("phoneNumber")}
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
          <div className="login-link">alreay have an account? <Link to="/login">login.</Link></div>
          <button className="login-btn">Sign Up</button>
        </form>
      )}
    </Formik>
  );
}

export default Register;
