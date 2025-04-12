import { useUserStore } from "../../../stores/userStore";
import { User } from "../types/auth.types";

export const useAuth = () => {
  const setUserId = useUserStore((state) => state.setUserId);
  const setUserEmail = useUserStore((state) => state.setUserEmail);
  const setUserUserName = useUserStore((state) => state.setUserUserName);
  const setUserName = useUserStore((state) => state.setUserName);
  const setUserLastName = useUserStore((state) => state.setUserLastName);
  const userId = useUserStore((state) => state.userId);

  const updateUser = (userData: Partial<User>) => {
    if (userData.id) setUserId(userData.id);
    if (userData.email) setUserEmail(userData.email);
    if (userData.userName) setUserUserName(userData.userName);
    if (userData.name) setUserName(userData.name);
    if (userData.lastName) setUserLastName(userData.lastName);
  };

  const isAuthenticated = () => {
    return !!userId || !!localStorage.getItem("id");
  };

  const logout = () => {
    localStorage.removeItem("id");
    setUserId(null);
    setUserEmail(null);
    setUserUserName(null);
    setUserName(null);
    setUserLastName(null);
  };

  return {
    updateUser,
    isAuthenticated,
    logout,
    userId,
  };
};

