import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PotulationState , Potulation } from '../types/index';



export const usePotulationsStore = create<PotulationState>()(
  persist(
    (set, get) => ({
      potulations: [],

      addPotulation: (newPotulation) => {
        const timestamp = new Date().toISOString();
        const id = crypto.randomUUID();

        const potulation: Potulation = {
          ...newPotulation,
          id,
          createdAt: timestamp,
          updatedAt: timestamp
        };

        set((state) => ({
          potulations: [potulation, ...state.potulations]
        }));

        return id;
      },

      updatePotulation: (id, updatedFields) => {
        set((state) => ({
          potulations: state.potulations.map(app =>
            app.id === id
              ? { ...app, ...updatedFields, updatedAt: new Date().toISOString() }
              : app
          )
        }));
      },

      deletePotulation: (id) => {
        set((state) => ({
          potulations: state.potulations.filter(app => app.id !== id)
        }));
      },

      getPotulation: (id) => {
        return get().potulations.find(app => app.id === id);
      },

      checkDuplicate: (company, position) => {
        return get().potulations.some(
          app => app.company.toLowerCase() === company.toLowerCase() &&
                app.position.toLowerCase() === position.toLowerCase()
        );
      }
    }),
    {
        name: 'job-potulations-storage'
    }
  )
);
