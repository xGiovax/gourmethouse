import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css"; // si estás usando Bootstrap
import "./index.css"; // 👈 asegúrate que esta ruta coincida con tu archivo
import "bootstrap-icons/font/bootstrap-icons.css";
import "aos/dist/aos.css";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init({ duration: 800 });


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
