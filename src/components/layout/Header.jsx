import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="site-header">
      <div className="container header-wrapper">

        <div className="logo">
          <NavLink to="/">ShopEase</NavLink>
        </div>

        <nav aria-label="Main Navigation">
          <ul className="nav-links">

            <li>
              <NavLink to="/">Home</NavLink>
            </li>

            <li>
              <NavLink to="/cart">Cart</NavLink>
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
              <NavLink to="/login">
                Login
              </NavLink>
            </li>

            <li>
              <NavLink to="/newuser">
                New User?
              </NavLink>
            </li>

          </ul>
        </nav>

      </div>
    </header>
  );
};

export default Header;