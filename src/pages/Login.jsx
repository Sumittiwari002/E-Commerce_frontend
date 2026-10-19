import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import "../components/login/signupform.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const Login = () => {

  const [errmessage, setErrmessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const LoginSchema = Yup.object({
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
        <h2 className="auth-title">Login</h2>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
            console.log("Login Data:", values);

            
            axios.post(import.meta.env.VITE_API_NODEPATH + "/api/auth/login", values)
            .then(res=>{
              console.log(res.data);
              setErrmessage(res.data.message);

              if(res.data.success === true){
                login(res.data.data.accessToken, res.data.data.user);
                navigate("/home");
              }
              
            })
            .catch(err=>{
              // console.log(err.response.status);
              // console.log(err.response.data.message);
              setErrmessage(err.response.data.message);
              
              
            })
          }}
        >
          {({ errors, touched }) => (
            <Form>
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

              <button type="submit" className="auth-btn">
                Login
              </button>

              <p>{errmessage}</p>
            </Form>
          )}
        </Formik>

        <div className="auth-footer">
          Don't have an account?{" "}
          <Link to="/newuser">Register</Link>
        </div>
      </div>
    </section>
  );
};

export default Login;