/**
 * Utilitaire pour concaténer les noms de classes CSS de manière conditionnelle
 * @param  {...string} classes - Les classes CSS à combiner
 * @returns {string} - La chaîne de classes CSS combinées
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Formate une valeur numérique en valeur monétaire
 * @param {number} value - La valeur à formater
 * @param {string} currency - Le code de la devise (par défaut: 'EUR')
 * @returns {string} - La valeur formatée
 */
export function formatCurrency(value, currency = 'EUR') {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: currency
  }).format(value);
}

/**
 * Formate une date en format français
 * @param {Date|string} date - La date à formater
 * @returns {string} - La date formatée
 */
export function formatDate(date) {
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date));
}

/**
 * Tronque un texte à une longueur maximale
 * @param {string} text - Le texte à tronquer
 * @param {number} maxLength - La longueur maximale
 * @returns {string} - Le texte tronqué
 */
export function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
}

