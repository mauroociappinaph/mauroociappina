import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

interface Postulation {
  id: string;
  date: string;
  position: string;
  company: string;
  trough: string;
  status: string;
  sendCv: boolean;
  sendEmail: boolean;
}

const fetchPostulations = async (userId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/postulations/${userId}`,
      {},
    );
    console.log(response.data.result.postulations);
    return response.data.result.postulations;
  } catch (error) {
    console.error("Error fetching postulations:", error);
    throw error;
  }
};

const App = () => {
  const [postulations, setPostulations] = useState<Postulation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const userId = "fd6d0b96-0fef-4a07-ab28-2e2757c52760";

  // Memorizar los filtros para evitar recreaciones innecesarias
  // const filters = useMemo(
  //   () => ({
  //     date: "2025-01-01",
  //     position: "Developer",
  //     company: "Example Co.",
  //     trough: "LinkedIn",
  //     status: "Pending",
  //     sendCv: true,
  //     sendEmail: false,
  //   }),
  //   []
  // );

  useEffect(() => {
    const getPostulations = async () => {
      try {
        setLoading(true);
        const data = await fetchPostulations(userId);
        setPostulations(data);
      } catch (error) {
        console.error("Error loading postulations:", error);
      } finally {
        setLoading(false);
      }
    };

    getPostulations();
  }, [userId]);

  return (
    <div>
      <h1>Postulations</h1>
      {loading ? (
        <p>Loading...</p>
      ) : postulations.length > 0 ? (
        postulations.map((post) => (
          <div key={post.id} className="postulation">
            <h2>{post.position}</h2>
            <p>Company: {post.company}</p>
            <p>Date: {post.date}</p>
            <p>Status: {post.status}</p>
          </div>
        ))
      ) : (
        <p>No postulations found.</p>
      )}
    </div>
  );
};

export default App;
