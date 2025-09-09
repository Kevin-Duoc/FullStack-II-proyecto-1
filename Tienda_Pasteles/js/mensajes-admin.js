document.addEventListener('DOMContentLoaded', () => {
  const mensajesContainer = document.getElementById('mensajes-container');
  if (!mensajesContainer) return;

  const mensajes = JSON.parse(localStorage.getItem('mensajes')) || [];

  if (mensajes.length === 0) {
    mensajesContainer.innerHTML = '<p class="text-muted">No hay mensajes todavía.</p>';
    return;
  }

  // función para escapar HTML (seguridad) (scripts maliciosos por lo que entendi)
  function esc(str) {
    if (!str) return '';
    return String(str).replace(/[&<>"']/g, function (m) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m];
    });
  }

  mensajes.forEach(msg => {
    const card = document.createElement('div');
    card.className = 'card mb-3 shadow-sm';
    card.innerHTML = `
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-start">
          <div>
            <h5 class="card-title mb-0">${esc(msg.nombre)}</h5>
            <p class="mb-1"><a href="mailto:${esc(msg.correo)}">${esc(msg.correo)}</a></p>
          </div>
          <small class="text-muted">${new Date(msg.fecha).toLocaleString()}</small>
        </div>
        <hr>
        <p class="card-text">${esc(msg.mensaje)}</p>
      </div>
    `;
    mensajesContainer.appendChild(card);
  });
});