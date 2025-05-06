import React from 'react';
import { ApplicationStatus, STATUS_LABELS } from '../types/index';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface FilterSelectsProps {
  statusFilter: ApplicationStatus | 'all';
  setStatusFilter: (value: ApplicationStatus | 'all') => void;
  companies: string[];
  companyFilter: string;
  setCompanyFilter: (value: string) => void;
  positions: string[];
  positionFilter: string;
  setPositionFilter: (value: string) => void;
}

const FilterSelects: React.FC<FilterSelectsProps> = ({
  statusFilter,
  setStatusFilter,
  companies,
  companyFilter,
  setCompanyFilter,
  positions,
  positionFilter,
  setPositionFilter,
}) => {
  // Manejador tipado para statusFilter
  const handleStatusChange = (value: string) => {
    setStatusFilter(value as ApplicationStatus | 'all');
  };

  // Handlers para convertir valores "all" a cadenas vacías y viceversa
  const handleCompanyChange = (value: string) => {
    setCompanyFilter(value === "all" ? "" : value);
  };

  const handlePositionChange = (value: string) => {
    setPositionFilter(value === "all" ? "" : value);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Status select */}
      <div className="w-full md:w-64">
        <Select value={statusFilter} onValueChange={handleStatusChange}>
          <SelectTrigger>
            <SelectValue placeholder="Todos los estados" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estados</SelectItem>
            <SelectItem value="applied">Aplicado</SelectItem>
            <SelectItem value="interview">Entrevista</SelectItem>
            <SelectItem value="technical">Prueba Técnica</SelectItem>
            <SelectItem value="offer">Oferta</SelectItem>
            <SelectItem value="rejected">Rechazado</SelectItem>
            <SelectItem value="accepted">Aceptado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Company select */}
      <div className="w-full md:w-64">
        <Select value={companyFilter === "" ? "all" : companyFilter} onValueChange={handleCompanyChange}>
          <SelectTrigger>
            <SelectValue placeholder="Todas las empresas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las empresas</SelectItem>
            {companies && companies.length > 0 && companies.map((company) => (
              <SelectItem key={company} value={company}>{company}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Position select */}
      <div className="w-full md:w-64">
        <Select value={positionFilter === "" ? "all" : positionFilter} onValueChange={handlePositionChange}>
          <SelectTrigger>
            <SelectValue placeholder="Todos los puestos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los puestos</SelectItem>
            {positions && positions.length > 0 && positions.map((position) => (
              <SelectItem key={position} value={position}>{position}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FilterSelects;
