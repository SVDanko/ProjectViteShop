import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatPrice';

const Product = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="product__loading">Loading...</div>;
  }

  if (error) {
    return <div className="product__error">Error: {error}</div>;
  }

  if (!product) {
    return <div className="product__error">Product not found</div>;
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="product">
      <Link to="/products" className="product__back">← Back to Products</Link>
      <div className="product__content">
        <div className="product__image-container">
          <img src={product.image} alt={product.title} className="product__image" />
        </div>
        <div className="product__info">
          <h1>{product.title}</h1>
          <p className="product__price">${formatPrice(product.price)}</p>
          <p className="product__description">{product.description}</p>
          <p className="product__category">Category: {product.category}</p>
          <button onClick={handleAddToCart} className="product__add-to-cart">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;