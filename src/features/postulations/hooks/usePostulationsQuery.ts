import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Postulation } from '../types/postulation.types';
import { createPostulation, fetchPostulations } from '../services/postulationsService';

export const usePostulationsQuery = (userId: string | undefined) => {
  const queryClient = useQueryClient();

  const { data: postulations, isLoading, isError, error } = useQuery<Postulation[]>({
    queryKey: ['postulations', userId],
    queryFn: () => {
      if (!userId) throw new Error('Usuario no autenticado');
      return fetchPostulations(userId);
    },
    enabled: !!userId, // Solo ejecuta la query si hay un userId
    staleTime: 5 * 60 * 1000, // Datos frescos por 5 minutos
    gcTime: 30 * 60 * 1000 // Mantener en caché por 30 minutos
  });

  const createPostulationMutation = useMutation({
    mutationFn: createPostulation,
    onMutate: async (newPostulation) => {
      // Cancela queries en curso
      await queryClient.cancelQueries({ queryKey: ['postulations', userId] });
      
      // Guarda el estado anterior
      const previousPostulations = queryClient.getQueryData(['postulations', userId]);
      
      // Actualiza optimistamente
      queryClient.setQueryData(['postulations', userId], (old: Postulation[] = []) => 
        [...old, newPostulation]
      );
      
      return { previousPostulations };
    },
    onError: (err, newPostulation, context) => {
      // Revertir en caso de error
      queryClient.setQueryData(['postulations', userId], context?.previousPostulations);
    }
  });

  return {
    postulations: postulations || [],
    isLoading,
    isError,
    error,
    createPostulation: createPostulationMutation.mutate
  };
}; 