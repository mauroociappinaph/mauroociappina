import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostulationDetail } from "../services/postulationsService";
import { Postulation } from "../types";
import { NavigationButton } from "../../../components/common/Button/NavigationButton";

const PostulationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<Postulation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getPostulationDetail(id!);

        if (response.error) {
          setError(response.error);
        } else {
          setData(response);
        }
      } catch (err) {
        setError("Failed to fetch postulation details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    console.log("fetching postulation detail");
    fetchData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!data) return <p>No data found</p>;

  return (
    <main>
      <NavigationButton label="Atás" to="/postulations" />
      <h2>Detalles de la Postulación</h2>
      <div>
        <h3>Posición: {data.position}</h3>
        <p>Empresa: {data.company}</p>
        <p>Fecha de aplicaión: {data.applicationDate}</p>
        <p>Estado de la aplicación: {data.status}</p>
        <p>Contacto de reclutador/a : {data.recruiterContact}</p>
        <p>Se le envió Email: {data.sendEmail ? "sí" : "no"}</p>
        <p>Se envió CV: {data.sendCv ? "sí" : "no"}</p>

        {data.link && (
          <p>
            Result:{" "}
            <a href={data.link} target="_blank" rel="noopener noreferrer">
              {data.link}
            </a>
          </p>
        )}
      </div>
    </main>
  );
};

export default PostulationDetail;
