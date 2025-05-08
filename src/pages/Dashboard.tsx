import React, { useState, useMemo, useEffect } from 'react';
import { useApplicationStore, useAuthStore } from '../store';
import ApplicationCard from '../components/ApplicationCard';
import SearchAndFilter from '../components/SearchAndFilter';
import ApplicationStats from '../components/ApplicationStats';
import { ApplicationStatus } from '../types';
import { AlertCircle, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { APP_COLORS } from '../styles/colors';

const Dashboard: React.FC = () => {
  const { applications } = useApplicationStore();
  const { user } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | 'all'>('all');
  const [companyFilter, setCompanyFilter] = useState('');
  const [positionFilter, setPositionFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
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
      {/* Encabezado con bienvenida */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">¡Bienvenido de nuevo, {user?.name || 'Usuario'}!</p>
        </div>

        <Link
          to="/add"
          className="mt-4 md:mt-0 flex items-center px-5 py-2.5 rounded-lg shadow-sm text-white font-medium"
          style={{ background: APP_COLORS.blue }}
        >
          <PlusCircle className="mr-2 h-5 w-5" />
          Nueva Postulación
        </Link>
      </div>

      {/* Cards de postulaciones - NIVEL 2 */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Tus Postulaciones</h2>

        {/* Sección de búsqueda y filtros */}
        <div className="mb-6">
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
        </div>

        {applications.length === 0 ? (
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-xl shadow-sm">
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
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-xl shadow-sm">
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

      {/* Sección de estadísticas */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Resumen</h2>
        <ApplicationStats />
      </section>
    </div>
  );
};

export default Dashboard;
