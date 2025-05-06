import React from 'react';
import { Search } from 'lucide-react';
import { ApplicationStatus } from '../types/index';
import FilterSelects from './FilterSelects';

interface SearchAndFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: ApplicationStatus | 'all';
  setStatusFilter: (status: ApplicationStatus | 'all') => void;
  companyFilter: string;
  setCompanyFilter: (company: string) => void;
  positionFilter: string;
  setPositionFilter: (position: string) => void;
  companies: string[];
  positions: string[];
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  companyFilter,
  setCompanyFilter,
  positionFilter,
  setPositionFilter,
  companies,
  positions
}) => {
  // Ensure we have arrays even if they're undefined
  const safeCompanies = Array.isArray(companies) ? companies : [];
  const safePositions = Array.isArray(positions) ? positions : [];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex flex-col space-y-4">
        {/* Barra de búsqueda */}
        <div className="w-full">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Buscar postulaciones..."
            />
          </div>
        </div>

        {/* Filtros con Shadcn Select */}
        <FilterSelects
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          companies={safeCompanies}
          companyFilter={companyFilter}
          setCompanyFilter={setCompanyFilter}
          positions={safePositions}
          positionFilter={positionFilter}
          setPositionFilter={setPositionFilter}
        />
      </div>
    </div>
  );
};

export default SearchAndFilter;
