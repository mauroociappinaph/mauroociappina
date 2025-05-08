import React from 'react';
import { Application } from '../types';
import { Edit, Trash2 } from 'lucide-react';

interface ApplicationCardProps {
  application: Application;
  onEdit?: () => void;
  onDelete?: () => void;
}

const statusColors: Record<string, string> = {
  applied: 'bg-blue-100 text-blue-700',
  interview: 'bg-purple-100 text-purple-700',
  technical: 'bg-orange-100 text-orange-700',
  offer: 'bg-teal-100 text-teal-700',
  rejected: 'bg-red-100 text-red-700',
  accepted: 'bg-green-100 text-green-700',
};

const ApplicationCard: React.FC<ApplicationCardProps> = ({ application, onEdit, onDelete }) => {
  const { company, position, status, date } = application;
  const formattedDate = new Date(date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4 transition hover:shadow-xl">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">{company}</h3>
          <p className="text-gray-700 text-base mb-2 truncate">{position}</p>
        </div>
        <span className={`${statusColors[status]} px-3 py-1 rounded-lg text-sm font-medium`}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
      </div>
      <div className="text-gray-500 text-sm mb-4">Aplicado: {formattedDate}</div>
      <div className="flex gap-3 mt-auto">
        <button onClick={onEdit} className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition">
          <Edit className="h-4 w-4" /> Editar
        </button>
        <button onClick={onDelete} className="flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-400 transition">
          <Trash2 className="h-4 w-4" /> Eliminar
        </button>
      </div>
    </div>
  );
};

export default ApplicationCard;
