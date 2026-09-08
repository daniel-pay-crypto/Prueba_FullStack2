
const catalogo = document.getElementById('catalogo-mobs');
const formulario = document.getElementById('form-mob');
const buscador = document.getElementById('buscador');

// Función para crear tarjetas
function agregarTarjeta(nombre, origen, rol, imagen) {

    // Creamos la columna contenedora de Bulma
    const divColumna = document.createElement('div');

    divColumna.className = 'column is-half-desktop is-half-tablet is-full-mobile tarjeta-contenedor';

// Creamos la tarjeta con Bulma y la información del mob
    divColumna.innerHTML = `
        <div class="card tarjeta-mob has-background-white">

            <!-- Forzamos que la caja de la imagen siempre mida 200px de alto -->

            <div class="card-image has-text-centered has-background-white" style="height: 200px; display: flex; justify-content: center; align-items: center; padding: 10px;">
                <figure class="image" style="width: 100%; height: 100%;">
                    <!-- object-fit: contain hace que la imagen no se estire ni se aplaste -->
                    <img src="${imagen}" alt="${nombre}" style="width: 100%; height: 100%; object-fit: contain;">
                </figure>
            </div>
            <div class="card-content">
                <p class="title nombre-mob">${nombre}</p>
                <p class="subtitle is-6"><strong>Origen:</strong> ${origen}</p>
                <span class="tag is-info is-medium">${rol}</span>
            </div>
            <div class="card-footer has-background-success">
                <!-- Botón de Eliminar DELETE -->
                <a href="#" class="card-footer-item has-text-danger btn-eliminar">🗑️ Eliminar</a>
            </div>
        </div>
    `;

//  función para eliminar la tarjeta al hacer clic en el botón de eliminar  
    const btnEliminar = divColumna.querySelector('.btn-eliminar');
    btnEliminar.addEventListener('click', (e) => {
        e.preventDefault(); 
        divColumna.remove(); // element.remove() tal como pide el profesor
    });

    // Añadimos la tarjeta a la grilla
    catalogo.appendChild(divColumna);
}

//funcion para agregar tarjetas de ejemplo al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    agregarTarjeta(
        'Creeper', 
        'Overworld', 
        'Hostil', 
        'https://tse4.mm.bing.net/th/id/OIP.xcNe1xzh_xLxnTwbLFsQSQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'
    );
    agregarTarjeta(
        'Vaca Champiñón', 
        'Isla de Champiñones', 
        'Pacífico', 
        'https://minecraft.wiki/images/Red_Mooshroom_JE5_BE3.png?de6c9'
    );

    agregarTarjeta(
        'Zombie',
        'Overworld',
        'Hostil',
        'https://media.sketchfab.com/models/45037ec52b6a4444a0981f916d0dbd43/thumbnails/9ead0b025eb64de997e57b00f7d458f0/39323433a4f44d71a64c25a37cf798ab.jpeg'
    );
});

//funcion para manejar el evento de envío del formulario
formulario.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita que la página se recargue

    // Obtener valores
    const nombre = document.getElementById('input-nombre').value;
    const origen = document.getElementById('input-origen').value;
    const rol = document.getElementById('input-rol').value;
    const imagen = document.getElementById('input-imagen').value;

    // Agregar la nueva tarjeta
    agregarTarjeta(nombre, origen, rol, imagen);

    // Limpiar el formulario
    formulario.reset();
});

//filtro de busqueda en tiempo real
buscador.addEventListener('input', (e) => {
    const textoBusqueda = e.target.value.toLowerCase();
    const tarjetas = document.querySelectorAll('.tarjeta-contenedor');

    tarjetas.forEach(tarjeta => {
        const nombre = tarjeta.querySelector('.nombre-mob').innerText.toLowerCase();
        // Si el nombre incluye lo que escribimos, se muestra, si no, se oculta
        if (nombre.includes(textoBusqueda)) {
            tarjeta.style.display = 'block';
        } else {
            tarjeta.style.display = 'none';
        }
    });
});