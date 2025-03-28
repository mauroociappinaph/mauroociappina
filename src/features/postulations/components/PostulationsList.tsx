import React from "react";
import { usePostulationsStore } from "../stores/postulationsStore";
import styles from "../styles/CardStyle.module.css";
import { Postulation } from "../types";
import { NavLink } from "react-router-dom";

const PostulationsList: React.FC = () => {
  const { postulations, loading } = usePostulationsStore();

  if (loading) return <p className={styles.loading}>Loading postulations...</p>;
  if (!postulations || postulations.length === 0)
    return <p>No hay postulaciones disponibles.</p>;

  return (
    <div className={styles.container}>
      {postulations.map((post: Postulation) => (
        <NavLink to={`/detail/${post.id}`} key={post.id}>
          <article className={styles.postulationCard} data-status={post.status}>
            <h2 className={styles.title}>{post.position}</h2>
            <div className={styles.detailItem}>
              <span>Empresa: </span>
              <p>{post.company}</p>
            </div>
            <div className={styles.detailItem}>
              <span> Fecha de postulación:📅</span>
              <p>{post.applicationDate}</p>
            </div>
            <div className={styles.detailItem}>
              <span> Estado:📌</span>
              <p className={styles.statusBadge}>{post.status}</p>
            </div>
          </article>
        </NavLink>
      ))}
    </div>
  );
};

export default PostulationsList;
