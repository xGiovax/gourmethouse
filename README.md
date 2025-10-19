# 🍽️ El Sabor Escondido

## 📖 Descripción del Proyecto
**El Sabor Escondido** es un restaurante de comida típica salvadoreña que busca llevar el auténtico sabor del país a cada mesa, ya sea en el local o a domicilio.  
Este proyecto fue desarrollado como parte del curso **Desarrollo de Aplicaciones Web (DAW)**, con el objetivo de crear una **plataforma web moderna e interactiva** que permita a los clientes explorar el menú, realizar pedidos, hacer reservaciones y gestionar su carrito de compras en línea.

La página ofrece una experiencia intuitiva, rápida y visualmente atractiva, garantizando una navegación fluida tanto en computadoras como en dispositivos móviles.  
Con un diseño inspirado en la calidez del hogar salvadoreño, “El Sabor Escondido” busca conectar la tradición culinaria con la innovación tecnológica.

---

## 👩‍💻 Integrantes del Equipo de Desarrollo
- **Paola Matilde Orellana Castillo** – Frontend Developer / Coordinadora  
- **Giovanni Alberto Ruano Martínez** – Backend Developer  
- **Priscila Gámez** – Diseño UI/UX  
- **Ana** – Documentación / Testing  
- **Gabriela Vásquez** – Diseño gráfico / Soporte de contenido  

---

## 🧱 Arquitectura del Proyecto
El proyecto **El Sabor Escondido** fue desarrollado bajo una arquitectura **Full Stack simulada**, dividiendo el **frontend** (interfaz del usuario) y el **backend** (lógica del servidor), conectados mediante peticiones HTTP.  
No utiliza base de datos, pero su estructura está preparada para integrarla fácilmente en futuras versiones.

---

## 💻 Tecnologías Usadas

### 🖥️ Frontend
- **React 18 + Vite 5**  
- **HTML5**, **CSS3**, **JavaScript (ES6+)**
- **React Router DOM** – navegación entre páginas  
- **Axios** – comunicación con el backend  
- **Bootstrap / React-Bootstrap** – diseño responsive  
- **SweetAlert2** – alertas visuales  
- **AOS (Animate On Scroll)** – animaciones al desplazarse  

### ⚙️ Backend
- **Node.js v22.x**  
- **Express.js** – framework para el servidor  
- **CORS** – permitir conexión entre dominios  
- **Body-Parser** – manejo de datos JSON  

---

## 🧰 Herramientas de Desarrollo

| Herramienta | Uso principal |
|--------------|----------------|
| **Visual Studio Code** | Edición y desarrollo de código |
| **GitHub** | Control de versiones y respaldo del proyecto |
| **Trello / Notion** | Organización del trabajo, documentación y planificación |
| **Figma / Canva** | Diseño de interfaz, logotipo y elementos gráficos |
| **Postman** | Pruebas de endpoints del backend |

---

## 🚀 Funcionalidades Principales
- Página principal con presentación del restaurante y menú destacado  
- Sistema de **reservas en línea** con validaciones  
- **Carrito de compras** para pedidos a domicilio  
- Sección de **galería gastronómica** con animaciones y efectos visuales  
- **Formulario de contacto** con envío simulado  
- Sitio **totalmente responsive** para móviles, tablets y computadoras  

---

## 🌐 Enlace al Sitio Web
👉 [https://gourmethouse.vercel.app/](https://gourmethouse.vercel.app/)

*(Desarrollado y desplegado en Vercel como parte del proyecto académico DAW – Universidad Don Bosco)*

---

## 📚 Manuales del Proyecto

| Manual | Enlace |
|--------|---------|
| 📘 **Manual de Usuario – El Sabor Escondido** | [Abrir en Notion](https://www.notion.so/Manual-de-Usuario-El-Sabor-Escondido-2917f1360fd6808bb1d9e5637c3b9f04?source=copy_link) |
| 💻 **Manual del Programador – El Sabor Escondido** | [Abrir en Notion](https://www.notion.so/Manual-del-Programador-El-Sabor-Escondido-2917f1360fd6804f8ab1d16e5beb1d09?source=copy_link) |

---
Este proyecto está bajo la licencia Creative Commons Atribución-NoComercial 4.0 Internacional (CC BY-NC 4.0).
Esto significa que se puede compartir y adaptar con fines educativos o personales, siempre que se dé crédito a los autores originales y no se utilice con fines comerciales.

🔗 Más información: https://creativecommons.org/licenses/by-nc/4.0/
---

## 🧩 Estructura del Proyecto

```bash
ElSaborEscondido/
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Componentes de React
│   │   ├── pages/           # Páginas principales
│   │   ├── context/         # Contexto del carrito
│   │   ├── assets/          # Imágenes, íconos y estilos
│   │   └── App.jsx          # Configuración principal
│   ├── index.html
│   └── package.json
│
├── backend/
│   ├── routes/              # Endpoints de la API simulada
│   ├── controllers/         # Lógica del negocio sin base de datos
│   ├── data/                # Archivos JSON con datos simulados
│   ├── server.js            # Servidor principal Express
│   └── package.json
│
└── README.md

© 2025 – Universidad Don Bosco
Proyecto Académico de la asignatura Desarrollo de Aplicaciones Web (DAW).
