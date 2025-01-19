/**
 * Форматирует число в строку с двумя знаками после запятой
 * Используется для форматирования цен в приложении
 * 
 * @param {number} price - цена для форматирования
 * @returns {string} отформатированная цена с двумя знаками после запятой
 * 
 * @example
 * formatPrice(19.9) // returns "19.90"
 * formatPrice(20) // returns "20.00"
 * formatPrice(19.99) // returns "19.99"
 */
export const formatPrice = (price) => {
  return Number(price).toFixed(2);
};
