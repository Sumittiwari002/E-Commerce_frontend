import { useEffect, useState } from "react";
import "./Productfilter.css";
import axios from "axios";

const Brandfilter = () => {
    let[data,setData] = useState([]);
    useEffect(()=>{

        axios.get(import.meta.env.VITE_API_NODEPATH + "/api/brand/allBrands")
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