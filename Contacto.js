//Seleccionamos formulario usando su ID
const formContacto = document.getElementById('form-contacto');
formContacto.addEventListener('submit', (e) => {


    // Obtenemos lo escrito y le quitamos los espacios en blanco a los lados con el .trim()
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    //Obtenemos los parrafos donde mostraremos los errores
    const errorNombre = document.getElementById('error-nombre');
    const errorEmail = document.getElementById('error-email');
    const errorMensaje = document.getElementById('error-mensaje');
    const mensajeExito = document.getElementById('mensaje-exito');

    //Ocultamos todos los mensajes cada vez que se intenta enviar para empezar limpio
    errorNombre.classList.add('is-hidden');
    errorEmail.classList.add('is-hidden');
    errorMensaje.classList.add('is-hidden');
    mensajeExito.classList.add('is-hidden');
    let formularioValido = true; //Usamos esa variable como interruptor
    //Validacion nombre (si está vacío, mostramos error)
    if (nombre === '') {
        errorNombre.classList.remove('is-hidden'); //Quita la clase que oculta el texto
        formularioValido = false;
    }
    //Validacion del email (si está vacio o no tiene el @, muestra error)
    if (email === '' || !email.includes('@')) {
        errorEmail.classList.remove('is-hidden');
        formularioValido = false;
    }
    //Validacion si está vacio manda erro
    if (mensaje === '') {
        errorMensaje.classList.remove('is-hidden');
        formularioValido = false;
    }
    //Si todo bien pasa al true
    if (formularioValido === true) {

        // Mostramos el mensaje de exito
        mensajeExito.classList.remove('is-hidden');

        //Limpiacajas de texto del formulario
        formContacto.reset();
    }
});