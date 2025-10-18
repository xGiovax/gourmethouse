import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import sql from "mssql";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// =========================
// 🔹 CONFIGURACIÓN DE SQL SERVER (Azure)
// =========================
const dbConfig = {
   user: "paola_admin",
  password: "P-123456",
  server: "gourmethouse-sqlserver.database.windows.net",
  database: "Restaurante",
  options: {
    encrypt: true,
    trustServerCertificate: false
  },
};

// =========================
// 🔹 CONEXIÓN GLOBAL
// =========================
let poolPromise;
async function getConnection() {
  if (!poolPromise) {
    poolPromise = sql
      .connect(dbConfig)
      .then((pool) => {
        console.log("✅ Conectado a la base de datos Restaurante correctamente");
        return pool;
      })
      .catch((err) => {
        console.error("❌ Error al conectar a la base de datos:", err);
        poolPromise = null;
        throw err;
      });
  }
  return poolPromise;
}

// =========================
// 🔹 ENDPOINT DE PRUEBA
// =========================
app.get("/", (req, res) => {
  res.send("🍽️ API de GourmetHouse funcionando correctamente 🚀");
});

// =========================
// 🔹 GUARDAR RESERVA
// =========================
app.post("/api/reservas", async (req, res) => {
  const { nombre, fecha, hora, personas } = req.body;

  try {
    if (!nombre || !fecha || !hora || !personas) {
      return res.status(400).json({ mensaje: "Faltan datos para guardar la reserva." });
    }

    const pool = await getConnection();

    const fechaSQL = new Date(fecha);
    const [horas, minutos] = hora.split(":");
    const horaDate = new Date(0, 0, 0, parseInt(horas), parseInt(minutos));
    const personasNum = parseInt(personas);

    console.log("🧾 Datos recibidos:", { nombre, fechaSQL, horaDate, personasNum });

    const result = await pool.request()
      .input("nombre", sql.NVarChar(100), nombre)
      .input("fecha", sql.Date, fechaSQL)
      .input("hora", sql.Time, horaDate)
      .input("personas", sql.Int, personasNum)
      .query(`
        INSERT INTO Reservas (nombre, fecha, hora, personas)
        VALUES (@nombre, @fecha, @hora, @personas)
      `);

    console.log("✅ Filas afectadas:", result.rowsAffected);
    res.json({ mensaje: "Reserva guardada correctamente ✅" });

  } catch (error) {
    console.error("❌ Error al guardar reserva:", error);
    res.status(500).json({ mensaje: "Error al guardar la reserva ❌", detalle: error.message });
  }
});

// =========================
// 🔹 GUARDAR PEDIDOS
// =========================
app.post("/api/pedidos", async (req, res) => {
  const productos = Array.isArray(req.body.productos) ? req.body.productos : req.body;
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

// =========================
// 🔹 OBTENER RESERVAS
// =========================
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

// =========================
// 🔹 OBTENER PEDIDOS
// =========================
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

// =========================
// 🔹 ELIMINAR RESERVA
// =========================
app.delete("/api/reservas/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getConnection();
    await pool.request().input("id", sql.Int, id).query("DELETE FROM Reservas WHERE id = @id");
    res.json({ mensaje: "Reserva eliminada correctamente ✅" });
  } catch (error) {
    console.error("Error al eliminar reserva:", error);
    res.status(500).json({ mensaje: "Error al eliminar reserva ❌" });
  }
});

// =========================
// 🔹 ELIMINAR PEDIDO
// =========================
app.delete("/api/pedidos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getConnection();
    await pool.request().input("id", sql.Int, id).query("DELETE FROM Pedidos WHERE id = @id");
    res.json({ mensaje: "Pedido eliminado correctamente ✅" });
  } catch (error) {
    console.error("Error al eliminar pedido:", error);
    res.status(500).json({ mensaje: "Error al eliminar pedido ❌" });
  }
});

// =========================
// 🔹 LOGIN SIMPLE
// =========================
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

// =========================
// 🔹 INICIAR SERVIDOR
// =========================
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
