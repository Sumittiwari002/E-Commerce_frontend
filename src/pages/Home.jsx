import Categoryfilter from "../components/Product/Categoryfilter";
import Brandfilter from "../components/Product/Brandfilter";
import Productcard from "../components/Product/Productcard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const Home = () => {
  
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  console.log(token);

  const products = [];

  
   useEffect(()=>{
     axios.post(import.meta.env.VITE_API_NODEPATH + "/api/auth/authtoken", {},
    {
      headers: 
      {
        Authorization:`Bearer ${token}`
      }
    }
   )
   .then(res=>{
    console.log(res);
   })
   .catch(error=>{
    console.log(error.message);
    // alert("Please Login Again");
    navigate("/");
    
   });
   }, []);
  
    
  



  return (
    
    <main className="container py-4">

      <div className="row">

        <aside className="col-lg-3">

          <Categoryfilter />

          <Brandfilter/>

        </aside>

       <section className="col-lg-9">

    <div className="row g-4">
      <Productcard/>

        

    </div>

</section>

      </div>

    </main>
  );
};

export default Home;