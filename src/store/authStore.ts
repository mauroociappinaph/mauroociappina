import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState } from '../types';



// Simulated user database
const MOCK_USERS = [
  {
    id: '1',
    email: 'demo@example.com',
    name: 'Usuario Demo',
    password: 'password123'
  }
];

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

          const user = MOCK_USERS.find(u =>
            u.email === email && u.password === password
          );

          if (!user) {
            set({ loading: false });
            throw new Error('Credenciales inválidas');
          }

          const { password: _, ...userWithoutPassword } = user;
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

          if (MOCK_USERS.some(u => u.email === email)) {
            set({ loading: false });
            throw new Error('El email ya está registrado');
          }

          const newUser = {
            id: crypto.randomUUID(),
            email,
            name,
            password
          };

          MOCK_USERS.push(newUser);

          const { password: _, ...userWithoutPassword } = newUser;
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
