// import "./Cartproductcard.css";

import axios from "axios";
import { useEffect, useState } from "react"

// const WishlistItems = ({ item }) => {
//   const product = item.product;

//   return (
//     <article className="cart-card">

//       {/* Product Image */}
//       <div className="cart-image">
//         <img
//           src={import.meta.env.VITE_API_NODEPATH + product.path}
//           alt={product.name}
//         />
//       </div>

//       {/* Product Information */}
//       <div className="cart-content">

//         <h3>{product.name}</h3>

//         <p className="brand">
//           Brand :{" "}
//           <span>
//             {product.brandId?.name || "N/A"}
//           </span>
//         </p>

//         <p className="category">
//           Category :{" "}
//           <span>
//             {product.categoryId?.name || "N/A"}
//           </span>
//         </p>

//         <p className="price">
//           ₹ {product.price}
//         </p>

       

//       </div>

     

//     </article>
//   );
// };

// export default WishlistItems;


import { Link } from "react-router-dom";
import "./WishlistItems.css";

const WishlistItems = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [removingId, setRemovingId] = useState(null);

  const token = localStorage.getItem("accessToken");

  // Fetch wishlist items
  const fetchWishlist = async () => {
    if (!token) {
      setError("Please log in to view your wishlist.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `${import.meta.env.VITE_API_NODEPATH}/api/cart/getwishlist`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setWishlist(response.data?.wishlist?.items || []);
    } catch (err) {
      console.error("Wishlist fetch error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load your wishlist. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  // Remove item from wishlist
  const handleRemove = async (item) => {
    const productId = item.product?._id;

    if (!productId) {
      setError("Unable to identify this product.");
      return;
    }

    try {
      setRemovingId(item._id);

      await axios.delete(
        `${import.meta.env.VITE_API_NODEPATH}/api/cart/removewishlist`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            productId,
          },
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

      await axios.post(
        `${import.meta.env.VITE_API_NODEPATH}/api/cart/addtocart`,
        {
          productId,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

                  <button
                    type="button"
                    className="wishlist-remove-icon"
                    onClick={() => handleRemove(item)}
                    disabled={removingId === item._id}
                    aria-label={`Remove ${product.name} from wishlist`}
                    title="Remove from wishlist"
                  >
                    {removingId === item._id ? "..." : "×"}
                  </button>
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

                  <p className="wishlist-quantity">
                    Saved quantity: <strong>{item.quantity}</strong>
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
          <Link to="/" className="wishlist-continue-shopping">
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WishlistItems;
