import { Link, useNavigate } from "react-router-dom";
import "./Productcard.css";
import { useState, useEffect } from "react";
import axios from "axios";

const Productcard = () => {
  const [data1, setData1] = useState([]);
  const [loadingProduct, setLoadingProduct] = useState(null);
  // const [message, setMessage] = useState('');
    const navigate = useNavigate();


  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_API_NODEPATH +
          "/api/product/allProducts"
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

  const handleAddToCart = async (productId) => {
    try {
      const token = localStorage.getItem("accessToken");

      // Check login
      if (!token) {
        alert("Please login first");
        return;
      }

      // Show loading only for clicked product
      setLoadingProduct(productId);

      const response = await axios.post(
        import.meta.env.VITE_API_NODEPATH +
          "/api/cart/addtocart",
        {
          productId: productId,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Add to cart response:", response.data);

      if (response.data.success) {
        alert("Product added to cart successfully");
      }
    }
    
    catch (error) 
    {
      // console.error("Add to cart error:", error);

      if (error.response) {
        const message = error.response.data?.message;

        if (error.response.status === 401) {
          alert(message || "Access token has expired");
          
          // Optional: remove expired token
          localStorage.removeItem("accessToken");
          
          // Optional: redirect to login
          navigate("/");
        } else {
          alert(message || "Something went wrong");
        }
      } else if (error.request) {
        alert("Server is not responding. Please try again.");
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
     finally {
      setLoadingProduct(null);
    }
  };

  return (
    <div className="product-grid">

      {data1.map((item) => {

        const productId = item._id;

        return (
          <article
            className="product-card"
            key={productId}
          >

            {/* Image Section */}
            <div className="product-image">

              <span className="product-badge">
                New
              </span>

              <button className="wishlist-btn">
                ♡
              </button>

              <img
                src={
                  import.meta.env.VITE_API_NODEPATH +
                  item.path
                }
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

              </div>

              {/* Buttons */}
              <div className="product-actions">

                {/* ADD TO CART */}
                <button
                  className="add-cart-btn"
                  onClick={() =>
                    handleAddToCart(productId)
                  }
                  disabled={
                    loadingProduct === productId
                  }
                >

                  {loadingProduct === productId
                    ? "Adding..."
                    : "🛒 Add to Cart"}

                </button>

                {/* VIEW PRODUCT */}
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