// js/contacto.js - versión robusta y compatible con sessionStorage/localStorage
document.addEventListener('DOMContentLoaded', () => {
  try {
    const form = document.getElementById('contacto-form');
    const userInfoFields = document.getElementById('user-info-fields');
    const nombreInput = document.getElementById('nombre');
    const correoInput = document.getElementById('correo');
    // textarea id en tu HTML es "comentario" — dejamos fallback a "mensaje"
    const comentarioInput = document.getElementById('comentario') || document.getElementById('mensaje');

    function getUsuarioActual() {
      try {
        // primero sessionStorage (más seguro), luego localStorage como fallback entre pestañas
        const s = sessionStorage.getItem('usuarioActual');
        if (s) return JSON.parse(s);
        const l = localStorage.getItem('usuarioActual');
        if (l) return JSON.parse(l);
      } catch (err) {
        console.error('Error parseando usuarioActual:', err);
      }
      return null;
    }

    function applySessionState() {
      const usuario = getUsuarioActual();
      if (userInfoFields) {
        if (usuario) {
          // ocultar campos si está logueado
          userInfoFields.style.display = 'none';
          if (nombreInput) { nombreInput.value = usuario.nombreCompleto || ''; nombreInput.disabled = true; }
          if (correoInput) { correoInput.value = usuario.correo || ''; correoInput.disabled = true; }
        } else {
          // mostrar si no está logueado
          userInfoFields.style.display = '';
          if (nombreInput) { nombreInput.disabled = false; nombreInput.value = ''; }
          if (correoInput) { correoInput.disabled = false; correoInput.value = ''; }
        }
      } else {
        // Si no existe contenedor, solo rellenar inputs si hay usuario
        if (getUsuarioActual()) {
          const u = getUsuarioActual();
          if (nombreInput) { nombreInput.value = u.nombreCompleto || ''; nombreInput.disabled = true; }
          if (correoInput) { correoInput.value = u.correo || ''; correoInput.disabled = true; }
        }
      }
    }

    applySessionState();

    if (!form) {
      console.warn('No se encontró #contacto-form en la página.');
      return;
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      try {
        const usuario = getUsuarioActual();

        let nombre = '';
        let correo = '';

        if (usuario) {
          nombre = usuario.nombreCompleto || '';
          correo = usuario.correo || '';
        } else {
          nombre = nombreInput ? nombreInput.value.trim() : '';
          correo = correoInput ? correoInput.value.trim() : '';
        }

        const mensaje = comentarioInput ? comentarioInput.value.trim() : '';
        if (!mensaje) {
          alert('Escribe tu mensaje antes de enviar.');
          return;
        }
        if (!nombre || !correo) {
          alert('Por favor completa nombre y correo.');
          return;
        }

        const nuevoMensaje = {
          nombre,
          correo,
          mensaje,
          fecha: new Date().toISOString()
        };

        // Guardamos en localStorage (persistente)
        const mensajes = JSON.parse(localStorage.getItem('mensajes')) || [];
        mensajes.unshift(nuevoMensaje);
        localStorage.setItem('mensajes', JSON.stringify(mensajes));

        alert('Mensaje enviado correctamente.');
        form.reset();
        // re-aplicar ocultamiento (si corresponde)
        applySessionState();
      } catch (err) {
        console.error('Error al enviar mensaje:', err);
        alert('Ocurrió un error al enviar el mensaje. Revisa la consola (F12) para más detalles.');
      }
    });

  } catch (err) {
    console.error('Error inicializando contacto.js:', err);
  }
});