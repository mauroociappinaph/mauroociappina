/**
 * Helpers para manipulación de strings
 * Funciones útiles para el formato, transformación y validación de cadenas
 */

/**
 * Obtiene las iniciales de un nombre (máximo 2 caracteres)
 * @param name - El nombre del que obtener las iniciales
 * @returns Iniciales en mayúsculas
 */
export const getInitials = (name: string): string => {
  if (!name || typeof name !== 'string') return '';

  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

/**
 * Capitaliza la primera letra de cada palabra en una cadena
 * @param text - El texto a capitalizar
 * @returns El texto con la primera letra de cada palabra en mayúsculas
 */
export const capitalizeWords = (text: string): string => {
  if (!text) return '';

  return text
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Trunca un texto a una longitud máxima y añade puntos suspensivos si es necesario
 * @param text - El texto a truncar
 * @param maxLength - La longitud máxima (por defecto 100)
 * @returns El texto truncado
 */
export const truncateText = (text: string, maxLength: number = 100): string => {
  if (!text) return '';
  if (text.length <= maxLength) return text;

  return text.substring(0, maxLength) + '...';
};

/**
 * Convierte un texto a slug (para URLs amigables)
 * @param text - El texto a convertir en slug
 * @returns El texto convertido en slug
 */
export const slugify = (text: string): string => {
  if (!text) return '';

  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Elimina acentos
    .replace(/[^\w\s-]/g, '') // Elimina caracteres especiales
    .replace(/\s+/g, '-') // Reemplaza espacios con guiones
    .replace(/-+/g, '-') // Elimina guiones consecutivos
    .trim();
};

/**
 * Elimina los espacios adicionales en un texto
 * @param text - El texto a normalizar
 * @returns El texto con espacios normalizados
 */
export const normalizeSpaces = (text: string): string => {
  if (!text) return '';
  return text.replace(/\s+/g, ' ').trim();
};
