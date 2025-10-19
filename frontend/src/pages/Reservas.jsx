import { useState } from "react";
import { Container } from "react-bootstrap";
import Swal from "sweetalert2";

export default function Reservas() {
  const [reserva, setReserva] = useState({
    nombre: "",
    fecha: "",
    hora: "",
    personas: "",
  });

  const enviar = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/api/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reserva),
      });
      const data = await res.json();
      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Reserva confirmada",
          text: data.mensaje,
          confirmButtonColor: "#3D1F03",
        });
        setReserva({ nombre: "", fecha: "", hora: "", personas: "" });
      } else {
        Swal.fire({
          icon: "error",
          title: "Ups",
          text: data.mensaje || "No se pudo guardar",
          confirmButtonColor: "#3D1F03",
        });
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Error de conexión",
        confirmButtonColor: "#3d1f03",
      });
    }
  };

  return (
    <section className="section">
      <Container>
        <h2 className="section-title" data-aos="fade-up">
          Reserva tu mesa
        </h2>
        <p
          className="section-sub mb-4"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Te esperamos con la mejor experiencia gastronómica.
        </p>

        <form
          className="form-reserva mx-auto"
          style={{ maxWidth: 640 }}
          onSubmit={enviar}
          data-aos="zoom-in"
        >
          <div className="mb-3">
            <label className="form-label">Nombre completo</label>
            <input
              className="form-control"
              placeholder="Ej: Paola Castillo"
              value={reserva.nombre}
              onChange={(e) =>
                setReserva({ ...reserva, nombre: e.target.value })
              }
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Fecha</label>
              <input
                type="date"
                className="form-control"
                value={reserva.fecha}
                onChange={(e) =>
                  setReserva({ ...reserva, fecha: e.target.value })
                }
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Hora</label>
              <input
                type="time"
                className="form-control"
                value={reserva.hora}
                onChange={(e) =>
                  setReserva({ ...reserva, hora: e.target.value })
                }
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label">Número de personas</label>
            <input
              type="number"
              min="1"
              className="form-control"
              value={reserva.personas}
              onChange={(e) =>
                setReserva({ ...reserva, personas: e.target.value })
              }
            />
          </div>

          <button type="submit" className="btn-reservar w-100">
            Confirmar Reserva
          </button>
        </form>
      </Container>
    </section>
  );
}
