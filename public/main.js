const BASE_URL = window.location.origin;

let clienteId = localStorage.getItem("clienteId");

// Obtener ID
async function obtenerId() {
    let idGuardado = localStorage.getItem("clienteId");

    let url = BASE_URL + "/identificar";

    if (idGuardado) {
        url += "/" + idGuardado;
    }

    let res = await fetch(url);
    let data = await res.json();

    clienteId = data.id;
    localStorage.setItem("clienteId", clienteId);
}

// Agregar alumno
async function agregarPersona() {
    let nombre = document.getElementById("nombre").value;
    let edad = document.getElementById("edad").value;
    let nota = document.getElementById("nota").value;

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

    document.getElementById("nombre").value = "";
    document.getElementById("edad").value = "";
    document.getElementById("nota").value = "";
}

// Mostrar alumnos
async function mostrar() {
    let res = await fetch(BASE_URL + "/alumnos/" + clienteId);
    let data = await res.json();

    let tabla = document.getElementById("tabla");
    tabla.innerHTML = "";

    data.forEach(p => {
        tabla.innerHTML += `
            <tr>
                <td>${p.nombre}</td>
                <td>${p.edad}</td>
                <td>${p.nota}</td>
            </tr>
        `;
    });
}

// Inicializar
async function iniciar() {
    await obtenerId();
    mostrar();
}

iniciar();