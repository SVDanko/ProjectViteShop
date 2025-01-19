import React from "react";
import { Router, Route, Link } from "react-router";
import { createBrowserHistory } from "history";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import Products from "./pages/Products/Products";
import Cart from "./pages/Cart/Cart";
import { CartProvider } from "./context/CartContext";

const history = createBrowserHistory();

const App = () => {
  const setActiveLink = (path) => {
    return window.location.pathname === path ? "navbar__item navbar__item-active" : "navbar__item";
  };

  return (
    <CartProvider>
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
                  <Link to="/cart" className={setActiveLink("/cart")}>Cart</Link>
                </li>
              </div>
            </ul>
          </nav>
        </header>
        
        <Route exact path="/" component={Home} />
        <Route exact path="/products" component={Products} />
        <Route path="/products/:id" component={Product} />
        <Route exact path="/cart" component={Cart} />
      </Router>
    </CartProvider>
  );
};

export default App;