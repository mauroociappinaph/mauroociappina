import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ApplicationState , Application } from '../types/index';


export const useApplicationStore = create<ApplicationState>()(
  persist(
    (set, get) => ({
      applications: [],

      addApplication: (newApplication) => {
        const timestamp = new Date().toISOString();
        const id = crypto.randomUUID();

        const application: Application = {
          ...newApplication,
          id,
          createdAt: timestamp,
          updatedAt: timestamp
        };

        set((state) => ({
          applications: [application, ...state.applications]
        }));

        return id;
      },

      updateApplication: (id, updatedFields) => {
        set((state) => ({
          applications: state.applications.map(app =>
            app.id === id
              ? { ...app, ...updatedFields, updatedAt: new Date().toISOString() }
              : app
          )
        }));
      },

      deleteApplication: (id) => {
        set((state) => ({
          applications: state.applications.filter(app => app.id !== id)
        }));
      },

      getApplication: (id) => {
        return get().applications.find(app => app.id === id);
      },

      checkDuplicate: (company, position) => {
        return get().applications.some(
          app => app.company.toLowerCase() === company.toLowerCase() &&
                app.position.toLowerCase() === position.toLowerCase()
        );
      }
    }),
    {
      name: 'job-applications-storage'
    }
  )
);
