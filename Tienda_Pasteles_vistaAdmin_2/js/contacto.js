// js/contacto.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contacto-form');
    const userInfoFields = document.getElementById('user-info-fields');
    const nombreInput = document.getElementById('nombre');
    const correoInput = document.getElementById('correo');
    const mensajeInput = document.getElementById('comentario'); // He corregido el ID del textarea

    const usuarioActual = JSON.parse(sessionStorage.getItem('usuarioActual'));
    let nombre = '';
    let correo = '';

    if (usuarioActual) {
        // Si hay una sesión iniciada, ocultamos los campos de nombre y correo
        userInfoFields.style.display = 'none';
        nombre = usuarioActual.nombreCompleto;
        correo = usuarioActual.correo;
    } else {
        // Si no hay sesión, los campos son obligatorios
        userInfoFields.style.display = 'block';
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validamos el formulario
        if (!usuarioActual) {
            // Si no hay sesión, validamos los campos de nombre y correo
            if (!nombreInput.value.trim() || !correoInput.value.trim()) {
                alert('Por favor, completa los campos de nombre y correo.');
                return;
            }
            nombre = nombreInput.value.trim();
            correo = correoInput.value.trim();
        }

        const mensaje = mensajeInput.value.trim();
        if (!mensaje) {
            alert('Escribe tu mensaje antes de enviar.');
            return;
        }

        const nuevoMensaje = {
            nombre: nombre,
            correo: correo,
            mensaje: mensaje,
            fecha: new Date().toISOString()
        };

        const mensajes = JSON.parse(sessionStorage.getItem('mensajes')) || [];
        mensajes.unshift(nuevoMensaje);
        sessionStorage.setItem('mensajes', JSON.stringify(mensajes));

        alert('Mensaje enviado correctamente.');
        form.reset();
    });

    // Lógica para listar los mensajes en el panel de administración
    const mensajesContainer = document.getElementById('mensajes-container');
    if (mensajesContainer) {
        const mensajes = JSON.parse(sessionStorage.getItem('mensajes')) || [];
        if (mensajes.length === 0) {
            mensajesContainer.innerHTML = '<p class="text-muted">No hay mensajes todavía.</p>';
        } else {
            mensajes.forEach(msg => {
                const card = document.createElement('div');
                card.className = 'card mb-3 shadow-sm';
                card.innerHTML = `
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start">
                            <div>
                                <h5 class="card-title mb-0">${msg.nombre}</h5>
                                <p class="mb-1"><a href="mailto:${msg.correo}">${msg.correo}</a></p>
                            </div>
                            <small class="text-muted">${new Date(msg.fecha).toLocaleString()}</small>
                        </div>
                        <hr>
                        <p class="card-text">${msg.mensaje}</p>
                    </div>
                `;
                mensajesContainer.appendChild(card);
            });
        }
    }
});