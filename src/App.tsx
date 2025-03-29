import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PostulationsPage from "./features/postulations/pages/PostulationsPage.tsx";
import RegisterPage from "./features/auth/pages/RegisterPage.tsx";
import LoginPage from "./features/auth/pages/LoginPage.tsx";
import HomePage from "./features/home/HomePage";
import PostulationDetail from "./features/postulations/pages/PostulationDetailPage.tsx";
import ProtectedRoute from "./features/auth/components/ProtectedRoute";

const App = () => {
  return (
    <Router>
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
    </Router>
  );
};

export default App;
