import React from "react";
import styles from "../styles/Filters.module.css";

export const Filters: React.FC = () => {
  return (
    <div className={styles.content}>
      <h2 className={styles.h2}>Filters</h2>;
      <div className={styles.filters}>
        <div className="filter">
          <label className={styles.labelTitle} htmlFor="status-filter">
            Estado :
          </label>
          <select id="status-filter" name="status-filter">
            <option className={styles.optionTitle} value="all">
              All
            </option>
            <option className={styles.optionTitle} value="pending">
              Pendiente
            </option>
            <option className={styles.optionTitle} value="approved">
              Aprobado
            </option>
            <option className={styles.optionTitle} value="rejected">
              Rechazado
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
