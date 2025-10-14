import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavbarCustom";
import Footer from "./components/FooterCustom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Reservas from "./pages/Reservas";
import Carrito from "./pages/Carrito";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import { CarritoProvider } from "./context/CarritoProvider"; 
import ProtectedRoute from "./components/ProtectedRoute";
import NavbarCustom from "./components/NavbarCustom";
import FooterCustom from "./components/FooterCustom";


export default function App() {
  return (
    <BrowserRouter>
      <CarritoProvider> {/* 👈 Muy importante */}
        <NavbarCustom />
        <div style={{ marginTop: "70px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/reservas" element={<Reservas />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/login" element={<Login />} />
             {}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
          </Routes>
        </div>
        <FooterCustom />
      </CarritoProvider>
    </BrowserRouter>
  );
}
