import RegisterForm from "../../auth/components/UserRegisterForm.tsx";
import { NavigationButton } from "../../../components/common/Button/NavigationButton.tsx";
import styles from "../styles/Register.module.css";

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
