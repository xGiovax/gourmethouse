import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import pupusas from "../assets/platillos/pupusas.jpg";
import yuca from "../assets/platillos/yuca.png";
import empanadas from "../assets/platillos/empanadas.jpg";

const destacados = [
  { id: 1, nombre: "Pupusas Revueltas", desc: "Queso + chicharrón", precio: 1.25, img: pupusas },
  { id: 2, nombre: "Yuca Frita", desc: "Crujiente y dorada", precio: 2.50, img: yuca },
  { id: 3, nombre: "Empanadas de Leche", desc: "Dulce y cremosa", precio: 1.75, img: empanadas},
];

export default function Home() {
  return (
    <>
      <section className="hero"
        style={{
        backgroundImage: `linear-gradient(rgba(180, 120, 71, 0.75), rgba(68, 41, 23, 0.75)), url(${pupusas})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        color: "#fff",
        textAlign: "center",
        padding: "6rem 1rem",
      }}>
        <Container>
          <h1>Descubre la pasión por el sabor</h1>
          <p>Tradición salvadoreña con un toque moderno. Ven a disfrutar de lo mejor de nuestra cocina.</p>
          <div>
            <Button as={Link} to="/reservas" className="btn-rojo me-2">Reservar ahora</Button>
            <Button as={Link} to="/menu" className="btn-outline">Ver menú</Button>
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <h2 className="section-title">Platillos destacados</h2>
          <p className="section-sub">Nuestros favoritos, preparados con amor y frescura.</p>
          <Row className="g-4">
            {destacados.map(p => (
              <Col key={p.id} xs={12} sm={6} lg={4}>
                <Card className="h-100">
                  <Card.Img src={p.img} />
                  <Card.Body>
                    <Card.Title>{p.nombre}</Card.Title>
                    <Card.Text>{p.desc}</Card.Text>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="price">${p.precio.toFixed(2)}</span>
                      <Button as={Link} to="/menu" className="btn-rojo">Ordenar</Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
}
