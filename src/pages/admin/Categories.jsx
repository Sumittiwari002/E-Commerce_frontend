
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { shareCategroyId } from "../../redux/slices/categorySlice";
import api from "../../settings/axiosInstance";
import "../../components/Product/Productcard.css";

const Categories = () => {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    api
      .get("/api/category/allcategories")
      .then((res) => {
        setData(res.data.dataSet || []);
      })
      .catch((err) => {
        console.error("Category fetch error:", err);
      });
  }, []);

  const handleCategoryClick = (category) => {
    console.log(category._id);
    console.log(category.name);
    setSelectedCategory(category._id);
    dispatch(shareCategroyId(category.name));
  };

  return (
    <section className="category-page">
      <div className="category-header">
        <div>
          <h2>Categories</h2>
          <p>Browse and select a product category</p>
        </div>

        <span className="category-count">
          {data.length} Categories
        </span>
      </div>

      <div className="category-grid">
        {data.map((item) => (
          <button
            type="button"
            key={item._id || item.name}
            className={`category-item ${
              selectedCategory === item._id ? "selected" : ""
            }`}
            onClick={() => handleCategoryClick(item)}
          >
            <span className="category-icon">
              <i className="bi bi-tag-fill" />
            </span>

            <span className="category-name">{item.name}</span>

            <i className="bi bi-arrow-up-right category-arrow" />
          </button>
        ))}
      </div>

      {data.length === 0 && (
        <p className="category-empty">No categories found.</p>
      )}
    </section>
  );
};

export default Categories;
