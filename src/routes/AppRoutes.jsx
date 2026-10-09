import { BrowserRouter, Routes, Route } from "react-router-dom";

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

const AppRoutes = () => {
  return (
    <BrowserRouter>
    <Provider store={ecomstore}>
      <Header />

        <main className="container">
          <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/newuser" element={<Registration />} />

              <Route element={<ProtectedRoutes />}>
                  <Route path="/home" element={<Home />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/category/add" element={<AddCategory />} />
                  <Route path="/brand/add" element={<AddBrand />} />
                  <Route path="/product/add" element={<AddProduct />} />
                  <Route path="/productdetails/:productid" element={<SingleProduct />} />
              </Route>
          </Routes>
        </main>

      <Footer />
      </Provider>
    </BrowserRouter>
  );
};

export default AppRoutes;