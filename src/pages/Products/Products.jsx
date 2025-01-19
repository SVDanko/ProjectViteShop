import React from 'react';
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
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
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
        {products.map(product => (
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