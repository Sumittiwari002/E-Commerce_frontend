import { useEffect, useState } from "react";
import axios from "axios";
import CartProductCard from "../components/Product/Cartproductcard";

const Cart = () => {

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("accessToken");
      console.log("ACCESS TOKEN:", token);


  // GET CART
  

  const getCart = async () => {

    try {

      

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


  
  // REMOVE PRODUCT
  

  const handleRemove = async(item) => {
    try {
          const response = await axios.post(
            import.meta.env.VITE_API_NODEPATH + "/api/cart/deleteproductfromcart",
            {
              productId: item.product._id
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

            console.log("Updated cart:", response.data);

            // Fetch the latest cart from the database
            await getCart();

          } 
    catch (error) {
            console.error(
              "Remove Product error:",
              error.response?.data || error.message
            );
        }

  };


  
  // INCREASE
  
const handleIncrease = async (item) => {
  try {
    const response = await axios.post(
      import.meta.env.VITE_API_NODEPATH + "/api/cart/addtocart",
      {
        productId: item.product._id,
        quantity: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Updated cart:", response.data);

    // Fetch the latest cart from the database
    await getCart();

  } catch (error) {
    console.error(
      "Increase quantity error:",
      error.response?.data || error.message
    );
  }
};


  
  // DECREASE
  

  const handleDecrease = async (item) => {
  try {
        await axios.post(
          import.meta.env.VITE_API_NODEPATH + "/api/cart/removefromcart",
          { productId: item.product._id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        await getCart();
      } 
      catch (error) {
        console.error(
          "Decrease error:",
          error.response?.data || error.message
        );
      }
};


  
  // LOADING
  

  if (loading) {

    return (
      <div>
        <h2>Loading cart...</h2>
      </div>
    );

  }


  
  // EMPTY CART
  

  if (cartItems.length === 0) {

    return (
      <div>
        <h2>Your cart is empty</h2>
      </div>
    );

  }


  
  // DISPLAY CART
  

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