import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, ArrowRight } from 'lucide-react';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <Briefcase className="h-16 w-16 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl mb-4">
            Gestor de Postulaciones Laborales
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Organiza y haz seguimiento de tus postulaciones laborales de manera eficiente. 
            Mantén el control de tu búsqueda de trabajo en un solo lugar.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Iniciar Sesión
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Crear Cuenta
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Organización Centralizada
            </h3>
            <p className="text-gray-600">
              Mantén todas tus postulaciones organizadas en un solo lugar, con acceso rápido a la información importante.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Seguimiento Visual
            </h3>
            <p className="text-gray-600">
              Visualiza el estado de tus postulaciones con indicadores de color y estadísticas claras.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Búsqueda Eficiente
            </h3>
            <p className="text-gray-600">
              Encuentra rápidamente cualquier postulación con filtros avanzados y búsqueda por texto.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing