import React, { useEffect } from "react";
import { useUserStore } from "../../../stores/userStore.ts";
import { usePostulationsStore } from "../stores/postulationsStore";
import PostulationsList from "../components/PostulationsList";
import styles from "../styles/PostulationsPage.module.css";
import { Filters } from "../components/Filters";
import { AddPostulationForm } from "../components/AddPostulationForm.js";

import { useState } from "react";

const PostulationsPage: React.FC = () => {
  const userId = useUserStore((state) => state.userId);
  const postulations = usePostulationsStore((state) => state.postulations);
  const [isClickedButton, setIsClickedButton] = useState(false);

  const { loading, fetchPostulations } = usePostulationsStore();

  useEffect(() => {
    if (userId) fetchPostulations(userId);
  }, [userId, fetchPostulations]);

  if (loading) return <div>Loading...</div>;

  return (
    <main className={styles.PostulationsPage}>
      <header>
        <h1 className={styles.title}>Postulations</h1>
        <hr />
      </header>

      <section className="flex justify-between">
        <article className={styles.postulationsContainer}>
          {postulations.length === 0 ? (
            <p>No postulations yet</p>
          ) : (
            <PostulationsList />
          )}

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
        </article>

        <aside className={styles.sidebar}>
          <Filters />

          <button
            className={styles.addButton}
            onClick={() => setIsClickedButton(true)}
            aria-label="Add new postulation"
          >
            +
          </button>
        </aside>
      </section>
    </main>
  );
};

export default PostulationsPage;
