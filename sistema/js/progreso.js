/**
 * PLATAFORMA EDUCATIVA "MIS TABLAS"
 * Gestor de Progreso, Gamificación y Persistencia (localStorage)
 */

const Progreso = (() => {
  const STORAGE_KEY = 'misTablas_progreso';
  const USUARIO_KEY = 'misTablas_usuario';

  let estado = {
    estudiante: {
      nombre: "Estudiante",
      avatar: "zorro"
    },
    puntos: 50, // XP inicial de bienvenida
    estrellas: {
      2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0
    },
    logros: [],
    simceHistorial: [],
    simceDesbloqueado: false
  };

  function inicializar() {
    // Cargar usuario
    try {
      const uRaw = localStorage.getItem(USUARIO_KEY);
      if (uRaw) {
        const u = JSON.parse(uRaw);
        if (u.nombre) estado.estudiante.nombre = u.nombre;
        if (u.avatar) estado.estudiante.avatar = u.avatar;
      }
    } catch (e) {
      console.warn("No se pudo cargar usuario", e);
    }

    // Cargar progreso
    try {
      const pRaw = localStorage.getItem(STORAGE_KEY);
      if (pRaw) {
        const p = JSON.parse(pRaw);
        estado.puntos = p.puntos ?? estado.puntos;
        estado.estrellas = Object.assign(estado.estrellas, p.estrellas || {});
        estado.logros = p.logros || [];
        estado.simceHistorial = p.simceHistorial || [];
        estado.simceDesbloqueado = p.simceDesbloqueado ?? false;
      }
    } catch (e) {
      console.warn("No se pudo cargar progreso", e);
    }

    // Si tiene estrellas o puntos, verificar desbloqueos
    verificarDesbloqueoSimce();
    guardar();
  }

  function guardar() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        puntos: estado.puntos,
        estrellas: estado.estrellas,
        logros: estado.logros,
        simceHistorial: estado.simceHistorial,
        simceDesbloqueado: estado.simceDesbloqueado
      }));
    } catch (e) {
      console.warn("Error guardando progreso", e);
    }
  }

  function agregarXP(cantidad, razon = "") {
    estado.puntos += cantidad;
    guardar();
    Sonidos.estrella();

    // Notificación en pantalla si existe el contenedor
    mostrarToastXP(`+${cantidad} XP`, razon);

    // Verificar logro de puntos
    if (estado.puntos >= 500) {
      desbloquearLogro("maestro_total");
    }

    verificarDesbloqueoSimce();
    actualizarBarraSuperior();
  }

  function asignarEstrellas(tabla, cantidad) {
    tabla = parseInt(tabla, 10);
    const previas = estado.estrellas[tabla] || 0;
    if (cantidad > previas) {
      estado.estrellas[tabla] = Math.min(3, cantidad);
      const ganadas = cantidad - previas;
      agregarXP(ganadas * 25, `¡${ganadas} nueva(s) estrella(s) en la Tabla del ${tabla}!`);
    }

    // Logros por tablas
    desbloquearLogro("primer_paso");
    if (tabla === 2 && estado.estrellas[2] >= 3) desbloquearLogro("doble_maestro");
    if (tabla === 5 && estado.estrellas[5] >= 3) desbloquearLogro("reloj_veloz");

    verificarDesbloqueoSimce();
    guardar();
    actualizarBarraSuperior();
  }

  function verificarDesbloqueoSimce() {
    // Se habilita al completar al menos 2 tablas con al menos 1 estrella o alcanzar 150 XP
    let tablasConEstrellas = 0;
    for (let t = 2; t <= 10; t++) {
      if ((estado.estrellas[t] || 0) > 0) tablasConEstrellas++;
    }

    if (tablasConEstrellas >= 2 || estado.puntos >= 150) {
      if (!estado.simceDesbloqueado) {
        estado.simceDesbloqueado = true;
        guardar();
      }
    }
  }

  function forzarDesbloqueoSimce() {
    estado.simceDesbloqueado = true;
    guardar();
    actualizarBarraSuperior();
  }

  function desbloquearLogro(idLogro) {
    if (!estado.logros.includes(idLogro)) {
      estado.logros.push(idLogro);
      guardar();

      const l = DATOS.logros.find(x => x.id === idLogro);
      if (l) {
        Sonidos.fanfarria();
        mostrarModalLogro(l);
      }
    }
  }

  function calcularNivel() {
    const pts = estado.puntos;
    if (pts < 100) return { nivel: 1, titulo: "Aprendiz de Números", icono: "🌱", sigPts: 100 };
    if (pts < 250) return { nivel: 2, titulo: "Explorador Matemático", icono: "🧭", sigPts: 250 };
    if (pts < 450) return { nivel: 3, titulo: "Aventurero del Cálculo", icono: "⭐", sigPts: 450 };
    if (pts < 700) return { nivel: 4, titulo: "Mago Multiplicador", icono: "🧙‍♂️", sigPts: 700 };
    return { nivel: 5, titulo: "Gran Sabio SIMCE", icono: "👑", sigPts: 1000 };
  }

  function totalEstrellas() {
    let t = 0;
    for (let i = 2; i <= 10; i++) {
      t += estado.estrellas[i] || 0;
    }
    return t; // Max 27
  }

  function porcentajeProgreso() {
    // 27 estrellas posibles = 100%
    const total = totalEstrellas();
    return Math.round((total / 27) * 100);
  }

  function registrarIntentoSimce(puntaje, total, nivel) {
    const intento = {
      fecha: new Date().toLocaleDateString('es-CL'),
      hora: new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' }),
      puntaje,
      total,
      porcentaje: Math.round((puntaje / total) * 100),
      nivel
    };
    estado.simceHistorial.unshift(intento);
    if (intento.porcentaje >= 80) {
      desbloquearLogro("simce_estrella");
    }
    agregarXP(puntaje * 15, `Ensayo SIMCE finalizado (${puntaje}/${total})`);
    guardar();
  }

  function mostrarToastXP(texto, detalle) {
    if (typeof Mensajes !== 'undefined' && Mensajes.toast) {
      Mensajes.toast(texto, {
        detalle: detalle,
        icono: '💎',
        tipo: 'xp',
        duracion: 3200
      });
    } else {
      const contenedor = document.getElementById('notificaciones-toast');
      if (!contenedor) return;

      const toast = document.createElement('div');
      toast.className = 'toast-notif toast-xp anim-toast-in';
      toast.innerHTML = `
        <div class="toast-icono-badge anim-bounce-once">💎</div>
        <div class="toast-contenido-textos">
          <strong class="toast-titulo">${texto}</strong>
          ${detalle ? `<small class="toast-sub">${detalle}</small>` : ''}
        </div>
      `;
      contenedor.appendChild(toast);
      setTimeout(() => {
        toast.classList.add('anim-toast-out');
        setTimeout(() => toast.remove(), 350);
      }, 3000);
    }
  }

  function mostrarModalLogro(logro) {
    const modal = document.getElementById('modal-logro');
    if (!modal) return;

    const elIcono = document.getElementById('modal-logro-icono');
    const elNombre = document.getElementById('modal-logro-nombre');
    const elDesc = document.getElementById('modal-logro-desc');

    if (elIcono) {
      elIcono.textContent = logro.icono;
      elIcono.className = 'modal-icono-anim anim-icon-exito';
    }
    if (elNombre) elNombre.textContent = logro.nombre;
    if (elDesc) elDesc.textContent = logro.desc;

    const card = modal.querySelector('.modal-card');
    if (card) {
      card.className = 'modal-card modal-mensaje-card modal-tipo-exito anim-pop-in';
    }

    modal.classList.add('activo');
  }

  function actualizarBarraSuperior() {
    const infoNivel = calcularNivel();
    const elNombre = document.getElementById('top-estudiante-nombre');
    const elPuntos = document.getElementById('top-puntos');
    const elEstrellas = document.getElementById('top-estrellas');
    const elNivelTitulo = document.getElementById('top-nivel-titulo');
    const elAvatar = document.getElementById('top-avatar-img');

    if (elNombre) elNombre.textContent = estado.estudiante.nombre;
    if (elPuntos) elPuntos.textContent = `${estado.puntos} XP`;
    if (elEstrellas) elEstrellas.textContent = `${totalEstrellas()}/27 ⭐`;
    if (elNivelTitulo) elNivelTitulo.textContent = `Nivel ${infoNivel.nivel}: ${infoNivel.titulo}`;
    if (elAvatar) {
      elAvatar.src = `imagen/avatar-${estado.estudiante.avatar}.svg`;
      elAvatar.alt = estado.estudiante.avatar;
    }
  }

  return {
    inicializar,
    obtenerEstado: () => estado,
    agregarXP,
    asignarEstrellas,
    forzarDesbloqueoSimce,
    desbloquearLogro,
    calcularNivel,
    totalEstrellas,
    porcentajeProgreso,
    registrarIntentoSimce,
    actualizarBarraSuperior
  };
})();
