import { NavLink } from "react-router-dom";
import "./Header.css";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { user, isAuthenticated, isAdmin } = useAuth();

  return (
    <header className="site-header">
      <div className="container header-wrapper">

        <div className="logo">
          <NavLink to={isAuthenticated ? "/home" : "/"}>ShopEase</NavLink>
        </div>

        <nav aria-label="Main Navigation">
          <ul className="nav-links">

            {!isAuthenticated && (
              <>
                <li>
                  <NavLink to="/">Login</NavLink>
                </li>

                <li>
                  <NavLink to="/newuser">Register</NavLink>
                </li>
              </>
            )}

            {/* Logged in (admin + normal user) */}
            {isAuthenticated && (
              <>
                <li>
                  <NavLink to="/home">Home</NavLink>
                </li>

                <li>
                  <NavLink to="/cart">Cart</NavLink>
                </li>

                <li>
                  <NavLink to="/wishlist">Wishlist</NavLink>
                </li>
              </>
            )}

            {isAdmin && (
              <>
                <li>
                  <NavLink to="/admin">Dashboard</NavLink>
                </li>
                {/* <li>
                  <NavLink to="/category/add">Add Category</NavLink>
                </li>

                <li>
                  <NavLink to="/brand/add">Add Brand</NavLink>
                </li>

                <li>
                  <NavLink to="/product/add">Add Product</NavLink>
                </li> */}
              </>
            )}

            {isAuthenticated && (
              <>
                <li className="nav-item">
                  <span className="username-link">
                    <i className="bi bi-person-circle"></i>
                    <span>{user?.name}</span>
                  </span>
                </li>

                <li>
                  <NavLink to="/logout">Logout</NavLink>
                </li>
              </>
            )}

          </ul>
        </nav>

      </div>
    </header>
  );
};

export default Header;
