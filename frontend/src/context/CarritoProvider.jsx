import React, { useState } from "react";
import { CarritoContext } from "./CarritoContext";

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (platillo) => {
    setCarrito([...carrito, platillo]);
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter((p) => p.id !== id));
  };

  return (
    <CarritoContext.Provider
      value={{ carrito, agregarAlCarrito, eliminarDelCarrito }}
    >
      {children}
    </CarritoContext.Provider>
  );
}
