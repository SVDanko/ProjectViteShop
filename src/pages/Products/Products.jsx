import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/formatPrice';

/**
 * Компонент Products - отображает список всех доступных товаров
 * 
 * Функциональность:
 * - Загружает данные о товарах с API
 * - Отображает товары в виде сетки
 * - Обрабатывает состояния загрузки и ошибок
 * - Предоставляет навигацию к детальной странице товара
 */
const Products = () => {
  // Состояние для хранения списка товаров
  const [products, setProducts] = useState([]);
  // Состояние для отслеживания процесса загрузки
  const [loading, setLoading] = useState(true);
  // Состояние для хранения ошибок
  const [error, setError] = useState(null);

  // Загрузка данных при монтировании компонента
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

  // Отображение состояния загрузки
  if (loading) {
    return <div className="products__loading">Loading...</div>;
  }

  // Отображение ошибки, если она есть
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