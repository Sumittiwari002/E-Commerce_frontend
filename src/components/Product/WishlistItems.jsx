import api from "../../settings/axiosInstance";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import {  showError } from "../../utilities/alert";

import { Link } from "react-router-dom";
import "./WishlistItems.css";

const WishlistItems = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [removingId, setRemovingId] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");

  // Fetch wishlist items
  const fetchWishlist = async () => {
    if (!token) {
      setError("Please log in to view your wishlist");
      showError("Please log in to view your wishlist");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await api.get(`/api/cart/getwishlist`);

      setWishlist(response.data?.wishlist?.items || []);
    } catch (err) {
      console.error("Wishlist fetch error:", err);

      setError(err.response?.data?.message ||"Unable to load your wishlist. Please try again.");
      showError(err.response?.data?.message ||"Unable to load your wishlist. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
     api.post("/api/auth/authtoken", {}
       )
       .then(res=>{
        console.log(res);
       })
       .catch(error=>{
        console.log(error.message);
        // alert("Please Login Again");
        navigate("/");
        
       });
    fetchWishlist();
  }, []);

  // Remove item from wishlist
  const handleRemove = async (item) => {
    const productId = item.product?._id;

    if (!productId) {
      setError("Unable to identify this product");
      showError("Unable to identify this product");
      return;
    }

    try {
      setRemovingId(item._id);

      await api.post(`/api/cart/removefromwishlist`,
        {
          productId: productId,
          quantity: 1,
        }
      );

      setWishlist((previousItems) =>
        previousItems.filter(
          (wishlistItem) => wishlistItem._id !== item._id
        )
      );
    } catch (err) {
      console.error("Remove wishlist error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to remove this product from your wishlist."
      );
    } finally {
      setRemovingId(null);
    }
  };

  // Add product to cart
  const handleAddToCart = async (item) => {
    const productId = item.product?._id;

    if (!productId) {
      setError("Unable to identify this product.");
      return;
    }

    try {
      setError("");

      await api.post(`/api/cart/addtocart`,
        {
          productId,
          quantity: 1,
        }
      );

      alert("Product added to cart successfully!");
    } catch (err) {
      console.error("Add to cart error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to add this product to your cart."
      );
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="wishlist-status">
        <div className="wishlist-spinner"></div>
        <p>Loading your wishlist...</p>
      </div>
    );
  }

  // Empty wishlist state
  if (wishlist.length === 0) {
    return (
      <section className="wishlist-page">
        <div className="wishlist-empty">
          <div className="wishlist-empty-icon">♡</div>

          <h2>Your wishlist is empty</h2>

          <p>
            Save your favorite products here and find them whenever
            you need them.
          </p>

          <Link to="/" className="wishlist-shop-button">
            Explore Products
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="wishlist-page">
      <div className="wishlist-container">

        {/* Page Header */}
        <div className="wishlist-header">
          <div>
            <span className="wishlist-eyebrow">
              YOUR COLLECTION
            </span>

            <h1>
              My Wishlist <span>♡</span>
            </h1>

            <p>Keep the products you love close.</p>
          </div>

          <div className="wishlist-count">
            {wishlist.length}{" "}
            {wishlist.length === 1 ? "Item" : "Items"}
          </div>
        </div>

        {error && (
          <div className="wishlist-error" role="alert">
            {error}
            <button
              type="button"
              onClick={() => setError("")}
              aria-label="Dismiss error"
            >
              ×
            </button>
          </div>
        )}

        {/* Wishlist Product Grid */}
        <div className="wishlist-grid">
          {wishlist.map((item) => {
            const product = item.product;

            // Skip items whose populated product is unavailable
            if (!product) return null;

            const imageUrl = product.path
              ? product.path.startsWith("http")
                ? product.path
                : `${import.meta.env.VITE_API_NODEPATH}${product.path}`
              : "";

            return (
              <article
                className="wishlist-card"
                key={item._id}
              >
                {/* Product Image */}
                <div className="wishlist-image-wrapper">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={product.name || "Product"}
                      className="wishlist-product-image"
                      loading="lazy"
                    />
                  ) : (
                    <div className="wishlist-image-placeholder">
                      No Image Available
                    </div>
                  )}

                </div>

                {/* Product Details */}
                <div className="wishlist-card-content">
                  <h3 title={product.name}>
                    {product.name}
                  </h3>

                  <p className="wishlist-product-price">
                    ₹
                    {Number(product.price || 0).toLocaleString(
                      "en-IN"
                    )}
                  </p>

                  <div className="wishlist-card-actions">
                    <button
                      type="button"
                      className="wishlist-cart-button"
                      onClick={() => handleAddToCart(item)}
                    >
                      Add to Cart
                    </button>

                    <button
                      type="button"
                      className="wishlist-remove-button"
                      onClick={() => handleRemove(item)}
                      disabled={removingId === item._id}
                    >
                      {removingId === item._id
                        ? "Removing..."
                        : "Remove"}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="wishlist-footer">
          <Link to="/home" className="wishlist-continue-shopping">
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WishlistItems;
