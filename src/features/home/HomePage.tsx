import React from "react";
import styles from "./HomePage.module.css";
import { NavigationButton } from "../users/components/NavigationButton";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Bienvenido a Postulate, tu organizador personal
        </h1>

        <div className={"styles.desc"}>
          <span>
            Organizá tus búsquedas, hacé tu seguimiento y encontrá tu mejor
            estrategia!
          </span>
        </div>

        <nav className={styles.nav}>
          <div>
            <NavigationButton to="/register" label="Registrarme" />
          </div>
          <div>
            <NavigationButton to="/login" label="Ingresar" />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default HomePage;
