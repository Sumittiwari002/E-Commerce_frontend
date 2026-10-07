import { useEffect, useState } from "react";
import axios from "axios";
import CartProductCard from "../components/Product/Cartproductcard";

const Cart = () => {

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);


  // ==========================
  // GET CART
  

  const getCart = async () => {

    try {

      const token = localStorage.getItem("accessToken");
      console.log("ACCESS TOKEN:", token);

      if (!token) {
        alert("Please login first");
        return;
      }

      const response = await axios.get(
        import.meta.env.VITE_API_NODEPATH +
        "/api/cart/getcart",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Cart response:", response.data);

      if (response.data.success) {

        setCartItems(
          response.data.cart.items || []
        );

      }

    } catch (error) {

      console.error(
        "Get cart error:",
        error
      );

      console.error(
        error.response?.data
      );

    } finally {

      setLoading(false);

    }
  };
  
  // LOAD CART
  

  useEffect(() => {

    getCart();

  }, []);


  // ==========================
  // REMOVE PRODUCT
  // ==========================

  const handleRemove = (item) => {

    console.log(
      "Remove product:",
      item.product._id
    );

  };


  // ==========================
  // INCREASE
  // ==========================

  const handleIncrease = (item) => {

    console.log(
      "Increase:",
      item.product._id
    );

  };


  // ==========================
  // DECREASE
  // ==========================

  const handleDecrease = (item) => {

    console.log(
      "Decrease:",
      item.product._id
    );

  };


  // ==========================
  // LOADING
  // ==========================

  if (loading) {

    return (
      <div>
        <h2>Loading cart...</h2>
      </div>
    );

  }


  // ==========================
  // EMPTY CART
  // ==========================

  if (cartItems.length === 0) {

    return (
      <div>
        <h2>Your cart is empty</h2>
      </div>
    );

  }


  // ==========================
  // DISPLAY CART
  // ==========================

  return (

    <div className="cart-container">

      <h1>
        My Cart
      </h1>


      {cartItems.map((item) => (

        <CartProductCard
          key={item.product._id}
          item={item}
          onRemove={handleRemove}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
        />

      ))}

    </div>

  );
};

export default Cart;