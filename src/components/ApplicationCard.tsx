import React from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, ExternalLink } from 'lucide-react';
import { Application } from '../types/index';
import StatusBadge from './StatusBadge';
import { useApplicationStore } from '../store';

interface ApplicationCardProps {
  application: Application;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({ application }) => {
  const { deleteApplication } = useApplicationStore();
  const { id, company, position, status, date, url } = application;

  const formattedDate = new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta postulación?')) {
      deleteApplication(id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{position}</h3>
            <p className="text-gray-600 font-medium">{company}</p>
          </div>
          <StatusBadge status={status} />
        </div>

        <div className="mt-4 flex items-center text-sm text-gray-500">
          <span>Aplicado: {formattedDate}</span>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div className="flex space-x-2">
            <Link
              to={`/edit/${id}`}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Edit className="h-4 w-4 mr-1" />
              Editar
            </Link>
            <button
              onClick={handleDelete}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Eliminar
            </button>
          </div>

          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              Ver anuncio
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationCard;
