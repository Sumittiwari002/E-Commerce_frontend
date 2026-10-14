// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import WishlistItems from "../components/Product/WishlistItems";


// const Wishlist = () => {

//   const [wishlists, setWishlists] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   const token = localStorage.getItem("accessToken");
//       // console.log("ACCESS TOKEN:", token);


//   // GET CART
  

// const getWishlist = async () => {
//   try {
//     if (!token) {
//       navigate("/");
//       return;
//     }

//     const response = await axios.get(
//       `${import.meta.env.VITE_API_NODEPATH}/api/cart/getwishlist`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     console.log("Wishlist response:", response.data);

//     if (response.data.success) {
//       setWishlists(response.data.wishlist?.items || []);
//     }
//   } catch (error) {
//     console.error(
//       "Get wishlist error:",
//       error.response?.data || error.message
//     );
//   } finally {
//     setLoading(false);
//   }
// };
  
//   // LOAD CART
  

//   useEffect(() => {

// //      axios.post(import.meta.env.VITE_API_NODEPATH + "/api/auth/authtoken", {},
// //     {
// //       headers: 
// //       {
// //         Authorization:`Bearer ${token}`
// //       }
// //     }
// //    )
// //    .then(res=>{
// //     console.log(res);
// //    })
// //    .catch(error=>{
// //     console.log(error.message);
// //     // alert("Please Login Again");
// //     navigate("/");
    
// //    });

//     getWishlist();

//   }, []);

  
//   // LOADING

//   if (loading) {

//     return (
//       <div>
//         <h2>Loading cart...</h2>
//       </div>
//     );

//   }


  
//   // EMPTY CART

//   if (wishlists.length === 0) {

//     return (
//       <div>
//         <h2>Your wishlist is empty</h2>
//       </div>
//     );

//   }


  
//   // DISPLAY CART

//   return (

//     <div className="cart-container">

//       <h1>My WishList</h1>


//       {wishlists.map((item) => (

//         <WishlistItems
//           key={item.product._id}
//           item={item}
//         />

//       ))}

//     </div>

//   );
// };

// export default Wishlist;