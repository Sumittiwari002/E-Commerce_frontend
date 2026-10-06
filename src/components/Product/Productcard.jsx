import { Link } from "react-router-dom";
import "./Productcard.css";
import useFetch from "../../customHooks/useFetch";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const Productcard = () => {
  const [data1, setData1] = useState([]);
  const [status, setStatus] = useState(true);

  const catId = useSelector((state) => state.category.categoryId);
  console.log(catId);
  // const data = useFetch("products");
  // console.log(data);

  useEffect(() => {
    axios.get(import.meta.env.VITE_API_NODEPATH + "/api/product/allProducts")
    .then(res=>{
      console.log(res.data);
      setData1(res.data.dataSet);
    })
    // if (catId !== "") {
    //   const url =
    //     "https://firestore.googleapis.com/v1/projects/sumit-firebase-project/databases/(default)/documents:runQuery";

    //   fetch(url, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       structuredQuery: {
    //         from: [
    //           {
    //             collectionId: "products",
    //           },
    //         ],
    //         where: {
    //           fieldFilter: {
    //             field: {
    //               fieldPath: "productCategoryId",
    //             },
    //             op: "EQUAL",
    //             value: {
    //               stringValue: catId,
    //             },
    //           },
    //         },
    //       },
    //     }),
    //   })
    //     .then((res) => res.json())
    //     .then((response) => {
    //       const products = response
    //         .filter((item) => item.document)
    //         .map((item) => item.document);

    //       setData1(products);
    //       setStatus(false);
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // } else {
    //   setStatus(true);
    // }
  }, []);

  // const products = status ? data : data1;

  return (
    <div className="product-grid">
      {data1.map((item) => {
        const productId = item._id;

        return (
          <article className="product-card" key={productId}>

            {/* Image Section */}
            <div className="product-image">

              <span className="product-badge">
                New
              </span>

              <button className="wishlist-btn">
                ♡
              </button>

              <img
                src={import.meta.env.VITE_API_NODEPATH + item.path}
                alt={item.name}
              />

            </div>

            {/* Product Details */}
            <div className="product-info">

              <span className="product-category">
                Electronics
              </span>

              <h3 className="product-title">
                {item.name}
              </h3>

              <div className="product-rating">
                <span className="stars">
                  ★★★★★
                </span>

                <span className="rating-count">
                  (4.5)
                </span>
              </div>

              {/* Price */}
              <div className="price-box">

                <span className="price">
                  ₹{item.price}
                </span>

                <span className="old-price">
                  ₹2,999
                </span>

                <span className="discount">
                  20% OFF
                </span>

              </div>

              {/* Buttons */}
              <div className="product-actions">

                <button className="add-cart-btn">
                  🛒 Add to Cart
                </button>

                <Link
                  className="view-btn"
                  to={`/productdetails/${productId}`}
                >
                  View
                </Link>

              </div>

            </div>

          </article>
        );
      })}
    </div>
  );
};

export default Productcard;
