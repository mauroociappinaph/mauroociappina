import React, { useEffect } from "react";
import { usePostulationsStore } from "../stores/postulationsStore";
import PostulationsList from "../components/PostulationsList";
import styles from "../styles/PostulationsPage.module.css";
import Button from "../../../components/common/Button/Button.module.css";
import { Filters } from "../components/Filters";
import { AddPostulationForm } from "../components/AddPostulationForm.js";
import { useState } from "react";
import { useUserStore } from "../../../stores/userStore.js";

const PostulationsPage: React.FC = () => {
  const { postulations, loading, fetchPostulations } = usePostulationsStore();
  const [isClickedButton, setIsClickedButton] = useState(false);
  const userId = useUserStore((state) => state.userId);

  useEffect(() => {
    const userLocalId = localStorage.getItem("id");
    const currentUserId = userLocalId || userId;
    
    if (currentUserId) {
      fetchPostulations(currentUserId);
    }
  }, [fetchPostulations, userId]);

  if (loading) return <div>Loading postulations...</div>;

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
