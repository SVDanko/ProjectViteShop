import React from "react";
import { Route, Routes, NavLink } from "react-router-dom";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import Products from "./pages/Products/Products";
import Cart from "./pages/Cart/Cart";
import { CartProvider } from "./context/CartContext";

const App = () => {
  const setActiveLink = ({ isActive }) => (isActive ? "navbar__item navbar__item-active" : "navbar__item");

  return (
    <CartProvider>
      <header>
        <nav>
          <ul className="navbar">
            <div className="navbar__left">
              <li>
                <NavLink to="/" className={setActiveLink}>Home</NavLink>
              </li>
              <li>
                <NavLink to="/products" className={setActiveLink}>Products</NavLink>
              </li>
            </div>
            <div className="navbar__right">
              <li>
                <NavLink to="/cart" className={setActiveLink}>Cart</NavLink>
              </li>
            </div>
          </ul>
        </nav>
      </header>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </CartProvider>
  );
};

export default App;