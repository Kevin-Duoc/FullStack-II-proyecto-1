// //ESTE SCRIPT SE ENCARGARA DE ENVIAR LOS MENSAJES DE CONTACTO.HTML AL PANEL ADMINISTRATIVO
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contacto-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const userRole = sessionStorage.getItem('userRole');
    const userEmail = sessionStorage.getItem('userEmail') || '';

    let nombre = '';
    let correo = '';

    if (userRole) {
      correo = userEmail;
      // Intento sacar nombre completo de localStorage si existe
      const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
      const usuarioObj = usuariosGuardados.find(u => u.correo === correo);
      nombre = usuarioObj?.nombreCompleto || userRole || (correo.split('@')[0] || 'Usuario');
    } else {
      const nombreInput = document.getElementById('nombre');
      const correoInput = document.getElementById('correo');
      nombre = nombreInput?.value.trim() || '';
      correo = correoInput?.value.trim() || '';

      if (!nombre || !correo) {
        alert('Debes ingresar tu nombre y correo.');
        return;
      }
    }

    // Acepta textarea con id "mensaje" o "comentario" (tu HTML original tenía "comentario").
    const mensaje = (document.getElementById('mensaje')?.value || document.getElementById('comentario')?.value || '').trim();
    if (!mensaje) {
      alert('Escribe tu mensaje antes de enviar.');
      return;
    }

    const nuevoMensaje = {
      nombre,
      correo,
      mensaje,
      fecha: new Date().toISOString()
    };

    const mensajes = JSON.parse(localStorage.getItem('mensajes')) || [];
    mensajes.unshift(nuevoMensaje); // push al inicio (más recientes arriba)
    localStorage.setItem('mensajes', JSON.stringify(mensajes));

    alert('Mensaje enviado correctamente ');
    form.reset();

    // Si quedó oculto el nombre/correo por estar logueado, re-aplicamos (por seguridad)
    if (userRole) {
      const nombreField = document.getElementById('nombre');
      const correoField = document.getElementById('correo');
      if (nombreField) { nombreField.disabled = true; const w = nombreField.closest('.col-md-12'); if (w) w.style.display = 'none'; }
      if (correoField) { correoField.disabled = true; const w = correoField.closest('.col-md-12'); if (w) w.style.display = 'none'; }
    }
  });
});