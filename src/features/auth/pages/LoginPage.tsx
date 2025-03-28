import React, { useState } from "react";
import { loginService } from "../services/authService";
import styles from "../styles/Login.module.css";
import { NavigationButton } from "../../../components/common/Button/NavigationButton.js";
import { useAuthRedirect } from "../../../hooks/useAuth.js";
import { useUserStore } from "../../../stores/userStore.js";
import { useAuth } from "../../../hooks/useAuth.js";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

const LoginPage = () => {
  useAuthRedirect();
  const auth = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<{ error?: string; message: string }>({
    message: "",
  });

  const setUserId = useUserStore((state) => state.setUserId);
  const { updateUser } = useAuth();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError({ message: "" });

    try {
      const userData = await loginService(email, password);

      setUserId(userData.id);
      updateUser(userData);
      auth.updateUser(userData.data);

      navigate("/postulations");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error("Error en el backend:", error.response?.data);
        setError({
          error: error.response?.data?.error || "Error desconocido",
          message: error.response?.data?.message || "Ocurrió un error",
        });
      } else if (error instanceof Error) {
        console.error("Error en la petición:", error.message);
        setError({ message: "Error en la conexión con el servidor" });
      } else {
        console.error("Error desconocido:", error);
        setError({ message: "Error inesperado" });
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.backButton}>
        <NavigationButton to="/" label="Atrás" />
      </div>

      <div className={styles.formContainer}>
        <h1 className={styles.title}>Ingresá en la app</h1>
        <form onSubmit={handleLogin} className={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <button disabled={password.length < 6} type="submit">
            Login
          </button>
          {error.message && <p className={styles.error}>{error.message}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
