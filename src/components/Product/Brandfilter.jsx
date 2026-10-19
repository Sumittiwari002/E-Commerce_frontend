import { useEffect, useState } from "react";
import "./Productfilter.css";
import api from "../../settings/axiosInstance";

const Brandfilter = () => {
    let[data,setData] = useState([]);
    useEffect(()=>{

        api.get("/api/brand/allBrands")
        .then(res=>{
          console.log(res.data.dataSet);
          setData(res.data.dataSet);
        })

    },[])

  return (
    <section className="filter-card">
      <h3 className="filter-title">Brands</h3>

      <div className="filter-options">
        {data.map((item) => (
          <label key={item.name} className="filter-option">
            <input
              type="radio"
            />

            <span>{item.name}</span>
          </label>
        ))}
      </div>
    </section>
  );
};

export default Brandfilter;