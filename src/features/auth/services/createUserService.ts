import axios from "axios";

const api = import.meta.env.VITE_API_URL;

export const createUserService = async (userData: object) => {
  try {
    const { data } = await axios.post(`${api}/users`, userData);
    if (data) {
      return "Ok";
    } else {
      return " No Data retuned";
    }
  } catch (error) {
    console.error("Error in create User");
    throw error;
  }
};
