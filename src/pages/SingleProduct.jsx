import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function SingleProduct() {
  const { productid } = useParams();
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    axios
      .get(`${import.meta.env.VITE_API_NODEPATH}/api/product/productdetails/${productid}`)
      .then((res) => {
        setRecord(res.data.product);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load product details. Please try again.");
      })
      .finally(() => setLoading(false));
  }, [productid]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3 text-secondary">Loading product details...</p>
      </div>
    );
  }

  if (error || !record) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-warning">
          {error || "Product not found"}
        </div>
        <Link to="/home" className="btn btn-dark">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const discount = Number(record.discount) || 0;
  const price = Number(record.price) || 0;
  const originalPrice =
    discount > 0 && discount < 100
      ? price / (1 - discount / 100)
      : null;

  return (
    <div className="bg-light min-vh-100 py-4 py-md-5">
      <div className="container">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb small mb-0">
            <li className="breadcrumb-item">
              <Link to="/" className="text-decoration-none text-secondary">
                Home
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Product Details
            </li>
          </ol>
        </nav>

        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
          <div className="row g-0">
            {/* Product Image */}
            <div className="col-lg-6 bg-white">
              <div className="position-relative d-flex align-items-center justify-content-center p-4 p-md-5 h-100">
                {discount > 0 && (
                  <span className="badge bg-danger position-absolute top-0 start-0 m-4 px-3 py-2 rounded-pill">
                    {discount}% OFF
                  </span>
                )}

                <img
                  src={`${import.meta.env.VITE_API_NODEPATH}${record.path}`}
                  alt={record.name || "Product"}
                  className="img-fluid"
                  style={{
                    maxHeight: "460px",
                    width: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
            </div>

            {/* Product Information */}
            <div className="col-lg-6">
              <div className="p-4 p-md-5 h-100 d-flex flex-column">
                <span className="badge bg-primary-subtle text-primary align-self-start px-3 py-2 mb-3">
                  Product Details
                </span>

                <h1 className="fw-bold display-6 mb-3">
                  {record.name}
                </h1>

                <div className="d-flex align-items-center flex-wrap gap-3 mb-4">
                  <span className="display-6 fw-bold text-primary">
                    ₹{price.toLocaleString("en-IN")}
                  </span>

                  {originalPrice && (
                    <span className="fs-5 text-secondary text-decoration-line-through">
                      ₹
                      {Math.round(originalPrice).toLocaleString("en-IN")}
                    </span>
                  )}
                </div>

                {discount > 0 && (
                  <p className="text-success fw-semibold mb-4">
                    <i className="bi bi-tag-fill me-2"></i>
                    You save {discount}% on this product
                  </p>
                )}

                <hr className="text-secondary opacity-25" />

                <h5 className="fw-bold mt-2 mb-3">About this product</h5>

                <p className="text-secondary lh-lg mb-4">
                  {record.description || "No description available."}
                </p>

                {/* Product Specifications */}
                <div className="bg-light rounded-3 p-3 mb-4">
                  <div className="row g-3">
                    <div className="col-6">
                      <div className="text-secondary small mb-1">
                        <i className="bi bi-award me-2"></i>Brand
                      </div>
                      <div className="fw-semibold">
                        {record.brandId?.name || "N/A"}
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="text-secondary small mb-1">
                        <i className="bi bi-grid me-2"></i>Category
                      </div>
                      <div className="fw-semibold">
                        {record.categoryId?.name || "N/A"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Benefits */}
                <div className="d-flex flex-column gap-2 mb-4">
                  <div className="small text-secondary">
                    <i className="bi bi-shield-check text-success me-2"></i>
                    Secure shopping experience
                  </div>
                  <div className="small text-secondary">
                    <i className="bi bi-truck text-success me-2"></i>
                    Convenient online shopping
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-auto d-grid gap-3">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg rounded-3 fw-semibold py-3"
                  >
                    <i className="bi bi-cart-plus me-2"></i>
                    Add To Cart
                  </button>

                  <Link
                    to="/home"
                    className="btn btn-outline-dark rounded-3 py-2"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Features */}
        <div className="row g-3 mt-3">
          <div className="col-md-4">
            <div className="bg-white shadow-sm rounded-3 p-3 d-flex align-items-center gap-3 h-100">
              <i className="bi bi-shield-check fs-3 text-primary"></i>
              <div>
                <div className="fw-semibold">Secure Shopping</div>
                <div className="small text-secondary">
                  Shop with confidence
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="bg-white shadow-sm rounded-3 p-3 d-flex align-items-center gap-3 h-100">
              <i className="bi bi-bag-check fs-3 text-primary"></i>
              <div>
                <div className="fw-semibold">Quality Products</div>
                <div className="small text-secondary">
                  Explore our collection
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="bg-white shadow-sm rounded-3 p-3 d-flex align-items-center gap-3 h-100">
              <i className="bi bi-headset fs-3 text-primary"></i>
              <div>
                <div className="fw-semibold">Customer Support</div>
                <div className="small text-secondary">
                  Help when you need it
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
