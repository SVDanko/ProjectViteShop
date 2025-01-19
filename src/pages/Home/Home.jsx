import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to Our Store</h1>
      <p>Find the best products at the best prices</p>
      <Link to="/products" className="home__cta-button">
        View Our Products
      </Link>
    </div>
  );
};

export default Home;
