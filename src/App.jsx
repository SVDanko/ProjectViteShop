import React from "react";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import Product from "./pages/Product/Product";

/**
 * Главный компонент приложения
 * 
 * Функциональность:
 * - Управляет навигационным меню
 * - Передает необходимые пропсы в дочерние компоненты
 */
class App extends React.Component {

  render() {
    return (
      <div>
        <header>
          <nav>
            <ul className="navbar">
              <div className="navbar__left">
                <li>
                  <Link to="/" className="navbar__item">Home</Link>
                </li>
                <li>
                  <Link to="/products" className="navbar__item">Products</Link>
                </li>
              </div>
              <div className="navbar__right">
                <li>
                  <span className="navbar__cart">
                    Cart (0)
                  </span>
                </li>
              </div>
            </ul>
          </nav>
        </header>
        
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<Product />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;