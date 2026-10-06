import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "../assets/style/Forms.css";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductSchema = Yup.object().shape({
  productName: Yup.string().required("Product name is required"),
  productPrice: Yup.number().required("Price is required"),
  category: Yup.string().required("Category is required"),
  brand: Yup.string().required("Brand is required"),
  description: Yup.string().required("Description is required"),
});

const AddProduct = () => {
  const [selectedFile, setSelectedFile] = useState('');
  const [messageFile, setMessageFile] = useState('');

  const [brands, setBrands] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(()=>{
    
    Promise.all([
      axios.get(import.meta.env.VITE_API_NODEPATH + "/api/brand/allBrands"),
      axios.get(import.meta.env.VITE_API_NODEPATH + "/api/category/allcategories"),
    ])

    .then(result => {
      console.log(result);

      let[info1, info2] = result;

      console.log(info1.data.dataSet);
      console.log(info2.data.dataSet);
      
      setBrands(info1.data.dataSet);
      setCategory(info2.data.dataSet);
    })
    .catch(error =>{
      console.log(error.message);
      
    });
  },[])


  // let data1 = useFetch("categories");
  // let[data1,setData1] = useState([]);
  //   useEffect(()=>{
  //       getDocs('categories').then((response) =>{
  //           console.log(response.documents);
  //           setData1(response.documents);
  //       })
  //   },[]);

    let [message, setMessage] = useState();

  // let data2 = useFetch("brands");
  // let[data2,setData2] = useState([]);
  //   useEffect(()=>{
  //       getDocs('brands').then((response) =>{
  //           console.log(response.documents);
  //           setData2(response.documents);
  //       })
  //   },[]);


    function myfunc(ev){
      console.log(ev);
      console.log(ev.target);
      
      console.log(ev.target.files[0]);
      setSelectedFile(ev.target.files[0])

    }

    // async function uploadFile(fileOjbect) {
    //   console.log("Upload Here");
    //   console.log(fileOjbect);

    //   const fileName = `${Date.now()}-${fileOjbect.name}`;

    //   const command = new PutObjectCommand({
    //     Bucket: "e-comm-s3-firebase-project",
    //     Key: fileName,               // The name the file will have in S3
    //     Body: fileOjbect,            // The actual file blob/buffer/stream
    //     ContentType: fileOjbect.type // Helps browser open file instead of downloading
    //   });
    //   await s3Client.send(command);
    //   setMessage("Product Added...")
    //   return `https://e-comm-s3-firebase-project.s3.us-east-1.amazonaws.com/${fileName}`;
    // }

  return (
    <section className="form-section">

      <div className="form-card">

        <h2 className="form-title">
          Add Product
        </h2>

        <Formik
          initialValues={{
            productName: "",
            productPrice: "",
            category: "",
            brand: "",
            image: null,
            description: "",
          }}
          validationSchema={ProductSchema}
          onSubmit={async(values) => {
            console.log(values);

            if(!selectedFile){
              console.log('File Empty');
              setMessageFile("File Empty");
              return;
              
            }
            setMessageFile('');

            console.log(selectedFile);

            try{
              const formData = new FormData();
              formData.append('name', values.productName);
              formData.append('price', values.productPrice);
              formData.append('discount', 0 );
              formData.append('description', values.description);
              formData.append('path', selectedFile);
              formData.append('categoryId', values.category);
              formData.append('brandId', values.brand);

              let token = localStorage.getItem("accessToken");

              axios.post(import.meta.env.VITE_API_NODEPATH + "/api/product/product-action", formData,
                {
                  headers:{
                    Authorization: `Bearer ${token}`
                  }
                }
              )
              .then(res =>{
                console.log(res.data);
                setMessage("Product Added");
                
              })
              .catch(err=>{
                console.log(err.response);
                
                setMessage(err.response.data.message);
                
              })
              // const fileUrl = await uploadFile(selectedFile);

              //     console.log(fileUrl);
              //     console.log("Upload Successful");

              //     values['image'] = fileUrl;
              //     console.log(values);

              //     const payload = {
              //       fields: {
              //         productBrandId:{stringValue:values['brand']},
              //         productCategoryId:{stringValue:values['category']},
              //         productDescription:{stringValue:values['description']},
              //         productImagePath:{stringValue:values['image']},
              //         productName:{stringValue:values['productName']},
              //         productPrice:{stringValue: values['productPrice']},
              //       }
              //     };
              //     console.log(payload);
              //     const response = await firestoreApi.post(`/products`,payload);
              //     console.log(response);                
                  
                  
            }
            catch(error){
              console.log(error);
              console.log("Upload Failed");
              
              
            }
          }}
        >
          {({ errors, touched }) => (
            <Form>

              <div className="form-group">
                <label>Product Name</label>

                <Field
                  name="productName"
                  className="form-control"
                />

                {errors.productName && touched.productName && (
                  <div className="error">{errors.productName}</div>
                )}
              </div>

              <div className="form-group">
                <label>Product Price</label>

                <Field
                  name="productPrice"
                  type="number"
                  className="form-control"
                />

                {errors.productPrice && touched.productPrice && (
                  <div className="error">{errors.productPrice}</div>
                )}
              </div>

              <div className="form-group">
                <label>Category</label>

                <Field
                  as="select"
                  name="category"
                  className="form-control"
                >
                  <option value="">Select Category</option>
                  {category.map((item) => (
                    
                  <option value={item._id} >{item.name}</option>
                  ))}

                </Field>

                {errors.category && touched.category && (
                  <div className="error">{errors.category}</div>
                )}
              </div>

              <div className="form-group">
                <label>Brand</label>

                <Field
                  as="select"
                  name="brand"
                  className="form-control"
                >
                  <option value="">Select Brand</option>
                  {brands.map((item) => (
                  <option value={item._id} >{item.name}</option>
                  ))}

                </Field>

                {errors.brand && touched.brand && (
                  <div className="error">{errors.brand}</div>
                )}
              </div>

              <div className="form-group">
                <label>Product Image</label>

                <input
                  type="file"
                  className="form-control"
                  onChange={myfunc}
                />
              </div>

              <div className="form-group">
                <label>Description</label>

                <Field
                  as="textarea"
                  name="description"
                  className="form-control textarea"
                  rows="5"
                />

                {errors.description && touched.description && (
                  <div className="error">{errors.description}</div>
                )}
              </div>

              <button className="form-btn">
                Add Product
              </button>

              <p>{message}</p>
              <p>{messageFile}</p>

            </Form>
          )}
        </Formik>

      </div>

    </section>
  );
};

export default AddProduct;