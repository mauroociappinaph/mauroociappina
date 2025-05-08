import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { APP_COLORS } from '../styles/colors';

const Layout: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', background: APP_COLORS.lightGray, fontFamily: 'Inter, sans-serif' }}>
      <Navbar />
      <main className="container mx-auto px-4 py-6 mt-4 sm:px-6 lg:px-8 flex-grow">
        <Suspense fallback={<div className="p-4">Cargando contenido...</div>}>
          <Outlet />
        </Suspense>
      </main>
      <footer style={{ background: APP_COLORS.white }} className="shadow-inner py-4 mt-auto">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Gestor de Postulaciones Laborales
        </div>
      </footer>
    </div>
  );
};

export default Layout;
