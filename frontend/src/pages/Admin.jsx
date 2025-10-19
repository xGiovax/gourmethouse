import { useEffect, useState } from "react";
import { Container, Table, Navbar, Button, Tab, Tabs } from "react-bootstrap";
import Swal from "sweetalert2";

export default function Admin() {
  const [reservas, setReservas] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [key, setKey] = useState("reservas");

  // 🔹 Cargar reservas
  const obtenerReservas = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/reservas");
      const data = await res.json();
      setReservas(data);
    } catch (err) {
      console.error("Error al obtener reservas:", err);
    }
  };

  // 🔹 Cargar pedidos
  const obtenerPedidos = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/pedidos");
      const data = await res.json();
      setPedidos(data);
    } catch (err) {
      console.error("Error al obtener pedidos:", err);
    }
  };

  // 🔹 Eliminar reserva
  const eliminarReserva = async (id) => {
    const confirmar = await Swal.fire({
      title: "¿Eliminar reserva?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3D1F03",
    });

    if (confirmar.isConfirmed) {
      try {
        await fetch(`http://localhost:4000/api/reservas/${id}`, {
          method: "DELETE",
        });
        Swal.fire("Eliminada", "La reserva fue eliminada correctamente", "success");
        obtenerReservas();
      } catch {
        Swal.fire("Error", "No se pudo eliminar la reserva", "error");
      }
    }
  };

  // 🔹 Eliminar pedido
  const eliminarPedido = async (id) => {
    const confirmar = await Swal.fire({
      title: "¿Eliminar pedido?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3D1F03",
    });

    if (confirmar.isConfirmed) {
      try {
        await fetch(`http://localhost:4000/api/pedidos/${id}`, {
          method: "DELETE",
        });
        Swal.fire("Eliminado", "El pedido fue eliminado correctamente", "success");
        obtenerPedidos();
      } catch {
        Swal.fire("Error", "No se pudo eliminar el pedido", "error");
      }
    }
  };

  useEffect(() => {
    obtenerReservas();
    obtenerPedidos();
  }, []);

  return (
    <>
      {/* 🔹 Encabezado */}
      
      {/* 🔹 Contenido */}
      <Container className="admin-container mt-4 p-4 rounded shadow-sm">
        <Tabs
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-4 admin-tabs"
          fill
        >
          {/* 🔹 Pestaña de Reservas */}
          <Tab eventKey="reservas" title="📅 Reservas">
            <h3 className="admin-title text-center mb-4">Listado de Reservas</h3>
            <Table bordered hover responsive className="admin-table align-middle text-center">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Personas</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {reservas.length > 0 ? (
                  reservas.map((r) => (
                    <tr key={r.id}>
                      <td>{r.id}</td>
                      <td>{r.nombre}</td>
                      <td>{new Date(r.fecha).toLocaleDateString()}</td>
                      <td>{r.hora}</td>
                      <td>{r.personas}</td>
                      <td>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => eliminarReserva(r.id)}
                        >
                          Eliminar
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-muted py-3">
                      No hay reservas registradas
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Tab>

          {/* 🔹 Pestaña de Pedidos */}
          <Tab eventKey="pedidos" title="🛍️ Pedidos">
            <h3 className="admin-title text-center mb-4">Listado de Pedidos</h3>
            <Table bordered hover responsive className="admin-table align-middle text-center">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Producto</th>
                  <th>Precio ($)</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.length > 0 ? (
                  pedidos.map((p) => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.nombre_producto}</td>
                      <td>{p.precio.toFixed(2)}</td>
                      <td>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => eliminarPedido(p.id)}
                        >
                          Eliminar
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-muted py-3">
                      No hay pedidos registrados
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Tab>
        </Tabs>
      </Container>
    </>
  );
}
