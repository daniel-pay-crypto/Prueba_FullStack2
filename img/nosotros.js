//JS para Nosotros


document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('form-contacto');
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
});