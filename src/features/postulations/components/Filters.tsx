import React from "react";
import styles from "./Filters.module.css";

export const Filters: React.FC = () => {
  return (
    <div className={styles.filters}>
      <h2 className={styles.h2}>Filters</h2>;
      {/* Aquí puedes agregar filtros según lo que necesites */}
      <div className={styles.filters}>
        <label className={styles.labelTitle} htmlFor="status-filter">
          Status
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
        <label className={styles.labelTitle}>Posición</label>
        <select id="position-filter" name="position-filter">
          <option className={styles.optionTitle} value="todos">
            Todos
          </option>
          <option>{}</option>
        </select>
      </div>
    </div>
  );
};
