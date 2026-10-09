/**
 * PLATAFORMA EDUCATIVA "MIS TABLAS"
 * Sistema de Mensajes, Alertas, Modales y Notificaciones Animadas
 * Reemplaza los alerts/confirms nativos por componentes interactivos, lúdicos y con animación.
 */

const Mensajes = (() => {
  let callbackConfirmar = null;
  let callbackCancelar = null;
  let callbackCerrar = null;

  function init() {
    // Escuchar tecla Escape para cerrar modales si están abiertos
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        cerrarModal();
      }
    });
  }

  /**
   * Muestra una alerta modal estilizada y animada.
   * @param {Object} opts
   * {
   *   titulo: string,
   *   texto: string,
   *   icono: string (emoji o símbolo),
   *   tipo: 'exito' | 'error' | 'aviso' | 'info',
   *   botonTexto: string,
   *   alCerrar: function
   * }
   */
  function alerta(opts) {
    if (typeof opts === 'string') {
      opts = { texto: opts };
    }

    const config = Object.assign({
      titulo: opts.tipo === 'error' ? '¡Atención!' : (opts.tipo === 'exito' ? '¡Muy Bien!' : 'Aviso'),
      texto: '',
      icono: opts.tipo === 'error' ? '😅' : (opts.tipo === 'exito' ? '🎉' : '💡'),
      tipo: 'info',
      botonTexto: '¡Entendido! 👍',
      alCerrar: null
    }, opts);

    // Reproducir sonido según tipo
    if (config.tipo === 'exito') {
      Sonidos.acierto();
    } else if (config.tipo === 'error') {
      Sonidos.error();
    } else {
      Sonidos.clic();
    }

    callbackCerrar = config.alCerrar;
    callbackConfirmar = null;
    callbackCancelar = null;

    const modal = document.getElementById('modal-mensaje');
    const card = document.getElementById('modal-mensaje-card');
    const elIcono = document.getElementById('modal-mensaje-icono');
    const elTitulo = document.getElementById('modal-mensaje-titulo');
    const elTexto = document.getElementById('modal-mensaje-texto');
    const elBotones = document.getElementById('modal-mensaje-botones');

    if (!modal || !card) return;

    // Asignar contenido
    elIcono.textContent = config.icono;
    elIcono.className = `modal-icono-anim anim-icon-${config.tipo}`;
    elTitulo.textContent = config.titulo;
    elTexto.innerHTML = `<p>${config.texto}</p>`;

    // Clases del card
    card.className = `modal-card modal-mensaje-card modal-tipo-${config.tipo} anim-pop-in`;

    // Botón
    elBotones.innerHTML = `
      <button class="btn btn-primario btn-lg btn-modal-accion" onclick="Mensajes.cerrarModal()">
        ${config.botonTexto}
      </button>
    `;

    modal.classList.add('activo');
  }

  /**
   * Muestra una ventana modal de confirmación con dos opciones estilizadas.
   * @param {Object} opts
   * {
   *   titulo: string,
   *   texto: string,
   *   icono: string,
   *   textoConfirmar: string,
   *   textoCancelar: string,
   *   alConfirmar: function,
   *   alCancelar: function
   * }
   */
  function confirmar(opts) {
    const config = Object.assign({
      titulo: '¿Estás seguro?',
      texto: '',
      icono: '🤔',
      tipo: 'aviso',
      textoConfirmar: 'Sí, continuar ➜',
      textoCancelar: 'Volver a revisar ✕',
      alConfirmar: null,
      alCancelar: null
    }, opts);

    Sonidos.clic();

    callbackConfirmar = config.alConfirmar;
    callbackCancelar = config.alCancelar;
    callbackCerrar = null;

    const modal = document.getElementById('modal-mensaje');
    const card = document.getElementById('modal-mensaje-card');
    const elIcono = document.getElementById('modal-mensaje-icono');
    const elTitulo = document.getElementById('modal-mensaje-titulo');
    const elTexto = document.getElementById('modal-mensaje-texto');
    const elBotones = document.getElementById('modal-mensaje-botones');

    if (!modal || !card) return;

    elIcono.textContent = config.icono;
    elIcono.className = `modal-icono-anim anim-icon-${config.tipo}`;
    elTitulo.textContent = config.titulo;
    elTexto.innerHTML = `<p>${config.texto}</p>`;

    card.className = `modal-card modal-mensaje-card modal-tipo-${config.tipo} anim-pop-in`;

    elBotones.innerHTML = `
      <div class="d-flex gap-2 justify-center flex-wrap">
        <button class="btn btn-outline btn-lg" onclick="Mensajes.cancelarAccion()">
          ${config.textoCancelar}
        </button>
        <button class="btn btn-exito btn-lg" onclick="Mensajes.confirmarAccion()">
          ${config.textoConfirmar}
        </button>
      </div>
    `;

    modal.classList.add('activo');
  }

  function confirmarAccion() {
    Sonidos.clic();
    cerrarModal();
    if (typeof callbackConfirmar === 'function') {
      callbackConfirmar();
    }
  }

  function cancelarAccion() {
    Sonidos.clic();
    cerrarModal();
    if (typeof callbackCancelar === 'function') {
      callbackCancelar();
    }
  }

  function cerrarModal() {
    const modal = document.getElementById('modal-mensaje');
    const card = document.getElementById('modal-mensaje-card');
    if (!modal || !modal.classList.contains('activo')) return;

    if (card) {
      card.classList.remove('anim-pop-in');
      card.classList.add('anim-pop-out');
    }

    setTimeout(() => {
      modal.classList.remove('activo');
      if (card) card.classList.remove('anim-pop-out');
      if (typeof callbackCerrar === 'function') {
        const fn = callbackCerrar;
        callbackCerrar = null;
        fn();
      }
    }, 200);
  }

  /**
   * Muestra un toast (notificación flotante) con estilo y animación.
   */
  function toast(texto, opts = {}) {
    const config = Object.assign({
      detalle: '',
      icono: '✨',
      tipo: 'info',
      duracion: 3200
    }, opts);

    const contenedor = document.getElementById('notificaciones-toast');
    if (!contenedor) return;

    const el = document.createElement('div');
    el.className = `toast-notif toast-${config.tipo} anim-toast-in`;
    el.innerHTML = `
      <div class="toast-icono-badge anim-bounce-once">${config.icono}</div>
      <div class="toast-contenido-textos">
        <strong class="toast-titulo">${texto}</strong>
        ${config.detalle ? `<small class="toast-sub">${config.detalle}</small>` : ''}
      </div>
    `;

    contenedor.appendChild(el);

    setTimeout(() => {
      el.classList.add('anim-toast-out');
      setTimeout(() => el.remove(), 350);
    }, config.duracion);
  }

  return {
    init,
    alerta,
    confirmar,
    toast,
    cerrarModal,
    confirmarAccion,
    cancelarAccion
  };
})();

// Inicializar al cargar el documento
window.addEventListener('DOMContentLoaded', () => {
  Mensajes.init();
});
