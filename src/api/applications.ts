import { client } from './client';
import { Application } from '../types';

// Definir los tipos para las solicitudes
type CreateApplicationRequest = Omit<Application, 'id' | 'createdAt' | 'updatedAt'>;
type UpdateApplicationRequest = Partial<Omit<Application, 'id' | 'createdAt' | 'updatedAt'>>;

// Servicio para aplicaciones
export const applicationsApi = {
  // Obtener todas las aplicaciones
  getAll: () => client.get<Application[]>('/applications'),

  // Obtener una aplicación por ID
  getById: (id: string) => client.get<Application>(`/applications/${id}`),

  // Crear una nueva aplicación
  create: (data: CreateApplicationRequest) => client.post<Application>('/applications', data),

  // Actualizar una aplicación existente
  update: (id: string, data: UpdateApplicationRequest) =>
    client.put<Application>(`/applications/${id}`, data),

  // Eliminar una aplicación
  delete: (id: string) => client.delete<void>(`/applications/${id}`),
};
