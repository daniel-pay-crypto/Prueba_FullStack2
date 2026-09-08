
let productos = [
    { codigo: "POC-001", nombre: "Poción de Curación", precio: 5, stock: 20, categoria: "Pociones" },
    { codigo: "PAN-001", nombre: "Pan", precio: 2, stock: 50, categoria: "Comida" },
    { codigo: "DIA-001", nombre: "Diamante", precio: 10, stock: 8, categoria: "Recursos" }
];

let usuarios = [
    { run: "19011022K", nombre: "Steve", apellidos: "Minecraft", correo: "steve@duoc.cl", tipo: "Administrador" },
    { run: "18234567", nombre: "Alex", apellidos: "Craft", correo: "alex@gmail.com", tipo: "Vendedor" }
];

//Diccionario simple: cada region tiene su propia lista de comunas
const comunasPorRegion = {
    "Metropolitana": ["Santiago", "Puente Alto", "Maipú"],
    "Araucania": ["Temuco", "Villarrica", "Angol"],
    "Nuble": ["Chillán", "San Carlos", "Bulnes"]
};



function mostrarSeccion(seccion) {
    //Ocultamos ambas secciones y luego mostramos solo la que corresponde
    document.getElementById("seccion-productos").classList.add("is-hidden");
    document.getElementById("seccion-usuarios").classList.add("is-hidden");
    document.getElementById("seccion-" + seccion).classList.remove("is-hidden");
}

//SECCION PRODUCTOS


//Dibuja de nuevo toda la tabla de productos a partir del arreglo "productos"
function renderizarProductos() {
    const tabla = document.getElementById("tabla-productos");
    tabla.innerHTML = ""; //Limpiamos la tabla antes de volver a llenarla

    productos.forEach((p) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${p.codigo}</td>
            <td>${p.nombre}</td>
            <td>$${p.precio}</td>
            <td>${p.stock}</td>
            <td>${p.categoria}</td>
        `;
        tabla.appendChild(fila);
    });
}

function mostrarFormularioProducto() {
    document.getElementById("form-box-producto").classList.remove("is-hidden");
}

function ocultarFormularioProducto() {
    document.getElementById("form-box-producto").classList.add("is-hidden");
    document.getElementById("form-producto").reset();
}

//Escuchamos el envio del formulario de productos
document.getElementById("form-producto").addEventListener("submit", (e) => {
    e.preventDefault();

    //Leemos los valores del formulario
    const codigo = document.getElementById("p-codigo").value.trim();
    const nombre = document.getElementById("p-nombre").value.trim();
    const descripcion = document.getElementById("p-descripcion").value.trim();
    const precio = document.getElementById("p-precio").value;
    const stock = document.getElementById("p-stock").value;
    const stockCritico = document.getElementById("p-stock-critico").value;
    const categoria = document.getElementById("p-categoria").value;

    //Ocultamos todos los errores antes de validar de nuevo
    ["p-codigo", "p-nombre", "p-descripcion", "p-precio", "p-stock", "p-stock-critico", "p-categoria"].forEach((id) => {
        document.getElementById("error-" + id).classList.add("is-hidden");
    });

    let formularioValido = true;

    //Codigo requerido, minimo 3 caracteres
    if (codigo === "" || codigo.length < 3) {
        document.getElementById("error-p-codigo").classList.remove("is-hidden");
        formularioValido = false;
    }

    //Nombrerequerido, máximo 100
    if (nombre === "" || nombre.length > 100) {
        document.getElementById("error-p-nombre").classList.remove("is-hidden");
        formularioValido = false;
    }

    // Descripcion opcional, pero si tiene, maximo 500
    if (descripcion.length > 500) {
        document.getElementById("error-p-descripcion").classList.remove("is-hidden");
        formularioValido = false;
    }

    // Precio requerido
    if (precio === "" || parseFloat(precio) < 0) {
        document.getElementById("error-p-precio").classList.remove("is-hidden");
        formularioValido = false;
    }

    // Stock requerido, entero 
    if (stock === "" || parseInt(stock) < 0 || !Number.isInteger(Number(stock))) {
        document.getElementById("error-p-stock").classList.remove("is-hidden");
        formularioValido = false;
    }

    // Stock critico: opcional, pero si hay debe ser entero >= 0
    if (stockCritico !== "" && (parseInt(stockCritico) < 0 || !Number.isInteger(Number(stockCritico)))) {
        document.getElementById("error-p-stock-critico").classList.remove("is-hidden");
        formularioValido = false;
    }

    // Categoria requerida
    if (categoria === "") {
        document.getElementById("error-p-categoria").classList.remove("is-hidden");
        formularioValido = false;
    }

    // Si todo esta bien agregamos el producto al arreglo y actualizamos la tabla
    if (formularioValido) {
        productos.push({
            codigo: codigo,
            nombre: nombre,
            precio: parseFloat(precio),
            stock: parseInt(stock),
            categoria: categoria
        });
        renderizarProductos();
        ocultarFormularioProducto();
    }
});


// SECCION USUARIOS

function renderizarUsuarios() {
    const tabla = document.getElementById("tabla-usuarios");
    tabla.innerHTML = "";

    usuarios.forEach((u) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${u.run}</td>
            <td>${u.nombre}</td>
            <td>${u.apellidos}</td>
            <td>${u.correo}</td>
            <td>${u.tipo}</td>
        `;
        tabla.appendChild(fila);
    });
}

