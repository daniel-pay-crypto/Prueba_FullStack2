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


    // codigo para el formulario de contacto:

    const formulario = document.getElementById('form-contacto');

    // Solo valido si el formulario existe en la página actual
    if (formulario) { 
        const inputNombre = document.getElementById('nombre');
        const inputEmail = document.getElementById('email');
        const inputMensaje = document.getElementById('mensaje');

        const errorNombre = document.getElementById('error-nombre');
        const errorEmail = document.getElementById('error-email');
        const errorMensaje = document.getElementById('error-mensaje');
        const mensajeExito = document.getElementById('mensaje-exito');

        formulario.addEventListener('submit', (event) => {
            // Previene el envío automático por defecto
            event.preventDefault();

            // Limpiar mensajes anteriores
            limpiarErrores();
            let esValido = true;

            // Validar Nombre
            if (inputNombre.value.trim() === '') {
                mostrarError(errorNombre, 'Por favor, ingresa tu nombre completo.');
                esValido = false;
            } else if (inputNombre.value.trim().length < 3) {
                mostrarError(errorNombre, 'El nombre debe tener al menos 3 caracteres.');
                esValido = false;
            }

            // Validar Email
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (inputEmail.value.trim() === '') {
                mostrarError(errorEmail, 'Por favor, ingresa tu correo electrónico.');
                esValido = false;
            } else if (!regexEmail.test(inputEmail.value.trim())) {
                mostrarError(errorEmail, 'Ingresa un correo electrónico válido (ejemplo@dominio.com).');
                esValido = false;
            }

            // Validar Mensaje
            if (inputMensaje.value.trim() === '') {
                mostrarError(errorMensaje, 'El mensaje no puede estar vacío.');
                esValido = false;
            } else if (inputMensaje.value.trim().length < 10) {
                mostrarError(errorMensaje, 'El mensaje debe tener al menos 10 caracteres para ser descriptivo.');
                esValido = false;
            }

            // Si todo es válido
            if (esValido) {
                //entonces le envio un mensaje de éxito al usuario y reseteo el formulario
                mensajeExito.textContent = '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.';
                formulario.reset();
            }
        });
   
        function mostrarError(elemento, mensaje) {
            elemento.textContent = mensaje;
            elemento.style.display = 'block';
        }

        function limpiarErrores() {
            errorNombre.textContent = '';
            errorEmail.textContent = '';
            errorMensaje.textContent = '';
            mensajeExito.textContent = '';
        }
    }
});