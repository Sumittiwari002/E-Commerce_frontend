import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';

export default function SingleProduct() {
    let {productid} = useParams();
    console.log(productid);
    (productid);
    let [record, setrecord] = useState({});

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_NODEPATH}/api/product/productdetails/${productid}`)
        .then(res=>{
            console.log(res.data.product);
            setrecord(res.data.product);
        })
        .catch(err=>{
            console.error(err);
        })
    },[productid]);
  
return (
  <div className="container py-4">
    <h1>Product Details</h1>
    <hr />

    {record && (
      <div className="row">
        {/* Product Image */}
        <div className="col-md-6">
          <img
            src={`${import.meta.env.VITE_API_NODEPATH}${record.path}`}
            alt={record.name}
            className="img-fluid"
          />
        </div>

        {/* Product Information */}
        <div className="col-md-6">
          <h2>{record.name}</h2>

          <h3>₹{record.price}</h3>

          <p>{record.description}</p>

          <p>Brand: {record.brandId?.name || "N/A"}</p>

          <p>Category: {record.categoryId?.name || "N/A"}</p>

          <button className="btn btn-primary">
            Add To Cart
          </button>
        </div>
      </div>
    )}
  </div>
);

}
