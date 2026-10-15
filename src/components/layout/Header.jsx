import { NavLink } from "react-router-dom";
import "./Header.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Header = () => {

  const token = localStorage.getItem("accessToken");
  const [name, setName] = useState();

  useEffect(()=>{

    axios.get(import.meta.env.VITE_API_NODEPATH + "/api/user/profile", {
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    .then(res=>{
      console.log(res.data.data.user.name);
      setName(res.data.data.user.name);
    })
    .catch(err=>{
      console.error(err);
    })

  },[]);

  return (
    <header className="site-header">
      <div className="container header-wrapper">

        <div className="logo">
          <NavLink to="/home">ShopEase</NavLink>
        </div>

        <nav aria-label="Main Navigation">
          <ul className="nav-links">

            <li>
              <NavLink to="/home">Home</NavLink>
            </li>

            <li>
              <NavLink to="/cart">Cart</NavLink>
            </li>

            <li>
              <NavLink to="/wishlist">Wishlist</NavLink>
            </li>

            <li>
              <NavLink to="/category/add">
                Add Category
              </NavLink>
            </li>

            <li>
              <NavLink to="/brand/add">
                Add Brand
              </NavLink>
            </li>

            <li>
              <NavLink to="/product/add">
                Add Product
              </NavLink>
            </li>

            <li>
              <NavLink to="/">
                Login
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/newuser" className="username-link">
                <i className="bi bi-person-circle"></i>
                <span>{name }</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/logout">Logout</NavLink>
            </li>

          </ul>
        </nav>

      </div>
    </header>
  );
};

export default Header;