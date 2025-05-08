import React, { useState, useMemo, useEffect } from 'react';
import { useApplicationStore } from '../store';
import ApplicationCard from '../components/ApplicationCard';
import SearchAndFilter from '../components/SearchAndFilter';
import ApplicationStats from '../components/ApplicationStats';
import { ApplicationStatus } from '../types/index';
import { AlertCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { applications } = useApplicationStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | 'all'>('all');
  const [companyFilter, setCompanyFilter] = useState('');
  const [positionFilter, setPositionFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    // Simulate loading state for a short time to ensure components mount correctly
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Get unique companies and positions for filters
  const companies = useMemo(() => {
    const uniqueCompanies = new Set(applications.map(app => app.company));
    return Array.from(uniqueCompanies).sort();
  }, [applications]);

  const positions = useMemo(() => {
    const uniquePositions = new Set(applications.map(app => app.position));
    return Array.from(uniquePositions).sort();
  }, [applications]);

  // Filter applications based on search and filters
  const filteredApplications = useMemo(() => {
    return applications.filter(app => {
      // Text search
      const searchMatch = searchTerm === '' ||
        app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (app.notes && app.notes.toLowerCase().includes(searchTerm.toLowerCase()));

      // Status filter
      const statusMatch = statusFilter === 'all' || app.status === statusFilter;

      // Company filter
      const companyMatch = companyFilter === '' || app.company === companyFilter;

      // Position filter
      const positionMatch = positionFilter === '' || app.position === positionFilter;

      return searchMatch && statusMatch && companyMatch && positionMatch;
    });
  }, [applications, searchTerm, statusFilter, companyFilter, positionFilter]);

  if (isLoading) {
    return <div className="p-8 text-lg font-medium">Cargando dashboard...</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-8 py-8 font-sans">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">Dashboard</h1>

      {/* Cards de postulaciones arriba del resumen */}
      <section className="mb-12">
        {applications.length === 0 ? (
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-2xl mt-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-6 w-6 text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-base text-blue-700">
                  No tienes postulaciones registradas. ¡Comienza agregando tu primera postulación!
                </p>
              </div>
            </div>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-2xl mt-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-6 w-6 text-yellow-400" />
              </div>
              <div className="ml-4">
                <p className="text-base text-yellow-700">
                  No se encontraron resultados con los filtros actuales.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredApplications.map(application => (
              <ApplicationCard key={application.id} application={application} />
            ))}
          </div>
        )}
      </section>

      {/* Resumen */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Resumen</h2>
        <ApplicationStats />
      </section>

      {/* Filtros y búsqueda */}
      <section className="mb-10">
        <SearchAndFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          companyFilter={companyFilter}
          setCompanyFilter={setCompanyFilter}
          positionFilter={positionFilter}
          setPositionFilter={setPositionFilter}
          companies={companies}
          positions={positions}
        />
      </section>
    </div>
  );
};

export default Dashboard;
