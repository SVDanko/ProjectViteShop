import React, { createContext, useContext, useState, useCallback } from 'react';

/**
 * Контекст для управления корзиной покупок
 * @type {React.Context}
 */
const CartContext = createContext();

/**
 * Хук для использования контекста корзины
 * 
 * @returns {Object} контекст корзины
 */
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

/**
 * Провайдер контекста корзины
 * Предоставляет функционал для работы с корзиной покупок
 * 
 * @param {Object} props - свойства компонента
 * @param {React.ReactNode} props.children - дочерние компоненты
 */
export const CartProvider = ({ children }) => {
  // Состояние для хранения товаров в корзине
  const [cartItems, setCartItems] = useState([]);

  /**
   * Добавляет товар в корзину
   * Если товар уже есть в корзине, увеличивает его количество
   * 
   * @param {Object} product - товар для добавления
   */
  const addToCart = useCallback((product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prevItems, { ...product, quantity: 1 }];
    });
  }, []);

  /**
   * Удаляет товар из корзины
   * 
   * @param {number} productId - ID товара для удаления
   */
  const removeFromCart = useCallback((productId) => {
    setCartItems(prevItems => 
      prevItems.filter(item => item.id !== productId)
    );
  }, []);

  /**
   * Обновляет количество товара в корзине
   * 
   * @param {number} productId - ID товара
   * @param {number} newQuantity - новое количество
   */
  const updateQuantity = useCallback((productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  }, []);

  /**
   * Возвращает общую стоимость товаров в корзине
   * 
   * @returns {number} общая стоимость
   */
  const getCartTotal = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

  // Значение контекста, предоставляемое потребителям
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartTotal
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
