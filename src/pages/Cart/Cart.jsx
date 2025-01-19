import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatPrice';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart cart--empty">
        <h1>Your Cart is Empty</h1>
        <Link to="/products" className="cart__link">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart">
      <h1>Your Cart</h1>
      <div className="cart__items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart__item">
            <div className="cart__item-info">
              <h3>{item.title}</h3>
              <p>${formatPrice(item.price)}</p>
            </div>
            <div className="cart__item-actions">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="cart__item-button"
              >
                -
              </button>
              <span className="cart__item-quantity">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="cart__item-button"
              >
                +
              </button>
              <button
                onClick={() => removeFromCart(item.id)}
                className="cart__item-button cart__item-button--remove"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart__total">
        <h2>Total: ${formatPrice(getCartTotal())}</h2>
        <button className="cart__checkout">Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
