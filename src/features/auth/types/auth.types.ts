export interface User {
  id: string;
  email: string;
  userName: string;
  name: string;
  lastName: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthError {
  error?: string;
  message: string;
} 