import axios from "axios";
import { CreatePostulationDTO, Postulation } from "../types/postulation.types";

const api = import.meta.env.VITE_API_URL;

export const fetchPostulations = async (
  userId: string,
): Promise<Postulation[]> => {
  const response = await axios.get(`${api}/postulations/${userId}`);
  return response.data.result.postulations;
};

export const createPostulation = async (
  postulationData: CreatePostulationDTO,
): Promise<Postulation> => {
  const response = await axios.post(`${api}/postulation`, postulationData);
  return response.data.result;
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
