import { useState } from "react";
import { createUserService } from "../../auth/services/createUserService.ts";

const RegisterForm = () => {
  const [userData, setUserData] = useState({
    name: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (userData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {
      const response = await createUserService(userData);

      if (response === "Ok") {
        setSuccessMessage("¡Usuario registrado con éxito!");
        setUserData({
          name: "",
          lastName: "",
          userName: "",
          email: "",
          password: "",
        });
      } else {
        setError("Respuesta inesperada del servidor.");
      }
    } catch (err) {
      console.error("Error creando el usuario:", err);
      setError("Error al registrar el usuario. Intenta nuevamente.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-radius">
      <div>
        <label htmlFor="name"></label>
        <input
          placeholder="Nombre"
          type="text"
          id="name"
          name="name"
          value={userData.name}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <label htmlFor="lastName"></label>
        <input
          placeholder="Apellido"
          type="text"
          id="lastName"
          name="lastName"
          value={userData.lastName}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <label htmlFor="userName"></label>
        <input
          placeholder="Nombre de usuario"
          type="text"
          id="userName"
          name="userName"
          value={userData.userName}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <label htmlFor="email"></label>
        <input
          placeholder="Email"
          type="email"
          id="email"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <label htmlFor="password"></label>
        <input
          placeholder="Contraseña"
          type="password"
          id="password"
          name="password"
          value={userData.password}
          onChange={handleInputChange}
          required
          minLength={6}
        />
      </div>

      <button
        disabled={
          userData.password.length < 6 ||
          !userData.name ||
          !userData.lastName ||
          !userData.userName ||
          !userData.email
        }
        type="submit"
      >
        Registrarme
      </button>

      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default RegisterForm;
