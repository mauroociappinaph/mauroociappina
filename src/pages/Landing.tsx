import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Landing: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="bg-white py-16">
        <div className="container mx-auto px-4">
          {/* Sección de características */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Organización Centralizada
              </h3>
              <p className="text-gray-700">
                Mantén todas tus postulaciones organizadas en un solo lugar, con acceso rápido a la información importante.
              </p>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Seguimiento Visual
              </h3>
              <p className="text-gray-700">
                Visualiza el estado de tus postulaciones con indicadores de color y estadísticas claras.
              </p>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Búsqueda Eficiente
              </h3>
              <p className="text-gray-700">
                Encuentra rápidamente cualquier postulación con filtros avanzados y búsqueda por texto.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Landing;
