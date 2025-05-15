import { User } from './authStore.interface';

/**
 * Interfaces para las solicitudes de autenticación
 */

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface UserWithPassword extends User {
  password: string;
}
