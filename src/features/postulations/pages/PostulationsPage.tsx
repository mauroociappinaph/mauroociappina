import React, { useEffect } from "react";
import { useUserStore } from "../../users/stores/userStore";
import { usePostulationsStore } from "../stores/postulationsStore";
import PostulationsList from "../components/PostulationsList";
import styles from "./PostulationsPage.module.css"; // Importamos el archivo CSS

const PostulationsPage: React.FC = () => {
  const userId = useUserStore((state) => state.userId);
  const postulations = usePostulationsStore((state) => state.postulations);

  const { loading, fetchPostulations } = usePostulationsStore();

  useEffect(() => {
    if (userId) fetchPostulations(userId);
  }, [userId, fetchPostulations]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className={styles.PostulationsPage}>
      <h1 className={styles.title}>Postulations</h1>
      <hr />

      <div className="flex justify-between">
        <div className={styles.postulationsContainer}>
          {postulations.length === 0 ? <p>No postulations yet</p> : null}
          <PostulationsList />
        </div>

        <div className={styles.sidebar}>
          <h2 className={styles.h2}>Filters</h2>
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

          <button className={styles.addButton}>+</button>
        </div>
      </div>
    </div>
  );
};

export default PostulationsPage;
