import { create } from "zustand";
import { fetchPostulations } from "../services/postulationsService";

interface Postulation {
  id: string;
  date: string;
  position: string;
  company: string;
  trough: string;
  status: string;
  sendCv: boolean;
  sendEmail: boolean;
}

interface PostulationsState {
  postulations: Postulation[];
  loading: boolean;
  fetchPostulations: (userId: string) => Promise<void>;
}

export const usePostulationsStore = create<PostulationsState>((set) => ({
  postulations: [],
  loading: false,
  fetchPostulations: async (userId: string) => {
    set({ loading: true });
    try {
      const data = await fetchPostulations(userId);
      set({ postulations: data });
    } catch (error) {
      console.error("Error fetching postulations:", error);
    } finally {
      set({ loading: false });
    }
  },
}));

