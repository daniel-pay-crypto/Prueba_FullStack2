//Diccionario de precios
const precioBase = {
    "Pocion de Curacion": 5,
    "Pan": 2,
    "Diamante": 10,
}

//Aca guardaremos lo que el usuario tiene en el carrito
let estadoCarrito = {}


//Funcion que recalcula y actualiza los textos de abajo
function actualizarTotales(){
    let totalItems = 0;
    let totalEsmeraldas = 0;

    for (let id in estadoCarrito) {
        totalItems += estadoCarrito[id].cantidad;
        totalEsmeraldas += (estadoCarrito[id].cantidad * estadoCarrito[id].precio);

    }

    document.getElementById("carrito-total-items").innerText = totalItems;
    document.getElementById("carrito-total-esmeraldas").innerText = totalEsmeraldas;
}


//Funciones para abrir el menu

// Abre o cierra el panel izquierdo
function abrirCarrito() {
    const carrito = document.getElementById('carrito');
    carrito.classList.toggle("activo");
}


//Funcion para el menu de hamburguesa:
function abrirMenu(){
    //Busca el menu en el HTML
    let menu = document.getElementById("menu");

    // El "toggle" es como un interruptor de luz: si no tiene la clase "activo", se la pone. Si ya la tiene, se la quita
    menu.classList.toggle("activo");
}

//FUNCIONES DE AGREGAR AL CARRITO:

// Funcion principal para agregar al carrito (Evita duplicados y crea el nuevo diseno)
function agregarAlCarrito(nombre, imagen, cantidad) {
    const panelCarrito = document.getElementById('lista-carrito');

    // Creamos un ID unico y sin espacios para este producto (ej: "cart-diamante")
    const itemId = 'cart-' + nombre.replace(/\s+/g, '-').toLowerCase();

    // REGLA: Si el producto ya existe en el carrito, mostramos alerta y detenemos la funcion
    if (document.getElementById(itemId)) {
        alert("Este producto ya esta en tu carrito! Modifica la cantidad desde alli.");
        return; 
    }


    let precioUnitario = precioBase[nombre] || 0;
    estadoCarrito[itemId] = {
        precio : precioUnitario,
        cantidad : parseInt(cantidad)
    };

    // Creamos el recuadro blanco con el boton de Eliminar y el Menu Desplegable
    const itemHTML = `
        <div class="item-carrito" id="${itemId}">
            <img src="${imagen}" alt="${nombre}">
            <div class="item-carrito-info">
                <span class="item-carrito-nombre">${nombre}</span>
                
                <div class="controles-cantidad">
                    <!-- Boton que dice "1 u." y abre el menu -->
                    <button class="btn-cantidad" onclick="abrirMenuCantidad('${itemId}')">
                        <span id="qty-${itemId}">${cantidad}</span> u. 
                    </button>
                    
                    <!-- Menu oculto que se despliega hacia abajo -->
                    <div class="dropdown-cantidad" id="drop-${itemId}" style="display: none;">
                        <button onclick="cambiarCantidad('${itemId}', 2)">2 u.</button>
                        <button onclick="cambiarCantidad('${itemId}', 5)">5 u.</button>
                        <button onclick="cambiarCantidad('${itemId}', 10)">10 u.</button>
                        <button onclick="mostrarInput('${itemId}')">Mas unidades</button>
                        
                        <!-- Input para escribir numeros manualmente -->
                        <div id="caja-input-${itemId}" class="caja-input" style="display: none;">
                            <input type="number" id="input-qty-${itemId}" min="1" placeholder="Ej: 20">
                            <button onclick="aplicarInput('${itemId}')">Ok</button>
                        </div>
                    </div>

                    <!-- Boton para eliminar el producto entero -->
                    <button class="btn-eliminar-item" onclick="eliminarDelCarrito('${itemId}')">Eliminar</button>
                </div>
            </div>
        </div>
    `;

    panelCarrito.innerHTML += itemHTML;
    actualizarTotales(); //actualiza los numeros en el panel
}

// Abre y cierra el menu de unidades
function abrirMenuCantidad(itemId) {
    let menu = document.getElementById('drop-' + itemId);
    if (menu.style.display === 'none') {
        menu.style.display = 'flex';
    } else {
        menu.style.display = 'none';
    }
}

