import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "../assets/style/Forms.css";
import { useState } from "react";
import axios from "axios";

const CategorySchema = Yup.object().shape({
  categoryName: Yup.string()
    .required("Category name is required")
    .min(2, "Minimum 2 characters"),
});

const AddCategory = () => {
  const [message, setMessage] = useState('');
  return (
    <section className="form-section">
      <div className="form-card">

        <h2 className="form-title">Add Category</h2>

        <Formik
          initialValues={{
            categoryName: "",
          }}
          validationSchema={CategorySchema}
          onSubmit={(values) => {
            console.log(values);
            // console.log(import.meta.env.VITE_API_NODEPATH);
            
            let token = localStorage.getItem("accessToken");
            console.log(token);
            

            axios.post(import.meta.env.VITE_API_NODEPATH + "/api/category/category-action", {name:values.categoryName}, 
              {
                headers: {
                  Authorization :`Bearer ${token}`
                }
              })
            .then(res=>{
              console.log(res);
              setMessage(res.data.message);
              
            })
            .catch(err=>{
              // console.log(err);
              console.log(err.response.data);
              // console.log(err.response.data.message);
              setMessage(err.response.data.message);
              
            })
            // console.log(values);
            // addDocs('categories', values, 'categoryName').then(result=>{
            //   console.log('category Added');
            //   // console.log(result);

            //   if(result.status ===200){
            //     console.log('added....')
            //     setMessage('Category Added...')
            //   }              
            // })
          }}
        >
          {({ errors, touched }) => (
            <Form>

              <div className="form-group">
                <label>Category Name</label>

                <Field
                  name="categoryName"
                  className="form-control"
                  placeholder="Enter category name"
                />

                {errors.categoryName && touched.categoryName && (
                  <div className="error">{errors.categoryName}</div>
                )}
              </div>

              <button className="form-btn" type="submit">
                Add Category
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

export default AddCategory;