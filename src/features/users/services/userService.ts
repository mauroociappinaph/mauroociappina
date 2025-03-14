import axios from "axios";

const api = import.meta.env.VITE_API_URL;

console.log(" ------------ API --------", api);

export const updateUserService = async (id: string, userData: object) => {
  try {
    const { data } = await axios.patch(`${api}/user/${id}`, userData);
    console.log(" ------------ data --------", userData);
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
