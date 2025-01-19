import React from 'react';
import { Link } from 'react-router';

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to Our Store</h1>
      <Link to="/products" className="home__link">View Products</Link>
    </div>
  );
};

export default Home;
