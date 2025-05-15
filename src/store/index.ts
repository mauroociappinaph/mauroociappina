/**
 * Punto de entrada para los stores de la aplicación
 * Exporta todos los stores organizados por dominio
 */

// Importar stores
import { useAuthStore } from './auth/authStore';
import { usePotulationsStore } from './potulations/potulationsStore';

// Exportar stores individuales
export { useAuthStore, usePotulationsStore };

// Exportar grupos con alias para mayor claridad en importaciones
import * as AuthStore from './auth/authStore';
import * as PotulationsStore from './potulations/potulationsStore';

// Exportar los grupos completos
export {
  AuthStore,
  PotulationsStore
};

// You can also export types if needed here
