import "./CartproductCard.css";

const CartProductCard = ({ product }) => {
  return (
    <article className="cart-card">

      <div className="cart-image">
        <img
          src={product.image}
          alt={product.productName}
        />
      </div>

      <div className="cart-content">

        <h3>{product.productName}</h3>

        <p className="brand">
          Brand : <span>{product.brand}</span>
        </p>

        <p className="category">
          Category : <span>{product.category}</span>
        </p>

        <p className="price">
          ₹ {product.productPrice}
        </p>

        <div className="quantity-box">

          <button>-</button>

          <span>{product.quantity}</span>

          <button>+</button>

        </div>

      </div>

      <div className="cart-actions">

        <button className="remove-btn">
          Remove
        </button>

      </div>

    </article>
  );
};

export default CartProductCard;
