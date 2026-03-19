# Sistema de Gestión de Alumnos

## Descripción

Este proyecto consiste en una aplicación web desarrollada con JavaScript que permite gestionar alumnos ingresando:

* Nombre
* Edad
* Nota

El sistema permite cargar datos, visualizarlos en una tabla y ordenarlos automáticamente por **nota (de mayor a menor)** y **nombre (A-Z)**.

Además, cada usuario que accede al sistema tiene su propia lista de alumnos, la cual se mantiene al recargar la página gracias al uso de almacenamiento local en el navegador.

---

## Funcionamiento General

El sistema está dividido en dos partes:

### Frontend (Navegador)

* Interfaz web realizada con HTML, CSS y JavaScript.
* Permite ingresar alumnos y visualizar la lista.
* Usa `localStorage` para guardar un identificador único del cliente.

### Backend (Servidor)

* Desarrollado con Node.js y Express.
* Gestiona los datos de los alumnos.
* Mantiene la información en memoria separada por cliente mediante un ID único.

---

## Tecnologías utilizadas

* JavaScript
* Node.js
* Express
* HTML5
* CSS3

---

## Estructura del proyecto

```
/proyecto
│
├── server.js
├── package.json
└── public/
    ├── index.html
  └── main.js
```

---

## Cómo ejecutar el proyecto

### 1. Clonar el repositorio

```
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_PROYECTO>
```

---

### 2. Instalar dependencias

```
npm install
```

---

### 3. Ejecutar el servidor

```
node server.js
```

---

### 4. Abrir en el navegador

```
http://localhost:3000
```

---

## Acceso desde otros dispositivos

1. Obtener la IP local del equipo:

```
ipconfig
```

2. Buscar la dirección IPv4 (por ejemplo: 192.168.0.15)

3. Desde otro dispositivo en la misma red, ingresar:

```
http://192.168.0.15:3000
```

---

## Persistencia de datos

* Cada usuario tiene un ID único almacenado en `localStorage`.
* El servidor utiliza ese ID para guardar los datos en memoria.
* Al recargar la página, el usuario mantiene su información.

---

## Funcionalidades

* Carga de alumnos (nombre, edad, nota)
* Visualización en tabla
* Orden automático por:

  * Nota (descendente)
  * Nombre (ascendente)
* Separación de datos por usuario
* Acceso desde múltiples dispositivos en la misma red

---

## Limitaciones

* Los datos se almacenan en memoria del servidor.
* Si el servidor se apaga, los datos se pierden.
* No se utiliza base de datos (según consigna del trabajo).

---

## Conclusión

Este proyecto permite aplicar conceptos fundamentales de desarrollo web:

* Comunicación cliente-servidor
* Manejo de APIs REST
* Uso de almacenamiento local
* Gestión de datos en memoria
* Trabajo con múltiples clientes

---

## Autor

* Fabricio Augusto

---
