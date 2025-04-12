import axios from "axios";
import { CreatePostulationDTO, Postulation } from "../types/postulation.types";

const api = import.meta.env.VITE_API_URL;

export const fetchPostulations = async (
  userId: string,
): Promise<Postulation[]> => {
  try {
    const response = await axios.get(`${api}/postulations/user/${userId}`);
    return response.data.result.postulations;
  } catch (error) {
    console.error("Error fetching postulations:", error);
    throw error;
  }
};

export const createPostulation = async (
  postulationData: CreatePostulationDTO,
): Promise<Postulation> => {
  const response = await axios.post(`${api}/postulations`, postulationData);
  return response.data.result;
};

export const getPostulationDetail = async (postId: string) => {
  try {
    const response = await axios.get(`${api}/postulations/${postId}`);
    return response.data.result.postulation;
  } catch (error) {
    console.error("Error fetching postulation detail:", error);
    throw error;
  }
};

export const updatePostulation = async (postulationData: Postulation) => {
  console.log("Updating postulation:", postulationData);
};
