export interface User {
  id: string;
  email: string;
  name: string;
}


export interface AuthState {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => void;
  updateUser: (data: { name?: string; email?: string }) => void;
}
