import React from "react";
import { usePostulationsStore } from "../stores/postulationsStore";
import styles from "../styles/CardStyle.module.css";

interface Postulation {
  id: string;
  position: string;
  company: string;
  date: string;
  status: string;
  result?: string;
}

const PostulationsList: React.FC = () => {
  const { postulations, loading } = usePostulationsStore();

  if (loading) return <p className={styles.loading}>Loading postulations...</p>;

  return (
    <div className={styles.container}>
      {postulations.map((post: Postulation) => (
        <article
          key={post.id}
          className={styles.postulationCard}
          data-status={post.status}
        >
          <h2 className={styles.title}>{post.position}</h2>

          <div className={styles.detailItem}>
            <span>Empresa: </span>
            <p>{post.company}</p>
          </div>

          <div className={styles.detailItem}>
            <span> Fecha de postulación:📅</span>
            <p>{post.date}</p>
          </div>

          <div className={styles.detailItem}>
            <span> Estado:📌</span>
            <p className={styles.statusBadge}>{post.status}</p>
          </div>

          {post.result && (
            <div className={styles.detailItem}>
              <span>Resultado:📝</span>
              <p>Result: {post.result}</p>
            </div>
          )}
        </article>
      ))}
    </div>
  );
};

export default PostulationsList;
