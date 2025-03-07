import RegisterForm from "../components/UserRegisterForm";
import React from "react";
import styles from "./Register.module.css";
import { NavigationButton } from "../components/NavigationButton";

const RegisterPage = () => {
  return (
    <div className={styles.container}>
      <div className="backButton">
        <NavigationButton to="/" label="Atrás" />
      </div>
      <div>
        <h2> Registrte en la app y empezá a organizarte! </h2>
      </div>
      <div className={styles.formContainer}>
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
