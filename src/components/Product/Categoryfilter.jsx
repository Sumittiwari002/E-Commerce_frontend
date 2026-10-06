import { useEffect, useState } from "react";
import "./Productfilter.css";
import {useDispatch} from 'react-redux'
import { shareCategroyId } from "../../redux/slices/categorySlice";
import axios from "axios";

const Categoryfilter = () => {

  let [data, setData] = useState([]);

  useEffect(()=>{
    axios.get(import.meta.env.VITE_API_NODEPATH + "/api/category/allcategories")
    .then(res=>{
      console.log(res.data.dataSet);
      setData(res.data.dataSet);
    })
    .catch(err=>{
      console.log(err.response.statusText);
    })
  }, [])
    
  // let data = useFetch('categories');
  console.log(data);
  let dispatch = useDispatch();
   
  function myfunc(id){
    console.log(id);
      dispatch(shareCategroyId(id));
  }

  return (
    <section className="filter-card">
      <h3 className="filter-title">Categories</h3>

      <div className="filter-options">
        {data.map((item) => (
          <label key={item.name} className="filter-option">
            <input type="radio" />
            <span onClick={()=>{myfunc(item.name)}}>{item.name}</span>
          </label>
        ))}
      </div>
    </section>
  );
};

export default Categoryfilter;