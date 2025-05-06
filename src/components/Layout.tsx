import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-6 sm:px-6 lg:px-8 flex-grow">
        <Suspense fallback={<div className="p-4">Cargando contenido...</div>}>
          <Outlet />
        </Suspense>
      </main>
      <footer className="bg-white shadow-inner py-4 mt-auto">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Postulate - Gestor de Postulaciones Laborales
        </div>
      </footer>
    </div>
  );
};

export default Layout;
