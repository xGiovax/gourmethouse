import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario, contrasena }),
    });

    const data = await res.json();

        if (data.success) {
  Swal.fire({
    icon: "success",
    title: "Bienvenido",
    text: "Inicio de sesión exitoso",
    confirmButtonColor: "#d63384",
  });

  // 🔹 Guardar sesión
  localStorage.setItem("admin", "true");

  // 🔹 Redirigir al panel
  navigate("/admin");
} else {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: "Usuario o contraseña incorrectos",
    confirmButtonColor: "#d63384",
  });
}

  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <div
        className="p-4 rounded shadow"
        style={{ width: "350px", backgroundColor: "#fff" }}
      >
        <h4 className="text-center mb-4">🔐 Iniciar Sesión</h4>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Usuario</label>
            <input
              type="text"
              className="form-control"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn w-100 text-white"
            style={{ backgroundColor: "#d63384" }}
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}
