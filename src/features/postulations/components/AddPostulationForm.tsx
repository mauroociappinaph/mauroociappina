import React, { useState } from "react";
import styles from "../styles/AddPostulationForm.module.css";
import { createPostulation } from "../services/postulationsService.ts";

export const AddPostulationForm: React.FC = () => {
  const [postulationData, setPostulationData] = useState({
    position: "",
    company: "",
    status: "Pending Response",
    applicationDate: "",
    link: "",
    recruiterContact: "",
    sendEmail: false,
    sendCv: false,
    description: "",
    userId: localStorage.getItem("id"),
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPostulationData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setPostulationData((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setPostulationData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Datos de la postulación:", postulationData);

    try {
      const postulacion = await createPostulation(postulationData);

      console.log(" postulacion respuesta ", postulacion);
      // Limpiar el formulario después de enviar
      setPostulationData({
        position: "",
        company: "",
        status: "Pending Response",
        applicationDate: "",
        link: "",
        recruiterContact: "",
        sendEmail: false,
        sendCv: false,
        description: "",
        userId: "",
      });
      console.log("Postulación creada exitosamente");
    } catch (error) {
      console.error("Error al crear la postulación:", error);
    }
  };

  return (
    <main className={styles.container}>
      <h3 className={styles.title}>Agregar nueva Postulación</h3>
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Campo: Posición */}
        <label htmlFor="position" className={styles.label}>
          Posición
        </label>
        <input
          type="text"
          id="position"
          name="position"
          placeholder="Posición"
          className={styles.input}
          value={postulationData.position}
          onChange={handleInputChange}
        />

        {/* Campo: Empresa */}
        <label htmlFor="company" className={styles.label}>
          Empresa
        </label>
        <input
          type="text"
          id="company"
          name="company"
          placeholder="Empresa"
          className={styles.input}
          value={postulationData.company}
          onChange={handleInputChange}
        />

        {/* Campo: Status */}
        <label htmlFor="status" className={styles.label}>
          Estado de respuesta
        </label>
        <input
          type="text"
          id="status"
          name="status"
          placeholder="Estado de respuesta"
          className={styles.input}
          value={postulationData.status}
          onChange={handleInputChange}
        />

        {/* Campo: Fecha de Postulación */}
        <label htmlFor="applicationDate" className={styles.label}>
          Fecha de Postulación
        </label>
        <input
          type="date"
          id="applicationDate"
          name="applicationDate"
          className={styles.input}
          value={postulationData.applicationDate}
          onChange={handleInputChange}
        />

        {/* Campo: Link */}
        <label htmlFor="link" className={styles.label}>
          Link
        </label>
        <input
          type="url"
          id="link"
          name="link"
          placeholder="Link"
          className={styles.input}
          value={postulationData.link}
          onChange={handleInputChange}
        />

        {/* Campo: Contacto del Reclutador/a */}
        <label htmlFor="recruiterContact" className={styles.label}>
          Contacto del Reclutador/a
        </label>
        <input
          type="text"
          id="recruiterContact"
          name="recruiterContact"
          placeholder="Contacto del Reclutador/a"
          className={styles.input}
          value={postulationData.recruiterContact}
          onChange={handleInputChange}
        />

        {/* Checkbox: Envié Email al Reclutador/a */}
        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            id="sendEmail"
            name="sendEmail"
            className={styles.checkbox}
            checked={postulationData.sendEmail}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="sendEmail" className={styles.checkboxLabel}>
            Envié Email al Reclutador/a
          </label>
        </div>

        {/* Checkbox: Envié CV */}
        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            id="sendCv"
            name="sendCv"
            className={styles.checkbox}
            checked={postulationData.sendCv}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="sendCv" className={styles.checkboxLabel}>
            Envié CV
          </label>
        </div>

        {/* Campo: Descripción/Comentarios */}
        <label htmlFor="description" className={styles.label}>
          Descripción/Comentarios
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="Descripción/Comentarios"
          className={styles.textarea}
          value={postulationData.description}
          onChange={handleTextareaChange}
        />

        {/* Botón de Enviar */}
        <button type="submit" className={styles.submitButton}>
          Guardar Postulación
        </button>
      </form>
    </main>
  );
};