// Cambia el numero de unidades y cierra el menu
function cambiarCantidad(itemId, nuevaCantidad) {
    let cant = parseInt(nuevaCantidad);
    document.getElementById('qty-' + itemId).innerText = cant;
    document.getElementById('drop-' + itemId).style.display = 'none'; // Cierra el menú
    
    if (estadoCarrito[itemId]) {
        estadoCarrito[itemId].cantidad = cant;
    }
    actualizarTotales();

}


// Muestra la cajita para escribir el numero manualmente
function mostrarInput(itemId) {
    document.getElementById('caja-input-' + itemId).style.display = 'flex';
}


// Aplica el numero que el usuario escribio
function aplicarInput(itemId) {
    let valor = document.getElementById('input-qty-' + itemId).value;
    if (valor > 0) { // Solo si escribio un numero mayor a 0
        cambiarCantidad(itemId, valor);
    } else {
        alert("Por favor, ingresa un numero valido.");
    }
}


// Elimina el cuadro blanco entero del carrito
function eliminarDelCarrito(itemId) {
    document.getElementById(itemId).remove();

    //Borramos el elemento de la memoria y recalculamos
    delete estadoCarrito[itemId];
    actualizarTotales();
}


// Detecta cada vez que el usuario mueve la rueda para agregar las imagenes desde los lados de forma dinamica y fluida
window.addEventListener('scroll', () => {
    // const seccion sirve para detectar la seccion que queremos animar, y las imagenes son las que se van a mover
    const seccion = document.querySelector('.seccion-animada');

    // Si esta pagina no tiene esa seccion, no seguimos (evita errores en consola)
    if (!seccion) return;

    const imgIzq = document.querySelector('.imagen-deslizable.izquierda');
    const imgDer = document.querySelector('.imagen-deslizable.derecha');

    // Calculamos donde esta la seccion respecto a la pantalla
    let posicionSeccion = seccion.getBoundingClientRect().top;
    let altoPantalla = window.innerHeight;

    // Si la seccion ya es visible en la pantalla
    if (posicionSeccion < altoPantalla && posicionSeccion > -seccion.offsetHeight) {
        
        // Calculamos el porcentaje del scroll (de 0.0 a 1.0)
        let progreso = (altoPantalla - posicionSeccion) / altoPantalla;

        // Las imagenes empiezan a 300px afuera y llegan a 0px (el centro)
        let movimientoIzq = -300 + (300 * progreso);
        let movimientoDer = 300 - (300 * progreso);

        // Frenamos las imagenes para que no se crucen y pasen de largo
        if (movimientoIzq > 0) movimientoIzq = 0;
        if (movimientoDer < 0) movimientoDer = 0;

        // Aplicamos los movimientos y la transparencia fluida
        imgIzq.style.transform = `translateX(${movimientoIzq}px)`;
        imgDer.style.transform = `translateX(${movimientoDer}px)`;
        imgIzq.style.opacity = progreso;
        imgDer.style.opacity = progreso;
    }
});


// Lo mismo, pero para la segunda seccion animada (Enderman y Multijugador)
window.addEventListener('scroll', () => {
    const seccion = document.querySelector('.seccion-animada2');

    // Si esta pagina no tiene esa seccion, no seguimos (evita errores en consola)
    if (!seccion) return;

    const imgIzq2 = document.querySelector('.imagen-deslizable.izquierda2');
    const imgDer2 = document.querySelector('.imagen-deslizable.derecha2');

    // Calculamos donde esta la seccion respecto a la pantalla
    let posicionSeccion2 = seccion.getBoundingClientRect().top;
    let altoPantalla2 = window.innerHeight;

    // Si la seccion ya es visible en la pantalla
    if (posicionSeccion2 < altoPantalla2 && posicionSeccion2 > -seccion.offsetHeight) {
        
        // Calculamos el porcentaje del scroll (de 0.0 a 1.0)
        let progreso2 = (altoPantalla2 - posicionSeccion2) / altoPantalla2;

        // Las imagenes empiezan a 300px afuera y llegan a 0px (el centro)
        let movimientoIzq2 = -300 + (300 * progreso2);
        let movimientoDer2 = 300 - (300 * progreso2);

        // Frenamos las imagenes para que no se crucen y pasen de largo
        if (movimientoIzq2 > 0) movimientoIzq2 = 0;
        if (movimientoDer2 < 0) movimientoDer2 = 0;

        // Aplicamos los movimientos y la transparencia fluida
        imgIzq2.style.transform = `translateX(${movimientoIzq2}px)`;
        imgDer2.style.transform = `translateX(${movimientoDer2}px)`;
        imgIzq2.style.opacity = progreso2;
        imgDer2.style.opacity = progreso2;
    }
});