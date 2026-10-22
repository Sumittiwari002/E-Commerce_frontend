
import { useEffect, useState } from "react";
import "../../components/Product/Productcard.css";
import api from "../../settings/axiosInstance";
import { showSuccess } from "../../utilities/alert";
import { useNavigate } from "react-router-dom";


const Brands = () => 
{
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

//   const token = localStorage.getItem("accessToken");
 const fetchBrand = async () =>
    {
        try{
            await api.get("/api/brand/allBrands")
            .then((res) => {
                setData(res.data.dataSet);
            })
            .catch((err) => {
                console.error("Brand fetch error:", err);
            })
            .finally(() => {
                setLoading(false);
            });
        }
        catch(err){
            console.error(err.message);
        }
    }

  useEffect(() => {
    api.post("/api/auth/authtoken", {})
           .then(res=>{
            console.log(res);
           })
           .catch(error=>{
            console.log(error.message);
            // alert("Please Login Again");
            navigate("/");
           })
    fetchBrand();
  }, []);


const handleRemoveBrand = async (brand) => {
  try {
    const response = await api.post("/api/brand/removebrand", {
      brandId: brand._id,
    });

    console.log(response.data);
    
    if (response.data.success) {
      // Remove the deleted brand from the UI immediately
      setData((prevData) =>
        prevData.filter((item) => item._id !== brand._id)
      );

      showSuccess(response.data.message || "Brand removed successfully");
    }
  } catch (error) {
    console.error(
      "Brand removal error:",
      error.response?.data?.message || error.message
    );
  }
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
        <div className="category-item" key={item._id || item.name}>
            <span className="category-icon">
            <i className="bi bi-patch-check-fill" />
            </span>

            <span className="category-name">{item.name}</span>

            <button
            type="button"
            className="remove-brand-btn"
            onClick={() => handleRemoveBrand(item)}
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

export default Brands;
