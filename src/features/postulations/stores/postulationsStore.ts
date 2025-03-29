import { create } from "zustand";
import { fetchPostulations } from "../services/postulationsService";
import { Postulation } from "../types/postulation.types";

interface PostulationsState {
  postulations: Postulation[];
  loading: boolean;
  error: string | null;
  fetchPostulations: (userId: string) => Promise<void>;
  clearError: () => void;
}

export const usePostulationsStore = create<PostulationsState>((set) => ({
  postulations: [],
  loading: false,
  error: null,
  fetchPostulations: async (userId: string) => {
    set({ loading: true, error: null });
    try {
      const data = await fetchPostulations(userId);
      set({ postulations: data, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : "Error al cargar las postulaciones",
        loading: false 
      });
    }
  },
  clearError: () => set({ error: null }),
}));
