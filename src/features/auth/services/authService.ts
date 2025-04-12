import axios from "axios";

const api = import.meta.env.VITE_API_URL;

interface UserData {
  name: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
}

export const loginService = async (email: string, password: string) => {
  const response = await axios.post(`${api}/users/login`, { email, password });
  console.log("response", response.data.result);
  if (response.data.error) {
    throw new Error(response.data.error);
  }

  localStorage.setItem("id", response.data.result.id);

  return response.data.result;
};

export const registerService = async (userData: UserData) => {
  try {
    console.log("userData", userData);
    const { data } = await axios.post(`${api}/register`, userData);
    return data;
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    throw error;
  }
};
