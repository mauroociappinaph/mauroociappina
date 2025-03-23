import React, { useEffect } from "react";
import { usePostulationsStore } from "../stores/postulationsStore";
import PostulationsList from "../components/PostulationsList";
import styles from "../styles/PostulationsPage.module.css";
import Button from "../../../components/common/Button/Button.module.css";
import { Filters } from "../components/Filters";
import { AddPostulationForm } from "../components/AddPostulationForm.js";

import { useState } from "react";

const PostulationsPage: React.FC = () => {
  const postulations = usePostulationsStore((state) => state.postulations);
  const [isClickedButton, setIsClickedButton] = useState(false);

  const { loading, fetchPostulations } = usePostulationsStore();

  const userId = localStorage.getItem("id");
  useEffect(() => {
    if (userId) fetchPostulations(userId);
  }, [userId, fetchPostulations]);

  if (loading) return <div>Loading...</div>;

  return (
    <main className={styles.PostulationsPage}>
      <header>
        <h1 className={styles.title}>Postulaciones</h1>
        <hr />
      </header>

      {/* Sección de Filtros */}
      <section className={styles.filtersSection}>
        <Filters />
      </section>

      {/* Sección de Postulaciones */}
      <section className={styles.postulationsSection}>
        {postulations.length === 0 ? (
          <p>No postulations yet</p>
        ) : (
          <PostulationsList />
        )}

        <button
          className={Button.addButton}
          onClick={() => setIsClickedButton(true)}
          aria-label="Add new postulation"
        >
          +
        </button>
      </section>

      {isClickedButton && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <button
              className={styles.closeButton}
              onClick={() => setIsClickedButton(false)}
              aria-label="Close modal"
            >
              &times;
            </button>
            <AddPostulationForm />
          </div>
        </div>
      )}
    </main>
  );
};

export default PostulationsPage;
