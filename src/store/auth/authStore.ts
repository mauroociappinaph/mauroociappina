import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState } from '../types';
import { UserWithPassword } from '../types/interface/auth/auth.interface';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      initialize: () => {
        const { user } = get();

        if (user) {
          set({ loading: false });
        }

        console.log('Auth store inicializado', { user, loading: false });
      },
      signIn: async (email: string, password: string) => {
        set({ loading: true });

        try {
          await new Promise(resolve => setTimeout(resolve, 1000));

          const user = API_URL.find((u: UserWithPassword) =>
            u.email === email && u.password === password
          );

          if (!user) {
            set({ loading: false });
            throw new Error('Credenciales inválidas');
          }

          const { password: _password, ...userWithoutPassword } = user;
          set({ user: userWithoutPassword, loading: false });
        } catch (error) {
          set({ loading: false });
          throw error;
        }
      },
      signUp: async (email: string, password: string, name: string) => {
        set({ loading: true });

        try {
          await new Promise(resolve => setTimeout(resolve, 1000));

          if (API_URL.some((u: UserWithPassword) => u.email === email)) {
            set({ loading: false });
            throw new Error('El email ya está registrado');
          }

          const newUser: UserWithPassword = {
            id: crypto.randomUUID(),
            email,
            name,
            password
          };

          API_URL.push(newUser);

          const { password: _password, ...userWithoutPassword } = newUser;
          set({ user: userWithoutPassword, loading: false });
        } catch (error) {
          set({ loading: false });
          throw error;
        }
      },
      signOut: () => {
        set({ user: null, loading: false });
      },
      updateUser: (data: { name?: string; email?: string }) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null
        })),
    }),
    {
      name: 'auth-storage'
    }
  )
);
