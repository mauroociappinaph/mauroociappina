import React from "react";
import styles from "../styles/Filters.module.css";

export const Filters: React.FC = () => {
  return (
    <div className={styles.content}>
      <h2 className={styles.h2}>Filtros</h2>
      <div className={styles.filters}>
        <div className="filter">
          <label className={styles.labelTitle} htmlFor="status-filter">
            Estado :
          </label>
          <select id="status-filter" name="status-filter">
            <option className={styles.optionTitle} value="all">
              All
            </option>
            <option className={styles.optionTitle} value="Pending Response">
              Pendiente
            </option>
            <option className={styles.optionTitle} value="Accepteded">
              Aceptado
            </option>
            <option className={styles.optionTitle} value="Rejected">
              Rechazado
            </option>
            <option className={styles.optionTitle} value="First Interview">
              Primera Entrevista
            </option>
            <option className={styles.optionTitle} value="Second Interview">
              Segunda Entrevista
            </option>
            <option className={styles.optionTitle} value="Technical Interview">
              Entrevista Técnica
            </option>
          </select>
        </div>
        <div className="filter">
          <label className={styles.labelTitle}>Posición :</label>
          <select id="position-filter" name="position-filter">
            <option className={styles.optionTitle} value="todos">
              Todos
            </option>
            <option>{}</option>
          </select>
        </div>
      </div>
    </div>
  );
};
