import "./Cartproductcard.css";

const CartProductCard = ({ item, onRemove, onIncrease, onDecrease }) => {
  const product = item.product;

  return (
    <article className="cart-card">

      {/* Product Image */}
      <div className="cart-image">
        <img
          src={import.meta.env.VITE_API_NODEPATH + product.path}
          alt={product.name}
        />
      </div>

      {/* Product Information */}
      <div className="cart-content">

        <h3>{product.name}</h3>

        <p className="brand">
          Brand :{" "}
          <span>
            {product.brandId?.name || "N/A"}
          </span>
        </p>

        <p className="category">
          Category :{" "}
          <span>
            {product.categoryId?.name || "N/A"}
          </span>
        </p>

        <p className="price">
          ₹ {product.price}
        </p>

        {/* Quantity */}
        <div className="quantity-box">

          <button
            onClick={() => onDecrease(item)}
            disabled={item.quantity <= 1}
          >
            -
          </button>

          <span>{item.quantity}</span>

          <button onClick={() => onIncrease(item)}>
            +
          </button>

        </div>

      </div>

      {/* Remove */}
      <div className="cart-actions">

        <button
          className="remove-btn"
          onClick={() => onRemove(item)}
        >
          Remove
        </button>

      </div>

    </article>
  );
};

export default CartProductCard;