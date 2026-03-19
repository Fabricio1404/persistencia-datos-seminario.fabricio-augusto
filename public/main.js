const BASE_URL = window.location.origin;

let clienteId = localStorage.getItem("clienteId");

// Obtiene o recupera un ID de cliente para separar datos por navegador.
async function obtenerId() {
    const idGuardado = localStorage.getItem("clienteId");

    let url = BASE_URL + "/identificar";

    if (idGuardado) {
        url += "/" + idGuardado;
    }

    const res = await fetch(url);
    const data = await res.json();

    clienteId = data.id;
    localStorage.setItem("clienteId", clienteId);
}

// Envía un alumno al backend y vuelve a renderizar la tabla.
async function agregarPersona() {
    const nombreInput = document.getElementById("nombre");
    const edadInput = document.getElementById("edad");
    const notaInput = document.getElementById("nota");

    const nombre = nombreInput.value.trim();
    const edad = edadInput.value;
    const nota = notaInput.value;

    if (nombre === "" || edad === "" || nota === "") {
        alert("Complete todos los campos");
        return;
    }

    await fetch(BASE_URL + "/alumnos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: clienteId,
            nombre,
            edad,
            nota
        })
    });

    mostrar();

    nombreInput.value = "";
    edadInput.value = "";
    notaInput.value = "";
}

// Renderiza la lista ya ordenada por el servidor.
async function mostrar() {
    const res = await fetch(BASE_URL + "/alumnos/" + clienteId);
    const data = await res.json();

    const tabla = document.getElementById("tabla");
    tabla.innerHTML = data.map((p) => `
        <tr>
            <td>${p.nombre}</td>
            <td>${p.edad}</td>
            <td>${p.nota}</td>
        </tr>
    `).join("");
}

// Inicializar
async function iniciar() {
    await obtenerId();
    mostrar();
}

iniciar();