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
        <div key={post.id} className="postulation">
          <h2>{post.position}</h2>
          <p>Company: {post.company}</p>
          <p>Date: {post.date}</p>
          <p>Status: {post.status}</p>
        </div>
      ))}
    </div>
  );
};

export default PostulationsList;
