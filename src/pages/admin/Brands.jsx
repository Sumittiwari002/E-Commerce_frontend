
import { useEffect, useState } from "react";
import "../../components/Product/Productcard.css";
import api from "../../settings/axiosInstance";
import { showSuccess } from "../../utilities/alert";


const Brands = () => {
  const [data, setData] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    api
      .get("/api/brand/allBrands")
      .then((res) => {
        setData(res.data.dataSet || []);
      })
      .catch((err) => {
        console.error("Brand fetch error:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleBrandClick = (brand) => {
    const brandId = brand._id;
    api.post(import.meta.env.VITE_API_NODEPATH + "/api/brand/removebrand", {brandId})
    .then(res=>{
        console.log(res);
        showSuccess(res.data.message);
    })
    .catch((err) =>
    {
        console.error(err.message);
    })
    setSelectedBrand(brand._id);
    console.log("Selected brand:", brand.name, brand._id);
  };

  return (
    <section className="category-page">
      <div className="category-header">
        <div>
          <h2>Brands</h2>
          <p>Explore and select your favorite brands</p>
        </div>

        <span className="category-count">
          {data.length} Brands
        </span>
      </div>

      {loading ? (
        <p className="category-empty">Loading brands...</p>
      ) : data.length === 0 ? (
        <p className="category-empty">No brands found.</p>
      ) : (
        <div className="category-grid">
          {data.map((item) => (
            <button
              type="button"
              key={item._id || item.name}
              className={`category-item ${
                selectedBrand === item._id ? "selected" : ""
              }`}
              onClick={() => handleBrandClick(item)}
            >
              <span className="category-icon">
                <i className="bi bi-patch-check-fill" />
              </span>

              <span className="category-name">{item.name}</span>

              <i className="bi bi-arrow-up-right category-arrow" />
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export default Brands;
