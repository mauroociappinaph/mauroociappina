import React, { useState } from "react";
import { loginService } from "../services/authService";
import styles from "../styles/Login.module.css";
import { NavigationButton } from "../../../components/common/Button/NavigationButton";
import { useAuthStore } from "../stores/authStore";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { ROUTES } from "../../../config/routes";
import { LoginCredentials, AuthError } from "../types/auth.types";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<AuthError>({ message: "" });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError({ message: "" });

    try {
      const userData = await loginService(
        credentials.email,
        credentials.password,
      );

      login(userData);
      navigate(ROUTES.POSTULATIONS, { replace: true });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setError({
          error: error.response?.data?.error || "Error desconocido",
          message: error.response?.data?.message || "Ocurrió un error",
        });
      } else if (error instanceof Error) {
        setError({ message: "Error en la conexión con el servidor" });
      } else {
        setError({ message: "Error inesperado" });
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.backButton}>
        <NavigationButton to={ROUTES.HOME} label="Atrás" />
      </div>

      <div className={styles.formContainer}>
        <h1 className={styles.title}>Ingresá en la app</h1>
        <form onSubmit={handleLogin} className={styles.form}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleInputChange}
            required
          />
          <button disabled={credentials.password.length < 6} type="submit">
            Login
          </button>
          {error.message && <p className={styles.error}>{error.message}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
