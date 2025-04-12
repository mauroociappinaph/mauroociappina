import React, { useState, useEffect } from "react";
import PostulationsList from "../components/PostulationsList";
import styles from "../styles/PostulationsPage.module.css";
import { Filters } from "../components/Filters";
import { AddPostulationForm } from "../components/AddPostulationForm.js";
import { useAuthStore } from "../../auth/stores/authStore";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../config/routes";
import { usePostulationsQuery } from "../hooks/usePostulationsQuery";

const PostulationsPage: React.FC = () => {
  const [isClickedButton, setIsClickedButton] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) {
      navigate(ROUTES.LOGIN);
    }
  }, [user, navigate]);

  const { postulations, isLoading, isError, error } = usePostulationsQuery(
    user?.id,
  );

  useEffect(() => {}, [postulations, isLoading, isError, error]);

  if (!user) return null;
  if (isLoading) return <div>Cargando postulaciones...</div>;
  if (isError)
    return <div>Error al cargar postulaciones: {error?.message}</div>;

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
        {!postulations || postulations.length === 0 ? (
          <p>No postulations yet</p>
        ) : (
          <PostulationsList postulations={postulations} />
        )}

        <button
          className={styles.addButton}
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
            <AddPostulationForm onClose={() => setIsClickedButton(false)} />
          </div>
        </div>
      )}
    </main>
  );
};

export default PostulationsPage;
