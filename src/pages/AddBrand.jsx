import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "../assets/style/Forms.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const BrandSchema = Yup.object().shape({
  brandName: Yup.string()
    .required("Brand name is required")
    .min(2, "Minimum 2 characters"),
});

const AddBrand = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  return (
    <section className="form-section">
      <div className="form-card">

        <h2 className="form-title">Add Brand</h2>

        <Formik
          initialValues={{
            brandName: "",
          }}
          validationSchema={BrandSchema}
          onSubmit={(values) => {

            // console.log(values);

            let token = localStorage.getItem("accessToken");

            axios.post(import.meta.env.VITE_API_NODEPATH + "/api/brand/brand-action", {name:values.brandName}, 
              {
                headers: 
                {
                  Authorization: `Bearer ${token}`
                }
              }
            )
            .then(res=>{
              console.log(res.data);
              setMessage(res.data.message);
              
            })
            .catch(err=>{
              console.log(err.response.data);
              setMessage(err.response.data.message);
              alert(err.response.data.message);
              navigate('/login');
            })

          
          }}
        >
          {({ errors, touched }) => (
            <Form>

              <div className="form-group">
                <label>Brand Name</label>

                <Field
                  name="brandName"
                  className="form-control"
                  placeholder="Enter brand name"
                />

                {errors.brandName && touched.brandName && (
                  <div className="error">{errors.brandName}</div>
                )}
              </div>

              <button className="form-btn" type="submit">
                Add Brand
              </button>
              {
                (message != '')?(<p>{message}</p>):null
              }
            </Form>
          )}
        </Formik>

      </div>
    </section>
  );
};

export default AddBrand;