import React, { useState } from 'react';
import { Application } from '../types';
import { Edit, Trash2, Calendar, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApplicationStore } from '../store';
import { APP_COLORS } from '../styles/colors';
import Modal from './Modal';

interface ApplicationCardProps {
  application: Application;
}

// Colores para las etiquetas de estado
const statusColors: Record<string, string> = {
  applied: 'bg-blue-100 text-blue-700',
  interview: 'bg-purple-100 text-purple-700',
  technical: 'bg-orange-100 text-orange-700',
  offer: 'bg-teal-100 text-teal-700',
  rejected: 'bg-red-100 text-red-700',
  accepted: 'bg-green-100 text-green-700',
};

const ApplicationCard: React.FC<ApplicationCardProps> = ({ application }) => {
  const navigate = useNavigate();
  const { deleteApplication } = useApplicationStore();
  const { id, company, position, status, date, notes } = application;
  const formattedDate = new Date(date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const confirmDelete = () => {
    deleteApplication(id);
    closeDeleteModal();
  };

  const getInitials = (companyName: string) => {
    return companyName.split(' ').map(word => word[0]).join('').toUpperCase().substring(0, 2);
  };

  // Traducir estado a español para mostrar
  const getStatusLabel = (status: string) => {
    const statusLabels: Record<string, string> = {
      applied: 'Aplicado',
      interview: 'Entrevista',
      technical: 'Prueba Técnica',
      offer: 'Oferta',
      rejected: 'Rechazado',
      accepted: 'Aceptado'
    };
    return statusLabels[status] || status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <>
      <div
        className="rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
        style={{ backgroundColor: APP_COLORS.cardColors[status as keyof typeof APP_COLORS.cardColors] || 'white' }}
      >
        <div className="p-6">
          <div className="flex items-start mb-4">
            <div
              className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mr-4"
              style={{ background: APP_COLORS.blueGradient }}
            >
              {getInitials(company)}
            </div>
            <div className="flex-grow">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{company}</h3>
              <p className="text-gray-700">{position}</p>
            </div>
            <div>
              <span className={`${statusColors[status]} px-3 py-1 rounded-full text-sm font-medium`}>
                {getStatusLabel(status)}
              </span>
            </div>
          </div>

          <div className="flex items-center text-gray-500 text-sm mb-3">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Aplicado: {formattedDate}</span>
          </div>

          {notes && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{notes}</p>
          )}
        </div>

        <div className="border-t border-gray-100 bg-white/60 backdrop-blur-sm px-6 py-3 flex justify-end">
          <div className="flex gap-2">
            <button
              onClick={handleEdit}
              className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              <Edit className="h-4 w-4" /> Editar
            </button>
            <button
              onClick={openDeleteModal}
              className="flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-800 ml-4"
            >
              <Trash2 className="h-4 w-4" /> Eliminar
            </button>
          </div>
        </div>
      </div>

      {/* Modal de confirmación para eliminar */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        title="Confirmar Eliminación"
      >
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-0.5">
              <AlertTriangle className="h-6 w-6 text-red-500" />
            </div>
            <div className="ml-3">
              <h3 className="text-base font-medium text-gray-900">
                ¿Estás seguro de que deseas eliminar esta postulación?
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Esta acción no se puede deshacer. Se eliminará permanentemente la postulación para
                <span className="font-semibold"> {company}</span> como <span className="font-semibold">{position}</span>.
              </p>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-4">
            <button
              type="button"
              onClick={closeDeleteModal}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={confirmDelete}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Eliminar
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ApplicationCard;
