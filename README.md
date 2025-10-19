# 🍽️ El Sabor Escondido

## 📖 Descripción del Proyecto
**El Sabor Escondido** es un restaurante de comida típica salvadoreña que busca llevar el auténtico sabor del país a cada mesa, ya sea en el local o a domicilio.  
Este proyecto fue desarrollado como parte del curso **Desarrollo de Aplicaciones Web (DAW)**, con el objetivo de crear una **plataforma web moderna e interactiva** que permita a los clientes explorar el menú, realizar pedidos, hacer reservaciones y gestionar su carrito de compras en línea.

La página ofrece una experiencia intuitiva, rápida y visualmente atractiva, garantizando una navegación fluida tanto en computadoras como en dispositivos móviles.  
Con un diseño inspirado en la calidez del hogar salvadoreño, “El Sabor Escondido” busca conectar la tradición culinaria con la innovación tecnológica.

---

## 👩‍💻 Integrantes del Equipo de Desarrollo
- **Paola Matilde Orellana Castillo** – Frontend Developer / Coordinadora  
- **Giovanni Alberto Ruano Martínez** – Backend Developer / Base de Datos  
- **Priscila Gámez** – Diseño UI/UX  
- **Ana** – Documentación / Testing  
- **Gabriela Vásquez** – Diseño gráfico / Soporte de contenido  

---

## 🧱 Arquitectura del Proyecto
El proyecto **El Sabor Escondido** fue desarrollado bajo una arquitectura **Full Stack**, separando el **frontend** (interfaz del usuario) del **backend** (servidor y lógica de negocio), conectados mediante una **API REST**.

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
- **MSSQL y msnodesqlv8** – conexión con **SQL Server 2022**

### 🗃️ Base de Datos
- **Microsoft SQL Server 2022**  
Estructurada para manejar información de usuarios, productos, pedidos y reservas.

---

## 🧰 Herramientas de Desarrollo

| Herramienta | Uso principal |
|--------------|----------------|
| **Visual Studio Code** | Edición y desarrollo de código |
| **GitHub** | Control de versiones y respaldo del proyecto |
| **Trello** | Organización del trabajo y asignación de tareas (metodología Scrum) |
| **Figma / Canva** | Diseño de interfaz, logotipo y elementos gráficos |
| **Postman** | Pruebas de endpoints de la API REST |

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
👉 https://gourmethouse.vercel.app/

*(Desarrollado y desplegado en Vercel como parte del proyecto académico DAW – Universidad Don Bosco)*

---

## 🧩 Estructura del Proyecto

```bash
gourmethouse/
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
│   ├── routes/              # Endpoints de la API
│   ├── controllers/         # Lógica del negocio
│   ├── db/                  # Conexión SQL Server
│   ├── server.js            # Servidor principal Express
│   └── package.json
│
└── README.md

---

## 🪪 Licencia
Este proyecto está bajo la licencia **Creative Commons Atribución-NoComercial 4.0 Internacional (CC BY-NC 4.0)**.  
Esto significa que se puede compartir y adaptar con fines **educativos o personales**, siempre que se dé crédito a los autores originales y **no se utilice con fines comerciales**.

🔗 Más información: [https://creativecommons.org/licenses/by-nc/4.0/](https://creativecommons.org/licenses/by-nc/4.0/)

---

© 2025 – *Universidad Don Bosco*  
Proyecto Académico de la asignatura **Desarrollo de Aplicaciones Web (DAW)**

