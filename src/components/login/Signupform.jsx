import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./signupform.css";

const Signupform = () => {
  const [isLogin, setIsLogin] = useState(true);

  const formvalidationSchema = Yup.object().shape({
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
  const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),

  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});
  return (
    <section className="auth-section">
      <div className="auth-card">
        <h2 className="auth-title">
          {isLogin ? "Login" : "Registration"}
        </h2>

        <Formik
          initialValues={{
            name: "",
            mobile: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={isLogin ? LoginSchema : formvalidationSchema}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              {!isLogin && (
                <>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>

                    <Field
                      id="name"
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
                    <label htmlFor="mobile">Mobile</label>

                    <Field
                      id="mobile"
                      name="mobile"
                      type="text"
                      className="form-control"
                      placeholder="Enter mobile number"
                    />

                    {errors.mobile && touched.mobile && (
                      <div className="error">{errors.mobile}</div>
                    )}
                  </div>
                </>
              )}

              <div className="form-group">
                <label htmlFor="email">Email</label>

                <Field
                  id="email"
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
                <label htmlFor="password">Password</label>

                <Field
                  id="password"
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                />

                {errors.password && touched.password && (
                  <div className="error">{errors.password}</div>
                )}
              </div>

              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="confirmPassword">
                    Confirm Password
                  </label>

                  <Field
                    id="confirmPassword"
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
              )}

              <button type="submit" className="auth-btn">
                {isLogin ? "Login" : "Register"}
              </button>
            </Form>
          )}
        </Formik>

        <div className="auth-footer">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => setIsLogin(false)}
              >
                Register
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Signupform;