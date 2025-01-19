import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { formatPrice } from '../../utils/formatPrice';

/**
 * Компонент Product - отображает детальную информацию о конкретном товаре
 * 
 * @param {Object} props - пропсы компонента
 * @param {Function} props.addToCart - функция для добавления товара в корзину
 * 
 * Функциональность:
 * - Получает данные о товаре по ID из URL
 * - Отображает детальную информацию о товаре
 * - Позволяет добавить товар в корзину
 * - Обрабатывает состояния загрузки и ошибок
 */
const Product = ({ addToCart }) => {
  // Получение ID товара из URL
  const { id } = useParams();
  
  // Состояние для хранения данных о товаре
  const [product, setProduct] = useState(null);
  // Состояние для отслеживания загрузки
  const [loading, setLoading] = useState(true);
  // Состояние для хранения ошибок
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        setProduct(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
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

  return (
    <div className="product">
      <img src={product.image} alt={product.title} className="product__image" />
      <div className="product__info">
        <h1 className="product__title">{product.title}</h1>
        <p className="product__description">{product.description}</p>
        <p className="product__price">${formatPrice(product.price)}</p>
        <button 
          onClick={() => addToCart(product)} 
          className="product__add-to-cart"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;