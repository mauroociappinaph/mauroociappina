import axios from "axios";
import { Postulation } from "../types";

const api = import.meta.env.VITE_API_URL;

export const fetchPostulations = async (
  userId: string,
): Promise<Postulation[]> => {
  console.log("fetchPostulations", userId);
  try {
    const response = await axios.get(`${api}/postulations/${userId}`);
    return response.data.result.postulations;
  } catch (error) {
    console.error("Error fetching postulations:", error);
    throw error;
  }
};

export const createPostulation = async (postulationData: Postulation) => {
  try {
    const response = await axios.post(`${api}/postulation`, postulationData);
    console.log("createPostulation response", response.data.result);
    return response.data.result;
  } catch (error) {
    console.error("Error creating postulation:", error);
    throw error;
  }
};
