// Validaciones para el inicio de sesión
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            let valid = true;
            const correoInput = document.getElementById('correo');
            const contrasenaInput = document.getElementById('contrasena');

            // Validación de correo
            if (correoInput.value.length > 100) {
                alert('El correo no puede exceder los 100 caracteres.');
                valid = false;
            }
            const emailRegex = /@duoc.cl$|@profesor.duoc.cl$|@gmail.com$/;
            if (!emailRegex.test(correoInput.value)) {
                alert('El correo debe ser de los dominios @duoc.cl, @profesor.duoc.cl o @gmail.com.');
                valid = false;
            }

            // Validación de contraseña
            if (contrasenaInput.value.length < 4 || contrasenaInput.value.length > 10) {
                alert('La contraseña debe tener entre 4 y 10 caracteres.');
                valid = false;
            }

            if (!valid) {
                event.preventDefault();
            }
        });
    }

// Validaciones para el registro
    const registroForm = document.getElementById('registro-form');
    if (registroForm) {
        registroForm.addEventListener('submit', (event) => {
            let valid = true;
            const nombreCompleto = document.getElementById('nombreCompleto').value;
            const correo = document.getElementById('correo').value;
            const contrasena = document.getElementById('contrasena').value;
            const confirmarContrasena = document.getElementById('confirmarContrasena').value;

            // Validación de nombre
            if (nombreCompleto.length > 100) {
                alert('El nombre completo no puede exceder los 100 caracteres.');
                valid = false;
            }

            // Validación de correo
            if (correo.length > 100) {
                alert('El correo no puede exceder los 100 caracteres.');
                valid = false;
            }
            const emailRegex = /@duoc.cl$|@profesor.duoc.cl$|@gmail.com$/;
            if (!emailRegex.test(correo)) {
                alert('El correo debe ser de los dominios @duoc.cl, @profesor.duoc.cl o @gmail.com.');
                valid = false;
            }

            // Validación de contraseña y confirmación
            if (contrasena.length < 4 || contrasena.length > 10) {
                alert('La contraseña debe tener entre 4 y 10 caracteres.');
                valid = false;
            }
            if (contrasena !== confirmarContrasena) {
                alert('La contraseña y la confirmación no coinciden.');
                valid = false;
            }

            if (!valid) {
                event.preventDefault();
            }
        });
    }

// Validaciones para contacto
    const contactoForm = document.getElementById('contacto-form');
    if (contactoForm) {
        contactoForm.addEventListener('submit', (event) => {
            let valid = true;
            const nombre = document.getElementById('nombre').value;
            const correo = document.getElementById('correo').value;
            const comentario = document.getElementById('comentario').value;

            // Validación de nombre
            if (nombre.length > 100) {
                alert('El nombre no puede exceder los 100 caracteres.');
                valid = false;
            }

            // Validación de correo
            if (correo.length > 100) {
                alert('El correo no puede exceder los 100 caracteres.');
                valid = false;
            }
            const emailRegex = /@duoc.cl$|@profesor.duoc.cl$|@gmail.com$/;
            if (!emailRegex.test(correo)) {
                alert('El correo debe ser de los dominios @duoc.cl, @profesor.duoc.cl o @gmail.com.');
                valid = false;
            }

            // Validación de comentario
            if (comentario.length > 500) {
                alert('El comentario no puede exceder los 500 caracteres.');
                valid = false;
            }

            if (!valid) {
                event.preventDefault();
            }
        });
    }
});

//Validacion para que al enviar una reseña/comentario salga al usuario que fue enviado con exito
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contacto-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // evita que recargue la página
        alert("✅ Tu mensaje fue enviado con éxito. Gracias por contactarnos.");
        form.reset(); // limpia los campos
    });
});