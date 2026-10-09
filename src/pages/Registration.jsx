import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import "../components/login/signupform.css";
import axios from "axios";
import { useState } from "react";
// import firestoreApi from "../settings/apiSetting";

const Registration = () => {

  const[errmessage,setErrmessage] = useState('');

  const RegistrationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters"),

    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
      .required("Mobile number is required"),

    email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),

    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  return (
    <section className="auth-section">
      <div className="auth-card">
        <h2 className="auth-title">Registration</h2>

        <Formik
          initialValues={{
            name: "",
            mobile: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={RegistrationSchema}
          onSubmit={async (values) => {
            // alert(1)
            // console.log(values);

            axios.post(import.meta.env.VITE_API_NODEPATH + "/api/auth/register" ,values)
            .then(res=>{
              console.log(res.data);
              setErrmessage(res.data.message);             
             
            })
            .catch(err=>{
              // console.log(err);
              console.log(err.response.data.message);
              setErrmessage(err.response.data.message);
            })

            
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="form-group">
                <label>Name</label>

                <Field
                  name="name"
                  type="text"
                  className="form-control"
                  placeholder="Enter your name"
                />

                {errors.name && touched.name && (
                  <div className="error">{errors.name}</div>
                )}
              </div>

              <div className="form-group">
                <label>Mobile</label>

                <Field
                  name="mobile"
                  type="text"
                  className="form-control"
                  placeholder="Enter mobile number"
                />

                {errors.mobile && touched.mobile && (
                  <div className="error">{errors.mobile}</div>
                )}
              </div>

              <div className="form-group">
                <label>Email</label>

                <Field
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                />

                {errors.email && touched.email && (
                  <div className="error">{errors.email}</div>
                )}
              </div>

              <div className="form-group">
                <label>Password</label>

                <Field
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                />

                {errors.password && touched.password && (
                  <div className="error">{errors.password}</div>
                )}
              </div>

              <div className="form-group">
                <label>Confirm Password</label>

                <Field
                  name="confirmPassword"
                  type="password"
                  className="form-control"
                  placeholder="Confirm password"
                />

                {errors.confirmPassword &&
                  touched.confirmPassword && (
                    <div className="error">
                      {errors.confirmPassword}
                    </div>
                  )}
              </div>

              <button type="submit" className="auth-btn">
                Register
              </button>

              <p>{errmessage}</p>
            </Form>
          )}
        </Formik>

        <div className="auth-footer">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </div>
      </div>
    </section>
  );
};

export default Registration;