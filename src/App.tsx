import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ApplicationForm from './pages/ApplicationForm';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import EditProfile from './pages/EditProfile';
import { useAuthStore } from './store';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuthStore();

  if (loading) {
    return <div className="p-4">Cargando...</div>;
  }

  if (!user) {
    return <Navigate to="/landing" replace />;
  }

  return <>{children}</>;
};

function App() {
  const { user } = useAuthStore();

  // Log the authentication state for debugging
  useEffect(() => {
    console.log('Auth state:', { user });
  }, [user]);

  return (
      <Router>
        <Routes>
          <Route path="/landing" element={user ? <Navigate to="/" replace /> : <Landing />} />
          <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/" replace /> : <Register />} />
          <Route path="/" element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="add" element={<ApplicationForm />} />
            <Route path="edit/:id" element={<ApplicationForm />} />
            <Route path="profile" element={<EditProfile />} />
          </Route>
        <Route path="*" element={<Navigate to={user ? "/" : "/landing"} replace />} />
        </Routes>
      </Router>
  );
}

export default App;
