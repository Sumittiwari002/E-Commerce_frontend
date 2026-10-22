
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { shareCategroyId } from "../../redux/slices/categorySlice";
import api from "../../settings/axiosInstance";
import { showSuccess } from "../../utilities/alert";
import "../../components/Product/Productcard.css";

const Categories = () => {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const fetchCategories = async () => {
    try {
      const res = await api.get("/api/category/allcategories");
      setData(res.data.dataSet || []);
    } catch (error) {
      console.error(
        "Category fetch error:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category._id);
    dispatch(shareCategroyId(category.name));
  };

  const handleRemoveCategory = async (category) => {
    try {
      const response = await api.post("/api/category/removecategory", {
        categoryId: category._id,
      });

      console.log("Delete category response:", response.data);

      // Update the UI immediately after a successful HTTP response
      setData((prevData) =>
        prevData.filter((item) => item._id !== category._id)
      );

      if (selectedCategory === category._id) {
        setSelectedCategory(null);
      }

      showSuccess(
        response.data.message || "Category removed successfully"
      );
    } catch (error) {
      console.error(
        "Category removal error:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <section className="category-page">
      <div className="category-header">
        <div>
          <h2>Categories</h2>
          <p>Manage and organize your product categories</p>
        </div>

        <span className="category-count">
          {data.length} Categories
        </span>
      </div>

      {loading ? (
        <p className="category-empty">Loading categories...</p>
      ) : data.length === 0 ? (
        <p className="category-empty">No categories found.</p>
      ) : (
        <div className="category-grid">
          {data.map((item) => (
            <div className="category-item" key={item._id || item.name}>
              <button
                type="button"
                className={`category-select ${
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

              <button
                type="button"
                className="remove-brand-btn"
                onClick={() => handleRemoveCategory(item)}
                aria-label={`Remove ${item.name}`}
              >
                <i className="bi bi-trash3" />
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Categories;
