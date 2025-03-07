import { create } from "zustand";

interface UserState {
  userId: string | null;
  userEmail: string | null;
  userUserName: string | null;
  userName: string | null;
  userLastName: string | null;

  setUserId: (id: string) => void;
  setUserEmail: (email: string) => void;
  setUserUserName: (userName: string) => void;
  setUserName: (name: string) => void;
  setUserLastName: (lastName: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  userId: null,
  userEmail: null,
  userUserName: null,
  userName: null,
  userLastName: null,
  setUserId: (id: string) => set({ userId: id }),
  setUserEmail: (email: string) => set({ userEmail: email }),
  setUserUserName: (userName: string) => set({ userUserName: userName }),
  setUserName: (name: string) => set({ userName: name }),
  setUserLastName: (lastName: string) => set({ userLastName: lastName }),
}));
