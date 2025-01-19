import React from 'react';
import { useParams } from 'react-router-dom';
import { formatPrice } from '../../utils/formatPrice';

/**
 * Компонент Product - отображает детальную информацию о конкретном товаре
 * 
 * Функциональность:
 * - Получает данные о товаре по ID из URL
 * - Отображает детальную информацию о товаре
 * - Обрабатывает состояния загрузки и ошибок
 */
const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
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
    return <div className="product__error">{error}</div>;
  }

  if (!product) {
    return <div className="product__error">Product not found</div>;
  }

  return (
    <div className="product">
      <h2 className="product__title">{product.title}</h2>
      <img className="product__image" src={product.image} alt={product.title} />
      <p className="product__description">{product.description}</p>
      <p className="product__price">{formatPrice(product.price)}</p>
      <p className="product__category">Category: {product.category}</p>
    </div>
  );
};

export default Product;