import React, { useState } from "react";
import { Router, Route, Link } from "react-router";
import { createBrowserHistory } from "history";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import Products from "./pages/Products/Products";
import Cart from "./pages/Cart/Cart";

const history = createBrowserHistory();

/**
 * Главный компонент приложения
 * 
 * Функциональность:
 * - Управляет маршрутизацией приложения
 * - Содержит логику работы с корзиной
 * - Отображает навигационное меню
 * - Передает необходимые пропсы в дочерние компоненты
 */
const App = () => {
  // Состояние корзины: массив товаров с их количеством
  const [cartItems, setCartItems] = useState([]);

  /**
   * Добавляет товар в корзину
   * Если товар уже есть в корзине, увеличивает его количество
   * @param {Object} product - товар для добавления
   * @param {string} product.id - уникальный идентификатор товара
   * @param {string} product.title - название товара
   * @param {number} product.price - цена товара
   */
  const addToCart = (product) => {
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
  };

  /**
   * Удаляет товар из корзины
   * @param {string} productId - ID товара для удаления
   */
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  /**
   * Обновляет количество товара в корзине
   * @param {string} productId - ID товара
   * @param {number} newQuantity - новое количество товара
   */
  const updateQuantity = (productId, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  /**
   * Определяет активную ссылку в навигации
   * @param {string} path - путь для проверки
   * @returns {string} - класс для стилизации ссылки
   */
  const setActiveLink = (path) => {
    return window.location.pathname === path ? "navbar__item navbar__item-active" : "navbar__item";
  };

  return (
    <Router history={history}>
      <header>
        <nav>
          <ul className="navbar">
            <div className="navbar__left">
              <li>
                <Link to="/" className={setActiveLink("/")}>Home</Link>
              </li>
              <li>
                <Link to="/products" className={setActiveLink("/products")}>Products</Link>
              </li>
            </div>
            <div className="navbar__right">
              <li>
                <Link to="/cart" className={setActiveLink("/cart")}>
                  Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
                </Link>
              </li>
            </div>
          </ul>
        </nav>
      </header>
      
      <Route exact path="/" component={() => <Home />} />
      <Route exact path="/products" component={() => <Products />} />
      <Route path="/products/:id" component={() => <Product addToCart={addToCart} />} />
      <Route exact path="/cart" component={() => 
        <Cart 
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
        />
      } />
    </Router>
  );
};

export default App;