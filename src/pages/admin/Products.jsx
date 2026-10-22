import { Link } from "react-router-dom";
import "../../components/Product/Productcard.css";
import { useState, useEffect } from "react";
import api from "../../settings/axiosInstance";


const Products = () => {
  const [data1, setData1] = useState([]);
  // const [message, setMessage] = useState('');


  useEffect(() => {
    api
      .get("/api/product/allProducts"
      )
      .then((res) => {
        console.log(res.data);
        setData1(res.data.dataSet);
      })
      .catch((error) => {
        console.error("Product fetch error:", error);
      });
  }, []);


  // ADD TO CART

//   const handleAddToCart = async (productId) => {
//     try {
//       const token = localStorage.getItem("accessToken");
//       console.log(productId);
        
//       // Check login
//       if (!token) {
//         // alert("Please login first");
//         showError("Please Login First");
//         return;
//       }

//       // Show loading only for clicked product
//       setLoadingProduct(productId);

//       const response = await api.post("/api/cart/addtocart",
//         {
//           productId: productId,
//           quantity: 1,
//         }
//       );

//       console.log("Add to cart response:", response.data);

//       if (response.data.success) {
//         showSuccess("Product added to cart successfully");
//       }
//     }
    
//     catch (error) 
//     {
//       // console.error("Add to cart error:", error);

//       if (error.response) {
//         const message = error.response.data?.message;

//         if (error.response.status === 401) {
//           showError(message || "Access token has expired")
          
//           // Optional: remove expired token
//           localStorage.removeItem("accessToken");
          
//           // Optional: redirect to login
//           navigate("/");
//         } else {
//           showError(message || "Something went wrong");
//         }
//       } else if (error.request) {
//         showError("Server is not responding. Please try again.");

//       } else {
//         showError("Something went wrong. Please try again.");
//       }
//     }
//      finally {
//       setLoadingProduct(null);
//     }
//   };
//     const handleAddToWishlist = async (productId) => {
//     try {
//       const token = localStorage.getItem("accessToken");
      

//       // Check login
//       if (!token) {
//         showError("Please Login First");
//         return;
//       }

//       // Show loading only for clicked product
//       setLoadingProduct(productId);

//       const response = await api.post("/api/cart/addtowishlist",
//         {
//           productId: productId,
//           quantity: 1,
//         }
//       );

//       console.log("Add to Wishlist response:", response.data);

//       if (response.data.success) {
//         showSuccess("Product added to Wishlist successfully");
//       }
//     }
    
//     catch (error) 
//     {
//       // console.error("Add to cart error:", error);

//       if (error.response) {
//         const message = error.response.data?.message;

//         if (error.response.status === 401) {
//           showError(message || "Access token has expired");
          
//           // Optional: remove expired token
//           localStorage.removeItem("accessToken");
          
//           // Optional: redirect to login
//           navigate("/");
//         } else {
//           showError(message || "Something went wrong");
//         }
//       } else if (error.request) {
//         showError("Server is not responding. Please try again.");
//       } else {
//         showError("Something went wrong. Please try again.");
//       }
//     }
//      finally {
//       setLoadingProduct(null);
//     }
//   };

  return (
  <div className="product-page">
    <div className="product-grid">
      {data1.map((item) => {
        const productId = item._id;

        return (
          <article className="product-card" key={productId}>
            <div className="product-image">
              <img src={item.path} alt={item.name} />
            </div>

            <div className="product-info">
              <span className="product-category">
                {item.category?.name || "Electronics"}
              </span>

              <h3 className="product-title">{item.name}</h3>

              <div className="product-rating">
                <span className="stars">★★★★★</span>
                <span className="rating-count">(4.5)</span>
              </div>

              <div className="price-box">
                <span className="price">₹{item.price}</span>
              </div>

              <div className="product-actions">
                <button className="add-cart-btn">Remove</button>

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
  </div>
);
};

export default Products;