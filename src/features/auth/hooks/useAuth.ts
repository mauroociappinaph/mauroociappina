import { useAuthStore } from "../stores/authStore";
import { User } from "../types/auth.types";

export const useAuth = () => {
  const { user, setUser, login, logout } = useAuthStore();

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  const isAuthenticated = () => {
    return !!user?.id || !!localStorage.getItem("id");
  };

  return {
    updateUser,
    isAuthenticated,
    logout,
    userId: user?.id,
  };
};

