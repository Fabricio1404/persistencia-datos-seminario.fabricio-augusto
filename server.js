const express = require("express");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const app = express();
app.use(express.json());

// Sirve todo lo que esta dentro de /public (HTML, JS, CSS).
app.use(express.static(path.join(__dirname, "public")));

// Estructura en memoria: { [clienteId]: [{ nombre, edad, nota }] }
const alumnosPorCliente = {};

// Si el cliente no tiene ID, se crea uno nuevo y se inicializa su lista.
app.get("/identificar", (req, res) => {
    const id = uuidv4();
    alumnosPorCliente[id] = [];
    res.json({ id });
});

// Si ya tiene ID, se reutiliza; si no existe en memoria, se crea vacio.
app.get("/identificar/:id", (req, res) => {
    const id = req.params.id;

    if (!alumnosPorCliente[id]) {
        alumnosPorCliente[id] = [];
    }

    res.json({ id });
});

// Guarda un alumno para el cliente actual.
app.post("/alumnos", (req, res) => {
    const { id, nombre, edad, nota } = req.body;
    const edadNumero = Number(edad);
    const notaNumero = Number(nota);

    if (!id || !nombre || !Number.isFinite(edadNumero) || !Number.isFinite(notaNumero)) {
        return res.status(400).json({ error: "Datos incompletos" });
    }

    if (!alumnosPorCliente[id]) {
        alumnosPorCliente[id] = [];
    }

    alumnosPorCliente[id].push({
        nombre: nombre.trim(),
        edad: edadNumero,
        nota: notaNumero
    });

    res.json({ mensaje: "Alumno guardado" });
});

// Devuelve la lista ordenada por nota (desc) y luego por nombre (asc).
app.get("/alumnos/:id", (req, res) => {
    const id = req.params.id;
    const lista = alumnosPorCliente[id] || [];

    lista.sort((a, b) => {
        if (b.nota !== a.nota) {
            return b.nota - a.nota;
        }
        return a.nombre.localeCompare(b.nombre);
    });

    res.json(lista);
});

// Escucha en toda la red local para permitir acceso desde otros dispositivos.
app.listen(3000, "0.0.0.0", () => {
    console.log("Servidor corriendo en http://localhost:3000");
});