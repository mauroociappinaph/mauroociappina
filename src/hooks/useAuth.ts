import { useUserStore } from "../stores/userStore.ts";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const setUserId = useUserStore((state) => state.setUserId);
  const setUserEmail = useUserStore((state) => state.setUserEmail);
  const setUserUserName = useUserStore((state) => state.setUserUserName);
  const setUserName = useUserStore((state) => state.setUserName);
  const setUserLastName = useUserStore((state) => state.setUserLastName);

  const updateUser = (userData: {
    id?: string;
    email?: string;
    userName?: string;
    name?: string;
    lastName?: string;
  }) => {
    if (userData.id) setUserId(userData.id);
    if (userData.email) setUserEmail(userData.email);
    if (userData.userName) setUserUserName(userData.userName);
    if (userData.name) setUserName(userData.name);
    if (userData.lastName) setUserLastName(userData.lastName);
  };

  return { updateUser };
};

export const useAuthRedirect = () => {
  const navigate = useNavigate();
  const userId = useUserStore((state) => state.userId);

  useEffect(() => {
    if (userId) {
      navigate("/postulations");
    }
  }, [userId, navigate]);
};
