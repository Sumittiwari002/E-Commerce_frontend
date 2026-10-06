import CartProductCard from "../components/Product/Cartproductcard";
import "../assets/style/Cart.css";

const Cart = () => {
  const cartProducts = [
    {
      id: 1,
      productName: "iPhone 16 Pro",
      brand: "Apple",
      category: "Mobiles",
      productPrice: 119999,
      quantity: 1,
      image: "https://picsum.photos/200?1",
    },
    {
      id: 2,
      productName: "Sony Headphones",
      brand: "Sony",
      category: "Electronics",
      productPrice: 15999,
      quantity: 2,
      image: "https://picsum.photos/200?2",
    },
  ];

  const totalItems = cartProducts.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const totalPrice = cartProducts.reduce(
    (acc, item) => acc + item.productPrice * item.quantity,
    0
  );

  const deliveryCharge = 99;

  const grandTotal = totalPrice + deliveryCharge;

  return (
    <section className="cart-page">

      <div className="cart-products">

        {cartProducts.map((item) => (
          <CartProductCard
            key={item.id}
            product={item}
          />
        ))}

      </div>

      <aside className="bill-card">

        <h3>Price Details</h3>

        <div className="bill-row">
          <span>Total Items</span>
          <span>{totalItems}</span>
        </div>

        <div className="bill-row">
          <span>Subtotal</span>
          <span>₹ {totalPrice}</span>
        </div>

        <div className="bill-row">
          <span>Delivery</span>
          <span>₹ {deliveryCharge}</span>
        </div>

        <hr />

        <div className="bill-row total">
          <span>Total Amount</span>
          <span>₹ {grandTotal}</span>
        </div>

        <button className="checkout-btn">
          Proceed To Checkout
        </button>

      </aside>

    </section>
  );
};

export default Cart;