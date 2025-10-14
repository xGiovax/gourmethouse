import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import sql from "mssql";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 🔹 CONFIGURACIÓN DE SQL SERVER (usuario giovanni)
const dbConfig = {
  user: "giovanni",
  password: "Giovanni123!",
  server: "DESKTOP-VDTUKI5",
  database: "Restaurante",
  options: {
    trustServerCertificate: true,
  },
};

// 🔹 FUNCIÓN PARA OBTENER UNA CONEXIÓN ACTIVA
let poolPromise;
async function getConnection() {
  if (!poolPromise) {
    poolPromise = sql.connect(dbConfig)
      .then(pool => {
        console.log("✅ Conectado a la base de datos Restaurante correctamente");
        return pool;
      })
      .catch(err => {
        console.error("❌ Error al conectar a la base de datos:", err);
        poolPromise = null; // si falla, limpiar para reintentar
        throw err;
      });
  }
  return poolPromise;
}

// 🔹 ENDPOINT PARA GUARDAR RESERVAS
app.post("/api/reservas", async (req, res) => {
  const { nombre, fecha, hora, personas } = req.body;

  try {
    if (!nombre || !fecha || !hora || !personas) {
      return res.status(400).json({ mensaje: "Faltan datos para guardar la reserva." });
    }

    const pool = await getConnection();

    // 🔹 Convertir los valores correctamente
    const fechaSQL = new Date(fecha);
    const [horas, minutos] = hora.split(":"); // separar HH:mm
    const horaDate = new Date(0, 0, 0, parseInt(horas), parseInt(minutos)); // crear objeto Date solo con hora
    const personasNum = parseInt(personas);

    console.log("🧾 Datos recibidos:", { nombre, fechaSQL, horaDate, personasNum });

    const result = await pool.request()
      .input("nombre", sql.NVarChar(100), nombre)
      .input("fecha", sql.Date, fechaSQL)
      .input("hora", sql.Time, horaDate) // 👈 pasamos un Date en lugar de string
      .input("personas", sql.Int, personasNum)
      .query(`
        INSERT INTO Reservas (nombre, fecha, hora, personas)
        VALUES (@nombre, @fecha, @hora, @personas)
      `);

    console.log("✅ Filas afectadas:", result.rowsAffected);
    res.json({ mensaje: "Reserva guardada correctamente ✅" });

  } catch (error) {
    console.error("❌ Error al guardar reserva:", error);
    res.status(500).json({
      mensaje: "Error al guardar la reserva ❌",
      detalle: error.message,
    });
  }
});


// 🔹 ENDPOINT PARA GUARDAR PEDIDOS
app.post("/api/pedidos", async (req, res) => {
  const { productos } = req.body;
  try {
    const pool = await getConnection();

    for (const p of productos) {
      await pool.request()
        .input("nombre_producto", sql.NVarChar, p.nombre)
        .input("precio", sql.Decimal(10, 2), p.precio)
        .query(`
          INSERT INTO Pedidos (nombre_producto, precio)
          VALUES (@nombre_producto, @precio)
        `);
    }

    res.json({ mensaje: "Pedido guardado correctamente ✅" });
  } catch (error) {
    console.error("Error al guardar pedido:", error);
    res.status(500).json({ mensaje: "Error al guardar pedido ❌" });
  }
});

// 🔹 INICIAR SERVIDOR
const PORT = 4000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));


// 🔹 Obtener todas las reservas
app.get("/api/reservas", async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM Reservas ORDER BY fecha DESC");
    res.json(result.recordset);
  } catch (error) {
    console.error("Error al obtener reservas:", error);
    res.status(500).json({ mensaje: "Error al obtener reservas" });
  }
});

// 🔹 Obtener todos los pedidos
app.get("/api/pedidos", async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM Pedidos ORDER BY id DESC");
    res.json(result.recordset);
  } catch (error) {
    console.error("Error al obtener pedidos:", error);
    res.status(500).json({ mensaje: "Error al obtener pedidos" });
  }
});

// 🔹 Eliminar reserva
app.delete("/api/reservas/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getConnection();
    await pool.request().input("id", sql.Int, id).query("DELETE FROM Reservas WHERE id = @id");
    res.json({ mensaje: "Reserva eliminada correctamente ✅" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar reserva ❌" });
  }
});

// 🔹 Eliminar pedido
app.delete("/api/pedidos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getConnection();
    await pool.request().input("id", sql.Int, id).query("DELETE FROM Pedidos WHERE id = @id");
    res.json({ mensaje: "Pedido eliminado correctamente ✅" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar pedido ❌" });
  }
});

// 🔹 LOGIN SIMPLE
app.post("/api/login", async (req, res) => {
  const { usuario, contrasena } = req.body;

  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input("usuario", sql.NVarChar(50), usuario)
      .input("contrasena", sql.NVarChar(100), contrasena)
      .query("SELECT * FROM Usuarios WHERE usuario = @usuario AND contrasena = @contrasena");

    if (result.recordset.length > 0) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ success: false });
  }
});
