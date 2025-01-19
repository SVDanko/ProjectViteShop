import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatPrice';

/**
 * Компонент Cart - отображает корзину покупок
 * 
 * Функциональность:
 * - Отображает список товаров в корзине
 * - Позволяет изменять количество товаров
 * - Позволяет удалять товары из корзины
 * - Показывает общую стоимость заказа
 */
const Cart = () => {
  // Получение функций и данных из контекста корзины
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity,
    clearCart 
  } = useContext(CartContext);

  /**
   * Вычисляет общую стоимость товаров в корзине
   * @returns {number} Общая стоимость
   */
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  /**
   * Обработчик изменения количества товара
   * @param {Object} item - товар
   * @param {number} newQuantity - новое количество
   */
  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(item.id, newQuantity);
    }
  };

  // Если корзина пуста, показываем соответствующее сообщение
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
                onClick={() => handleQuantityChange(item, item.quantity - 1)}
                className="cart__item-button"
              >
                -
              </button>
              <span className="cart__item-quantity">{item.quantity}</span>
              <button
                onClick={() => handleQuantityChange(item, item.quantity + 1)}
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
        <h2>Total: ${formatPrice(calculateTotal())}</h2>
        <button className="cart__checkout">Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
