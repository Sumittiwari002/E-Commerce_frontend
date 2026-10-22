import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import AddCategory from "../pages/AddCategory";
import AddBrand from "../pages/AddBrand";
import AddProduct from "../pages/AddProduct";
import SingleProduct from "../pages/SingleProduct";
import { Provider } from 'react-redux'
import ecomstore  from "../redux/ecomstore";
import Registration from "../pages/Registration";
import ProtectedRoutes from "./ProtectedRoutes";
import WishlistItems from "../components/Product/WishlistItems";
import Logout from "../pages/Logout";
import AdminRoutes from "./AdminRoutes";
import { AuthProvider } from "../context/AuthContext";
import AdminLayout from "../components/admin/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import Products from "../pages/admin/Products";
import Categories from "../pages/admin/Categories";
import Brands from "../pages/admin/Brands";

// Admin pages get the sidebar layout instead of the storefront Header/Footer

const ADMIN_PATHS = ["/admin", "/products", "/categories", "/brands", "/category/add", "/brand/add", "/product/add"];



const Shell = () => {
  const { pathname } = useLocation();
  const isAdminArea = ADMIN_PATHS.some((path) =>
    pathname === path || pathname.startsWith(`${path}/`)
);

  return ( 
    <>
      {!isAdminArea && <Header />}
      <main className={isAdminArea ? "" : "container"}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/newuser" element={<Registration />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/home" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<WishlistItems />} />
            <Route path="/productdetails/:productid" element={<SingleProduct />} />
            <Route path="/logout" element={<Logout />} />


            <Route element={<AdminRoutes />}>
              <Route element={<AdminLayout />}>
                <Route path="/admin" element={<Dashboard />} />
                <Route path="/category/add" element={<AddCategory />} />
                <Route path="/brand/add" element={<AddBrand />} />
                <Route path="/product/add" element={<AddProduct />} />
                <Route path="/products" element={<Products />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/brands" element={<Brands/>} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </main>
      {!isAdminArea && <Footer />}
    </>
  );
};

const AppRoutes = () => (
  <BrowserRouter>
    <AuthProvider>
      <Provider store={ecomstore}>
        <Shell />
      </Provider>
    </AuthProvider>
  </BrowserRouter>
);

export default AppRoutes;
