import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatPrice';

/**
 * Компонент Product - отображает детальную информацию о конкретном товаре
 * 
 * Функциональность:
 * - Получает данные о товаре по ID из URL
 * - Отображает детальную информацию о товаре
 * - Позволяет добавить товар в корзину
 * - Обрабатывает состояния загрузки и ошибок
 */
const Product = () => {
  // Получение ID товара из URL
  const { id } = useParams();
  
  // Получение функции добавления в корзину из контекста
  const { addToCart } = useContext(CartContext);
  
  // Состояния компонента
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загрузка данных о товаре при монтировании компонента
  useEffect(() => {
    fetchProduct();
  }, [id]);

  /**
   * Получает данные о товаре с API
   * Обновляет состояния product, loading и error
   */
  const fetchProduct = async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      if (!response.ok) {
        throw new Error('Product not found');
      }
      const data = await response.json();
      setProduct(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  /**
   * Обработчик добавления товара в корзину
   * @param {Object} product - товар для добавления в корзину
   */
  const handleAddToCart = (product) => {
    addToCart(product);
  };

  // Отображение состояния загрузки
  if (loading) {
    return <div>Loading...</div>;
  }

  // Отображение ошибки, если она есть
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Отображение информации о товаре
  if (!product) {
    return <div>Product not found</div>;
  }

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
          <button onClick={() => handleAddToCart(product)} className="product__add-to-cart">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;