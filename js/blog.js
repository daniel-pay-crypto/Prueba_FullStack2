document.addEventListener('DOMContentLoaded', () => {

    // codigo para el menu hamburguesa
    const btnHamburguesa = document.querySelector('.btn-hamburguesa');
    const menuEnlaces = document.querySelector('.menu-enlaces');

    // funcion para abrir el menu hamburguesa
    function abrirMenu() {
        // el "toggle" es como un interruptor de luz, por que
        // si no tiene la clase "activo", se la pone. Si ya la tiene, se la quita xd.
        console.log('Botón de hamburguesa clickeado Hell Yeahhh!!');
        menuEnlaces.classList.toggle('activo');
    }

    // Si el botón y el menú existen, le decimos al botón que ejecute la función al hacer clic (abir menu)
    if (btnHamburguesa && menuEnlaces) {
        btnHamburguesa.addEventListener('click', abrirMenu);
    }

}); 