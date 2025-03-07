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
  const response = await axios.get(
    `${api}/login?email=${email}&password=${password}`,
  );

  if (response.data.error) {
    throw new Error(response.data.error);
  }

  return response.data;
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
