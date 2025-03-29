import React from "react";
import styles from "../styles/CardStyle.module.css";
import { Postulation } from "../types/postulation.types";
import { NavLink } from "react-router-dom";

interface PostulationsListProps {
  postulations: Postulation[];
}

const PostulationsList: React.FC<PostulationsListProps> = ({ postulations }) => {
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
