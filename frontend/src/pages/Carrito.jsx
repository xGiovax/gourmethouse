import { useContext } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { CarritoContext } from "../context/CarritoContext";
import Swal from "sweetalert2";

export default function Carrito() {
  const { carrito, eliminarDelCarrito, vaciarCarrito } =
    useContext(CarritoContext);

  const total = carrito.reduce(
    (acc, item) => acc + item.precio * (item.cantidad || 1),
    0
  );

const confirmarCompra = async () => {
  if (carrito.length === 0) {
    Swal.fire({
      icon: "warning",
      title: "Carrito vacío",
      text: "Agrega platillos antes de confirmar tu pedido.",
      confirmButtonColor: "#3D1F03",
    });
    return;
  }

  try {
    const res = await fetch("http://localhost:4000/api/pedidos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productos: carrito.map((item) => ({
          nombre: item.nombre,
          precio: item.precio,
        })),
      }),
    });

    const data = await res.json();

    if (res.ok) {
      Swal.fire({
        icon: "success",
        title: "¡Pedido confirmado!",
        text: data.mensaje,
        confirmButtonColor: "#3D1F03",
      });
      vaciarCarrito();
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: data.mensaje || "No se pudo guardar el pedido",
        confirmButtonColor: "#3D1F03",
      });
    }
  } catch  {
    Swal.fire({
      icon: "success",
      title: "¡Pedido confirmado!",
      text: "Tu pedido pronto estará listo",
      confirmButtonColor: "#3D1F03",
    });
  }
};


  return (
    <section className="section">
      <Container>
        <h2 className="section-title">Tu Pedido</h2>
        <p className="section-sub">Revisa los platillos seleccionados antes de confirmar.</p>

        {carrito.length === 0 ? (
          <div className="text-center mt-5" data-aos="fade-up">
            <i className="bi bi-cart-x display-4 text-muted"></i>
            <h5 className="mt-3 text-secondary">Tu carrito está vacío</h5>
            <p>Explora el menú y añade tus platillos favoritos.</p>
          </div>
        ) : (
          <div
            className="carrito-box mx-auto mt-4"
            style={{ maxWidth: "850px" }}
          >
            <Table responsive bordered hover className="carrito-tabla align-middle">
              <thead>
                <tr>
                  <th>Platillo</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {carrito.map((item, index) => (
                  <tr key={index}>
                    <td className="fw-semibold">{item.nombre}</td>
                    <td>${item.precio.toFixed(2)}</td>
                    <td>{item.cantidad || 1}</td>
                    <td>${(item.precio * (item.cantidad || 1)).toFixed(2)}</td>
                    <td>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => eliminarDelCarrito(item.id)}
                      >
                        <i className="bi bi-trash3"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <div className="d-flex justify-content-between align-items-center mt-4">
              <h5 className="fw-bold mb-0">
                Total: <span className="text-danger">${total.toFixed(2)}</span>
              </h5>
              <div className="d-flex gap-2">
                
                <Button className="btn-rojo" onClick={confirmarCompra}>
                  Finalizar compra
                </Button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
