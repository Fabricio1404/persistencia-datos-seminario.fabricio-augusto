const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

// Servir HTML y JS
app.use(express.static(path.join(__dirname, "public")));

// Memoria del servidor
let alumnosPorCliente = {};

// 🔹 SIN ID → crear nuevo
app.get("/identificar", (req, res) => {
    const id = uuidv4();
    alumnosPorCliente[id] = [];
    res.json({ id });
});

// 🔹 CON ID → reutilizar
app.get("/identificar/:id", (req, res) => {
    const id = req.params.id;

    if (!alumnosPorCliente[id]) {
        alumnosPorCliente[id] = [];
    }

    res.json({ id });
});

// Guardar alumno
app.post("/alumnos", (req, res) => {
    const { id, nombre, edad, nota } = req.body;

    if (!id || !nombre || !edad || !nota) {
        return res.status(400).json({ error: "Datos incompletos" });
    }

    if (!alumnosPorCliente[id]) {
        alumnosPorCliente[id] = [];
    }

    alumnosPorCliente[id].push({
        nombre,
        edad: parseInt(edad),
        nota: parseFloat(nota)
    });

    res.json({ mensaje: "Alumno guardado" });
});

// Obtener alumnos ORDENADOS
app.get("/alumnos/:id", (req, res) => {
    const id = req.params.id;
    let lista = alumnosPorCliente[id] || [];

    lista.sort((a, b) => {
        if (b.nota !== a.nota) {
            return b.nota - a.nota;
        }
        return a.nombre.localeCompare(b.nombre);
    });

    res.json(lista);
});

// Levantar servidor en red
app.listen(3000, "0.0.0.0", () => {
    console.log("Servidor corriendo en http://localhost:3000");
});