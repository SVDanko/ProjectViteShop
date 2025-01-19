import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/formatPrice';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="products__loading">Loading...</div>;
  }

  if (error) {
    return <div className="products__error">Error: {error}</div>;
  }

  return (
    <div className="products">
      <h1>Our Products</h1>
      <div className="products__grid">
        {products.map((product) => (
          <div key={product.id} className="products__item">
            <img src={product.image} alt={product.title} className="products__item-image" />
            <h3>{product.title}</h3>
            <p>${formatPrice(product.price)}</p>
            <Link to={`/products/${product.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;