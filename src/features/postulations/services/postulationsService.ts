import { Postulation } from "../types";
import axios from "axios";

const api = import.meta.env.VITE_API_URL;

export const fetchPostulations = async (
  userId: string,
): Promise<Postulation[]> => {
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
    const response = await axios.post(`${api}/postulation/`, postulationData);
    return response.data.result;
  } catch (error) {
    console.error("Error creating postulation:", error);
    throw error;
  }
};

export const getPostulationDetail = async (postId: string) => {
  try {
    const response = await axios.get(`${api}/postulation/${postId}`);
    console.log("response", response.data.result);
    return response.data.result.postulation;
  } catch (error) {
    console.error("Error fetching postulation detail:", error);
    throw error;
  }
};

export const updatePostulation = async (postulationData: Postulation) => {};