function mostrarFormularioUsuario() {
    document.getElementById("form-box-usuario").classList.remove("is-hidden");
}

function ocultarFormularioUsuario() {
    document.getElementById("form-box-usuario").classList.add("is-hidden");
    document.getElementById("form-usuario").reset();
}

//Cuando el usuario elige una region, llenamos el select de comunas correspondiente
function actualizarComunas() {
    const region = document.getElementById("u-region").value;
    const selectComuna = document.getElementById("u-comuna");

    selectComuna.innerHTML = ""; //Limpia las opciones anteriores

    if (region === "" || !comunasPorRegion[region]) {
        selectComuna.innerHTML = `<option value="">-- Primero selecciona una región --</option>`;
        return;
    }

    selectComuna.innerHTML = `<option value="">-- Selecciona una comuna --</option>`;
    comunasPorRegion[region].forEach((comuna) => {
        selectComuna.innerHTML += `<option value="${comuna}">${comuna}</option>`;
    });
}

//vemos el envio del formulario de usuarios
document.getElementById("form-usuario").addEventListener("submit", (e) => {
    e.preventDefault();

    const run = document.getElementById("u-run").value.trim();
    const nombre = document.getElementById("u-nombre").value.trim();
    const apellidos = document.getElementById("u-apellidos").value.trim();
    const correo = document.getElementById("u-correo").value.trim();
    const tipo = document.getElementById("u-tipo").value;
    const region = document.getElementById("u-region").value;
    const comuna = document.getElementById("u-comuna").value;
    const direccion = document.getElementById("u-direccion").value.trim();

    //Ocultamos todos los errores antes de validar de nuevo
    ["u-run", "u-nombre", "u-apellidos", "u-correo", "u-tipo", "u-region", "u-comuna", "u-direccion"].forEach((id) => {
        document.getElementById("error-" + id).classList.add("is-hidden");
    });

    let formularioValido = true;

    // RUN es requerido, sin puntos ni guion, entre 7 y 9 caracteres
    // validación simple pq solo revisa formato y largo, no el digito verificador
    const runValido = /^[0-9]+[0-9kK]$/.test(run);
    if (run === "" || run.length < 7 || run.length > 9 || !runValido) {
        document.getElementById("error-u-run").classList.remove("is-hidden");
        formularioValido = false;
    }

    // Nombre requerido, maximo 50
    if (nombre === "" || nombre.length > 50) {
        document.getElementById("error-u-nombre").classList.remove("is-hidden");
        formularioValido = false;
    }

    // Apellidos requerido, maximo 100
    if (apellidos === "" || apellidos.length > 100) {
        document.getElementById("error-u-apellidos").classList.remove("is-hidden");
        formularioValido = false;
    }

    // Correo: requerido, maximo 100
    const dominiosPermitidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];
    const correoValido = dominiosPermitidos.some((dominio) => correo.endsWith(dominio));
    if (correo === "" || correo.length > 100 || !correoValido) {
        document.getElementById("error-u-correo").classList.remove("is-hidden");
        formularioValido = false;
    }

    // Tipo de usuario: requerido
    if (tipo === "") {
        document.getElementById("error-u-tipo").classList.remove("is-hidden");
        formularioValido = false;
    }

    // Region: requerida
    if (region === "") {
        document.getElementById("error-u-region").classList.remove("is-hidden");
        formularioValido = false;
    }

    // Comuna: requerida
    if (comuna === "") {
        document.getElementById("error-u-comuna").classList.remove("is-hidden");
        formularioValido = false;
    }

    // Direccion: requerida, máximo 300
    if (direccion === "" || direccion.length > 300) {
        document.getElementById("error-u-direccion").classList.remove("is-hidden");
        formularioValido = false;
    }

    if (formularioValido) {
        usuarios.push({ run, nombre, apellidos, correo, tipo, region, comuna, direccion });
        renderizarUsuarios();
        ocultarFormularioUsuario();
    }
});

renderizarProductos();
renderizarUsuarios();