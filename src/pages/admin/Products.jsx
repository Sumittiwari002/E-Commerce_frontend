
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../settings/axiosInstance";
import { showSuccess } from "../../utilities/alert";
import "../../components/Product/Productcard.css";

const Products = () => {
  const [data1, setData1] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await api.get("/api/product/allProducts");
      setData1(res.data.dataSet || []);
    } catch (error) {
      console.error(
        "Product fetch error:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Remove product from database
  const handleRemoveProduct = async (productId) => {
    try {
      const res = await api.post("/api/product/removeproduct", {
        productId,
      });

      // Update UI after successful deletion
      setData1((prevData) =>
        prevData.filter((item) => item._id !== productId)
      );

      showSuccess(
        res.data.message || "Product removed successfully"
      );
    } catch (error) {
      console.error(
        "Product removal error:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <section className="product-page">
      <div className="category-header">
        <div>
          <h2>Products</h2>
          <p>Manage and organize your products</p>
        </div>

        <span className="category-count">
          {data1.length} Products
        </span>
      </div>

      {loading ? (
        <p className="category-empty">Loading products...</p>
      ) : data1.length === 0 ? (
        <p className="category-empty">No products found.</p>
      ) : (
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

                  <h3 className="product-title">
                    {item.name}
                  </h3>

                  <div className="product-rating">
                    <span className="stars">★★★★★</span>
                    <span className="rating-count">(4.5)</span>
                  </div>

                  <div className="price-box">
                    <span className="price">
                      ₹{item.price}
                    </span>
                  </div>

                  <div className="product-actions">
                    <button
                      type="button"
                      className="add-cart-btn"
                      onClick={() =>
                        handleRemoveProduct(productId)
                      }
                    >
                      Remove
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
      )}
    </section>
  );
};

export default Products;
