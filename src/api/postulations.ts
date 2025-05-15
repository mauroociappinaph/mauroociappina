import { client } from './client';
import { Potulation } from '../types';

// Definir los tipos para las solicitudes
type CreatePostulationRequest = Omit<Potulation, 'id' | 'createdAt' | 'updatedAt'>;
type UpdatePostulationRequest = Partial<Omit<Potulation, 'id' | 'createdAt' | 'updatedAt'>>;

// Servicio para aplicaciones
export const postulationsApi = {
  // Obtener todas las aplicaciones
  getAll: () => client.get<Potulation[]>('/postulations'),

  // Obtener una aplicación por ID
  getById: (id: string) => client.get<Potulation>(`/postulation/${id}`),

  // Crear una nueva aplicación
  create: (data: CreatePostulationRequest) => client.post<Potulation>('/postulation', data),

  // Actualizar una aplicación existente
  update: (id: string, data: UpdatePostulationRequest) =>
    client.put<Potulation>(`/postulation/${id}`, data),

  // Eliminar una aplicación
  delete: (id: string) => client.delete<void>(`/postulation/${id}`),
};
