import { Container } from "react-bootstrap";

export default function FooterCustom() {
  return (
    <footer>
      <Container>
        <h5 className="fw-bold mb-3">El Sabor Escondido</h5>
        <p>El arte de cocinar, el placer de compartir ❤️</p>
        <div className="mb-3">
          <a href="#"><i className="bi bi-facebook"></i></a>
          <a href="#"><i className="bi bi-instagram"></i></a>
          <a href="#"><i className="bi bi-tiktok"></i></a>
        </div>
        <small>© {new Date().getFullYear()} Todos los derechos reservados.</small>
      </Container>
    </footer>
  );
}
