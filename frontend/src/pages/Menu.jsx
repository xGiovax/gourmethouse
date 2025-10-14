import { useContext } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { CarritoContext } from "../context/CarritoContext";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import pupusas from "../assets/platillos/pupusas.jpg";
import yuca from "../assets/platillos/yuca.png";
import sopagallina from "../assets/platillos/sopagallina.jpg";
import tamales from "../assets/platillos/tamales.jpg";
import empanadas from "../assets/platillos/empanadas.jpg";
import atol from "../assets/platillos/atol.png";

const platillos = [
  {
    id: 1,
    nombre: "Pupusas Revueltas",
    desc: "Maíz relleno de queso y chicharrón, acompañadas de curtido y salsa.",
    precio: 1.25,
    img: pupusas
  },
  {
    id: 2,
    nombre: "Yuca con Chicharrón",
    desc: "Yuca cocida/frita con chicharrón, curtido y salsa típica.",
    precio: 3.50,
    img: yuca
  },
  {
    id: 3,
    nombre: "Sopa de Gallina India",
    desc: "Caldo tradicional con hierbas y vegetales; sabor casero.",
    precio: 5.75,
    img: sopagallina
  },
  {
    id: 4,
    nombre: "Tamales de Elote",
    desc: "Suaves y dulces, servidos con crema y queso.",
    precio: 2.00,
    img: tamales
  },
  {
    id: 5,
    nombre: "Empanadas de Leche",
    desc: "De plátano, rellenas de leche poleada y espolvoreadas con azúcar.",
    precio: 1.75,
    img: empanadas
  },
  {
    id: 6,
    nombre: "Atol de Elote",
    desc: "Bebida tradicional de maíz tierno, cremosa y aromática.",
    precio: 1.50,
    img: atol
  }
];

export default function Menu() {
  const { agregarAlCarrito } = useContext(CarritoContext);

  const add = (p) => {
    agregarAlCarrito(p);
    Swal.fire({
      icon: "success",
      title: "Agregado al carrito",
      text: `${p.nombre} se añadió correctamente`,
      timer: 1200,
      showConfirmButton: false
    });
  };

  return (
    <section className="section">
      <Container>
        <h2 className="section-title">Menú Típico Salvadoreño</h2>
        <p className="section-sub">
          Seis clásicos de nuestra cocina, listos para disfrutar.
        </p>

        <Row className="g-4">
          {platillos.map((p) => (
            <Col key={p.id} xs={12} sm={6} lg={4}>
              <Card className="h-100">
                <Card.Img src={p.img} alt={p.nombre} className="card-img-top" />
                <Card.Body className="d-flex flex-column">
                  <span className="badge-soft mb-2">Típico</span>
                  <Card.Title className="mb-1">{p.nombre}</Card.Title>
                  <Card.Text className="text-muted" style={{ minHeight: 60 }}>
                    {p.desc}
                  </Card.Text>

                  <div className="mt-auto d-flex justify-content-between align-items-center">
                    <span className="price">${p.precio.toFixed(2)}</span>
                    <Button className="btn-rojo" onClick={() => add(p)}>
                      Agregar
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
