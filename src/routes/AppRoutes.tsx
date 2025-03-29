import { Route, Routes } from "react-router-dom";
import PostulationsPage from "../features/postulations/pages/PostulationsPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import LoginPage from "../features/auth/pages/LoginPage";
import HomePage from "../features/home/HomePage";
import PostulationDetail from "../features/postulations/pages/PostulationDetailPage";
import ProtectedRoute from "../features/auth/components/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/postulations"
        element={
          <ProtectedRoute>
            <PostulationsPage />
          </ProtectedRoute>
        }
      />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/detail/:id"
        element={
          <ProtectedRoute>
            <PostulationDetail />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes; 