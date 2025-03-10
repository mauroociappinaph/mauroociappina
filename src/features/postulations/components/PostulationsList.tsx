import React from "react";
import { usePostulationsStore } from "../stores/postulationsStore";

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

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {postulations.map((post: Postulation) => (
        <section key={post.id} className="postulation">
          <ul>
            <li>
              <h2>{post.position}</h2>

              <p>Company: {post.company}</p>
              <p>Date: {post.date}</p>
              <p>Status: {post.status}</p>
            </li>
          </ul>
        </section>
      ))}
    </div>
  );
};

export default PostulationsList;
