import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function NavbarCustom() {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("admin") === "true";
  const logout = () => { localStorage.removeItem("admin"); navigate("/login"); };

  return (
    <Navbar expand="lg" className="sticky-top">
      <Container>
        <Navbar.Brand as={Link} to="/">🍴 GourmetHouse</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto" style={{ gap: "1rem" }}>
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/menu">Menú</Nav.Link>
            <Nav.Link as={Link} to="/reservas">Reservas</Nav.Link>
            <Nav.Link as={Link} to="/carrito">Carrito</Nav.Link>
            {isAdmin && <Nav.Link as={Link} to="/admin">Panel</Nav.Link>}
          </Nav>
          {isAdmin ? (
            <Button variant="outline-danger" size="sm" onClick={logout}>
              Salir
            </Button>
          ) : (
            <Button as={Link} to="/login" className="btn-rojo btn-sm">
              Iniciar sesión
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
