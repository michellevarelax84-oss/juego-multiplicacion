/**
 * PLATAFORMA EDUCATIVA "MIS TABLAS"
 * Controlador Principal de la Aplicación (SPA)
 */

const App = (() => {
  let tablaActiva = 2;
  let factorVisualActivo = 3;
  let practicaEstado = {
    preguntas: [],
    indice: 0,
    aciertos: 0,
    respondida: false
  };

  function init() {
    // Inicializar audio y progreso
    Progreso.inicializar();
    Progreso.actualizarBarraSuperior();

    // Comprobar si hay usuario registrado
    const usuarioRaw = localStorage.getItem('misTablas_usuario');
    if (!usuarioRaw) {
      // Si no existe, crear uno por defecto o invitar a iniciar sesión
      localStorage.setItem('misTablas_usuario', JSON.stringify({
        nombre: "Aventurero",
        avatar: "zorro"
      }));
      Progreso.inicializar();
    }

    renderMenuPrincipal();
    renderListaTablasAprender();
    renderPantallaProgreso();
    renderPantallaLogros();

    // Actualizar estado de mute en UI
    actualizarBotonAudio();
  }

  function navegar(pantallaId) {
    Sonidos.clic();

    // Ocultar todas las pantallas principales
    const pantallas = [
      'pantalla-menu',
      'pantalla-aprender',
      'pantalla-tabla-detalle',
      'pantalla-juegos',
      'pantalla-progreso',
      'pantalla-logros',
      'pantalla-simce'
    ];

    pantallas.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.remove('activo');
    });

    const destino = document.getElementById(`pantalla-${pantallaId}`);
    if (destino) {
      destino.classList.add('activo');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Acciones específicas al entrar a una pantalla
    if (pantallaId === 'menu') {
      renderMenuPrincipal();
    } else if (pantallaId === 'aprender') {
      renderListaTablasAprender();
    } else if (pantallaId === 'progreso') {
      renderPantallaProgreso();
    } else if (pantallaId === 'logros') {
      renderPantallaLogros();
    } else if (pantallaId === 'simce') {
      Simce.iniciar();
    }
  }

  // ==========================================
  // MENÚ PRINCIPAL
  // ==========================================
  function renderMenuPrincipal() {
    const estado = Progreso.obtenerEstado();
    const infoNivel = Progreso.calcularNivel();
    const porcentaje = Progreso.porcentajeProgreso();
    const totalStars = Progreso.totalEstrellas();

    const elNombre = document.getElementById('menu-saludo-nombre');
    const elSub = document.getElementById('menu-saludo-sub');
    const elProgresoBar = document.getElementById('menu-progreso-bar');
    const elProgresoPct = document.getElementById('menu-progreso-pct');
    const elBadgeSimce = document.getElementById('menu-badge-simce');
    const elCardSimce = document.getElementById('card-menu-simce');

    if (elNombre) elNombre.textContent = `¡Hola, ${estado.estudiante.nombre}!`;
    if (elSub) {
      const frases = [
        "¿Listo para multiplicar tus superpoderes hoy?",
        "Las matemáticas son como un juego mágico, ¡vamos a explorar!",
        "Hoy es un gran día para ganar nuevas estrellas y medallas.",
        "¡Cada error es una oportunidad para aprender algo nuevo!"
      ];
      elSub.textContent = frases[Math.floor(Math.random() * frases.length)];
    }
    if (elProgresoBar) elProgresoBar.style.width = `${porcentaje}%`;
    if (elProgresoPct) elProgresoPct.textContent = `${porcentaje}% de Dominio (${totalStars}/27 ⭐)`;

    // Estado del ensayo SIMCE
    if (elBadgeSimce && elCardSimce) {
      if (estado.simceDesbloqueado) {
        elBadgeSimce.textContent = "¡HABILITADO!";
        elBadgeSimce.className = "badge-estado badge-desbloqueado";
        elCardSimce.classList.remove('card-bloqueada');
      } else {
        elBadgeSimce.textContent = "Desbloquear con 2 tablas";
        elBadgeSimce.className = "badge-estado badge-bloqueado";
      }
    }
  }

  // ==========================================
  // MÓDULO APRENDER TABLAS (LISTA)
  // ==========================================
  function renderListaTablasAprender() {
    const contenedor = document.getElementById('grid-tablas-aprender');
    if (!contenedor) return;

    const estado = Progreso.obtenerEstado();
    let html = '';

    for (let t = 2; t <= 10; t++) {
      const info = DATOS.tablas[t];
      const estrellas = estado.estrellas[t] || 0;
      const estrellasHTML = '⭐'.repeat(estrellas) + '☆'.repeat(3 - estrellas);

      html += `
        <div class="tarjeta-tabla-seleccion anim-card" onclick="App.verTabla(${t})" style="border-top: 6px solid ${info.color}">
          <div class="tabla-sel-icono">${info.icono}</div>
          <h3>${info.nombre}</h3>
          <span class="tabla-sel-apodo">${info.apodo}</span>
          <p class="tabla-sel-desc">${info.descripcion}</p>
          <div class="tabla-sel-estrellas">${estrellasHTML}</div>
          <button class="btn btn-primario btn-sm mt-3">Explorar Tabla ➜</button>
        </div>
      `;
    }

    contenedor.innerHTML = html;
  }

  // ==========================================
  // APRENDIZAJE INTERACTIVO DE UNA TABLA
  // ==========================================
  function verTabla(num) {
    tablaActiva = num;
    factorVisualActivo = 3;
    navegar('tabla-detalle');
    renderDetalleTabla();
  }

  function cambiarPestanaTabla(pestana) {
    Sonidos.clic();
    document.querySelectorAll('.tab-btn-aprender').forEach(b => b.classList.remove('activo'));
    document.querySelectorAll('.tab-contenido-aprender').forEach(c => c.classList.remove('activo'));

    const btn = document.getElementById(`tab-btn-${pestana}`);
    const cont = document.getElementById(`tab-cont-${pestana}`);
    if (btn) btn.classList.add('activo');
    if (cont) cont.classList.add('activo');
  }

  function renderDetalleTabla() {
    const info = DATOS.tablas[tablaActiva];
    const estado = Progreso.obtenerEstado();
    const estrellas = estado.estrellas[tablaActiva] || 0;

    // Encabezado
    const titulo = document.getElementById('detalle-tabla-titulo');
    const apodo = document.getElementById('detalle-tabla-apodo');
    const estrellasEl = document.getElementById('detalle-tabla-estrellas');

    if (titulo) titulo.innerHTML = `<span style="color:${info.color}">${info.icono}</span> ${info.nombre}`;
    if (apodo) apodo.textContent = info.apodo;
    if (estrellasEl) estrellasEl.textContent = '⭐'.repeat(estrellas) + '☆'.repeat(3 - estrellas);

    // Barra de navegación de números de tablas
    const selectorNav = document.getElementById('selector-rapido-tablas');
    if (selectorNav) {
      selectorNav.innerHTML = [2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => `
        <button class="btn-num-rapido ${n === tablaActiva ? 'activo' : ''}" onclick="App.verTabla(${n})">
          ${n}
        </button>
      `).join('');
    }

    // Renderizar Pestaña 1: Explorador Visual
    renderExploradorVisual();

    // Renderizar Pestaña 2: Patrones y Secretos
    const contPatrones = document.getElementById('tab-cont-patrones');
    if (contPatrones) {
      contPatrones.innerHTML = `
        <div class="caja-patrones-didacticos anim-fade">
          <div class="tarjeta-patron-destacado" style="border-left: 8px solid ${info.color}">
            <div class="patron-icono-badge">🔍</div>
            <div>
              <h3>Patrón Oculto de la ${info.nombre}</h3>
              <p class="patron-texto">${info.patron}</p>
            </div>
          </div>

          <div class="tarjeta-truco-mnemo">
            <div class="patron-icono-badge">💡</div>
            <div>
              <h3>El Secreto Mágico</h3>
              <p class="truco-texto">${info.truco}</p>
            </div>
          </div>

          <div class="tabla-completa-resumen">
            <h4>Toda la ${info.nombre} de un Vistazo:</h4>
            <div class="grid-resumen-operaciones">
              ${info.ejercicios.map(ej => `
                <div class="item-resumen-op">
                  <span class="op-exp">${tablaActiva} × ${ej.factor} = </span>
                  <strong class="op-prod" style="color:${info.color}">${ej.prod}</strong>
                  <small class="op-pista">${ej.pista}</small>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    }

    // Iniciar Pestaña 3: Práctica con Pistas
    iniciarPracticaTabla();

    // Por defecto mostrar la pestaña 1
    cambiarPestanaTabla('explorador');
  }

  function setFactorVisual(f) {
    Sonidos.clic();
    factorVisualActivo = f;
    renderExploradorVisual();
  }

  function renderExploradorVisual() {
    const info = DATOS.tablas[tablaActiva];
    const f = factorVisualActivo;
    const ej = info.ejercicios.find(x => x.factor === f) || { prod: tablaActiva * f, suma: `${tablaActiva} repetido ${f} veces`, pista: "" };
    const cont = document.getElementById('tab-cont-explorador');
    if (!cont) return;

    // Generar grupos de objetos (COPISI concreto)
    let gruposHTML = '';
    for (let g = 1; g <= f; g++) {
      let items = '';
      for (let i = 1; i <= tablaActiva; i++) {
        items += `<span class="obj-visual anim-pop">${info.icono}</span>`;
      }
      gruposHTML += `
        <div class="caja-grupo-visual">
          <span class="grupo-num">Grupo ${g}</span>
          <div class="grupo-items">${items}</div>
          <span class="grupo-sub">${tablaActiva} ${info.objeto}</span>
        </div>
      `;
    }

    // Recta numérica interactiva con saltos
    let saltosHTML = '';
    for (let step = 0; step <= 10; step++) {
      const val = tablaActiva * step;
      const esActivo = step <= f;
      saltosHTML += `
        <div class="recta-punto ${esActivo ? 'punto-alcanzado' : ''}">
          <span class="recta-val">${val}</span>
          <span class="recta-tick"></span>
          ${step === f ? `<span class="recta-marcador anim-bounce">📍 (${f} saltos)</span>` : ''}
        </div>
      `;
    }

    // Matriz rectangular (filas x columnas)
    let matrizHTML = '';
    for (let row = 1; row <= f; row++) {
      let celdas = '';
      for (let col = 1; col <= tablaActiva; col++) {
        celdas += `<div class="matriz-celda" title="Fila ${row}, Col ${col}"></div>`;
      }
      matrizHTML += `<div class="matriz-fila">${celdas}</div>`;
    }

    cont.innerHTML = `
      <div class="explorador-visual-caja anim-fade">
        <!-- Selector de factor (1 al 10) -->
        <div class="selector-factor-barra">
          <span class="lbl-multiplicar">${tablaActiva} ×</span>
          <div class="botones-factores">
            ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => `
              <button class="btn-factor ${n === f ? 'activo' : ''}" onclick="App.setFactorVisual(${n})">
                ${n}
              </button>
            `).join('')}
          </div>
          <span class="lbl-igual">=</span>
          <strong class="resultado-grande" style="color:${info.color}">${ej.prod}</strong>
        </div>

        <!-- Explicación pedagógica destacada -->
        <div class="caja-explicacion-copisi">
          <div class="explicacion-texto-box">
            <h3>${f} grupos de ${tablaActiva} ${info.objeto} = ${ej.prod}</h3>
            <p><strong>Suma iterada:</strong> ${ej.suma} = <strong>${ej.prod}</strong></p>
            <p class="pista-copisi">💡 <em>${ej.pista}</em></p>
          </div>
          <button class="btn btn-sm btn-outline btn-voz" onclick="App.leerEnVozAlta('${tablaActiva} por ${f} es igual a ${ej.prod}. Significa sumar ${f} veces el ${tablaActiva}.')">
            🔊 Escuchar
          </button>
        </div>

        <!-- 1. Representación Concreta de Grupos -->
        <div class="seccion-representacion">
          <h4>📦 1. Representación por Grupos Concretos:</h4>
          <div class="grid-grupos-visuales">
            ${gruposHTML}
          </div>
        </div>

        <!-- 2. Recta Numérica (Saltos de suma iterada) -->
        <div class="seccion-representacion mt-4">
          <h4>🐸 2. Recta Numérica: ${f} saltos de ${tablaActiva} en ${tablaActiva}</h4>
          <div class="recta-numerica-box">
            <div class="recta-linea"></div>
            <div class="recta-puntos-grid">
              ${saltosHTML}
            </div>
          </div>
        </div>

        <!-- 3. Arreglo Rectangular / Matriz -->
        <div class="seccion-representacion mt-4">
          <h4>📐 3. Arreglo Rectangular (${f} filas × ${tablaActiva} columnas):</h4>
          <div class="matriz-visual-box">
            ${matrizHTML}
          </div>
        </div>
      </div>
    `;
  }

  // ==========================================
  // PRÁCTICA GUIADA CON PISTAS (GANA ESTRELLAS)
  // ==========================================
  function iniciarPracticaTabla() {
    const info = DATOS.tablas[tablaActiva];
    // Generar 5 preguntas para la tabla
    const factores = [rand(1, 3), rand(4, 6), rand(7, 8), rand(9, 10), rand(2, 9)];
    practicaEstado.preguntas = factores.map(f => {
      const prod = tablaActiva * f;
      const dist = new Set([prod]);
      while (dist.size < 4) {
        dist.add(Math.max(1, prod + (Math.random() < 0.5 ? -1 : 1) * tablaActiva * rand(1, 2)));
      }
      return {
        factor: f,
        correcta: prod,
        opciones: [...dist].sort(() => Math.random() - 0.5),
        pista: info.ejercicios.find(x => x.factor === f)?.pista || `Recuerda: ${tablaActiva} × ${f} es sumar ${f} veces ${tablaActiva}.`
      };
    });
    practicaEstado.indice = 0;
    practicaEstado.aciertos = 0;
    practicaEstado.respondida = false;

    renderPreguntaPractica();
  }

  function renderPreguntaPractica() {
    const cont = document.getElementById('tab-cont-practica');
    if (!cont) return;

    if (practicaEstado.indice >= practicaEstado.preguntas.length) {
      // Fin de la práctica: calcular estrellas
      finalizarPracticaTabla();
      return;
    }

    const q = practicaEstado.preguntas[practicaEstado.indice];
    const info = DATOS.tablas[tablaActiva];

    cont.innerHTML = `
      <div class="practica-tarjeta anim-fade">
        <div class="practica-header">
          <span class="badge-ronda">Desafío ${practicaEstado.indice + 1} de 5</span>
          <span class="badge-aciertos">Aciertos: ${practicaEstado.aciertos} ⭐</span>
        </div>

        <div class="pregunta-practica-caja">
          <p class="pregunta-previa">¿Cuál es el resultado de:</p>
          <h1 class="practica-operacion" style="color:${info.color}">${tablaActiva} × ${q.factor} = ?</h1>
        </div>

        <div class="grid-practica-opciones" id="grid-practica-ops">
          ${q.opciones.map(op => `
            <button class="btn-practica-op" onclick="App.responderPractica(${op})">${op}</button>
          `).join('')}
        </div>

        <div class="pista-box mt-3" id="pista-practica-caja" style="display:none;">
          <strong>💡 Pista del Profe:</strong> ${q.pista}
        </div>

        <div class="controles-practica-footer mt-4">
          <button class="btn btn-sm btn-outline" onclick="App.mostrarPistaPractica()">💡 Ver Pista</button>
        </div>
      </div>
    `;
  }

  function mostrarPistaPractica() {
    Sonidos.clic();
    const caja = document.getElementById('pista-practica-caja');
    if (caja) caja.style.display = 'block';
  }

  function responderPractica(op) {
    if (practicaEstado.respondida) return;
    practicaEstado.respondida = true;

    const q = practicaEstado.preguntas[practicaEstado.indice];
    const esCorrecto = op === q.correcta;

    const contenedorOps = document.getElementById('grid-practica-ops');
    if (contenedorOps) {
      Array.from(contenedorOps.children).forEach(btn => {
        const val = parseInt(btn.textContent, 10);
        if (val === q.correcta) {
          btn.classList.add('op-acierto');
        } else if (val === op) {
          btn.classList.add('op-fallo');
        }
      });
    }

    if (esCorrecto) {
      Sonidos.acierto();
      practicaEstado.aciertos++;
      Progreso.agregarXP(10);
    } else {
      Sonidos.error();
    }

    setTimeout(() => {
      practicaEstado.indice++;
      practicaEstado.respondida = false;
      renderPreguntaPractica();
    }, 1200);
  }

  function finalizarPracticaTabla() {
    const aciertos = practicaEstado.aciertos;
    let estrellasGanadas = 1;
    if (aciertos >= 5) estrellasGanadas = 3;
    else if (aciertos >= 3) estrellasGanadas = 2;

    // Asignar estrellas
    Progreso.asignarEstrellas(tablaActiva, estrellasGanadas);

    Sonidos.fanfarria();
    lanzarConfeti();

    const cont = document.getElementById('tab-cont-practica');
    if (!cont) return;

    cont.innerHTML = `
      <div class="juego-fin anim-pop">
        <h2>🎉 ¡Práctica de la Tabla del ${tablaActiva} Completada!</h2>
        <div class="resultado-stats-caja">
          <p>Aciertos: <strong>${aciertos} de 5</strong></p>
          <div class="estrellas-ganadas-display my-2">
            ${'⭐'.repeat(estrellasGanadas)}${'☆'.repeat(3 - estrellasGanadas)}
          </div>
          <p>¡Has obtenido <strong>${estrellasGanadas} estrella(s)</strong> para tu progreso!</p>
        </div>
        <div class="d-flex gap-2 justify-center mt-3">
          <button class="btn btn-primario" onclick="App.iniciarPracticaTabla()">🔄 Repetir Práctica</button>
          <button class="btn btn-outline" onclick="App.navegar('aprender')">📚 Ver Otras Tablas</button>
        </div>
      </div>
    `;
  }

  // ==========================================
  // PANTALLA MI PROGRESO Y PUNTAJE
  // ==========================================
  function renderPantallaProgreso() {
    const estado = Progreso.obtenerEstado();
    const infoNivel = Progreso.calcularNivel();
    const pct = Progreso.porcentajeProgreso();
    const totalEstrellas = Progreso.totalEstrellas();

    const elPct = document.getElementById('progreso-general-pct');
    const elBar = document.getElementById('progreso-general-bar');
    const elPuntos = document.getElementById('progreso-total-puntos');
    const elNivelTxt = document.getElementById('progreso-nivel-txt');
    const elNivelIcon = document.getElementById('progreso-nivel-icon');
    const elGridTablas = document.getElementById('progreso-grid-tablas');
    const elHistorialSimce = document.getElementById('progreso-historial-simce');

    if (elPct) elPct.textContent = `${pct}%`;
    if (elBar) elBar.style.width = `${pct}%`;
    if (elPuntos) elPuntos.textContent = `${estado.puntos} XP`;
    if (elNivelTxt) elNivelTxt.textContent = `Nivel ${infoNivel.nivel}: ${infoNivel.titulo}`;
    if (elNivelIcon) elNivelIcon.textContent = infoNivel.icono;

    // Renderizar desglose por cada tabla (2 al 10)
    if (elGridTablas) {
      let html = '';
      for (let t = 2; t <= 10; t++) {
        const est = estado.estrellas[t] || 0;
        const info = DATOS.tablas[t];
        const pctTabla = Math.round((est / 3) * 100);

        html += `
          <div class="item-progreso-tabla">
            <div class="t-prog-header">
              <span class="t-prog-nombre">${info.icono} ${info.nombre}</span>
              <span class="t-prog-stars">${'⭐'.repeat(est)}${'☆'.repeat(3 - est)}</span>
            </div>
            <div class="barra-mini-progreso">
              <div class="barra-mini-fill" style="width: ${pctTabla}%; background: ${info.color}"></div>
            </div>
          </div>
        `;
      }
      elGridTablas.innerHTML = html;
    }

    // Historial SIMCE
    if (elHistorialSimce) {
      if (estado.simceHistorial.length === 0) {
        elHistorialSimce.innerHTML = `
          <div class="alerta alerta-info">
            <p>Aún no has rendido ningún ensayo SIMCE. ¡Completa algunas actividades y ríndelo cuando estés listo!</p>
          </div>
        `;
      } else {
        elHistorialSimce.innerHTML = estado.simceHistorial.slice(0, 5).map((h, i) => `
          <div class="item-historial-simce">
            <div>
              <strong>Ensayo #${estado.simceHistorial.length - i}</strong>
              <small class="d-block text-muted">${h.fecha} a las ${h.hora}</small>
            </div>
            <div class="text-right">
              <span class="badge-simce-puntaje">${h.puntaje} / ${h.total} (${h.porcentaje}%)</span>
              <span class="badge-simce-nivel nivel-${h.nivel.toLowerCase()}">${h.nivel}</span>
            </div>
          </div>
        `).join('');
      }
    }
  }

  // ==========================================
  // PANTALLA LOGROS Y RECOMPENSAS
  // ==========================================
  function renderPantallaLogros() {
    const contenedor = document.getElementById('grid-logros-contenedor');
    if (!contenedor) return;

    const estado = Progreso.obtenerEstado();

    contenedor.innerHTML = DATOS.logros.map(l => {
      const desbloqueado = estado.logros.includes(l.id);
      return `
        <div class="tarjeta-logro anim-card ${desbloqueado ? 'desbloqueado' : 'bloqueado'}">
          <div class="logro-icono-circulo">${desbloqueado ? l.icono : '🔒'}</div>
          <h4>${l.nombre}</h4>
          <p>${l.desc}</p>
          <span class="logro-estado-tag">${desbloqueado ? '✨ ¡Conseguido!' : 'Por desbloquear'}</span>
        </div>
      `;
    }).join('');
  }

  // ==========================================
  // CONFETI Y CELEBRACIONES NATIVAS
  // ==========================================
  function lanzarConfeti() {
    const canvas = document.getElementById('canvas-confeti');
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    const particulas = [];
    const colores = ['#F59E0B', '#EF4444', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899'];

    for (let i = 0; i < 80; i++) {
      particulas.push({
        x: Math.random() * canvas.width,
        y: -10 - Math.random() * 50,
        r: Math.random() * 7 + 4,
        color: colores[Math.floor(Math.random() * colores.length)],
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * 4 + 3,
        rot: Math.random() * 360,
        rotV: (Math.random() - 0.5) * 8
      });
    }

    let frame = 0;
    function anim() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particulas.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.rotV;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r);
        ctx.restore();
      });

      frame++;
      if (frame < 120) {
        requestAnimationFrame(anim);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    requestAnimationFrame(anim);
  }

  // ==========================================
  // TEXT-TO-SPEECH (ACCESIBILIDAD INFANTIL)
  // ==========================================
  function leerEnVozAlta(texto) {
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(texto);
      u.lang = 'es-CL';
      u.rate = 0.95;
      window.speechSynthesis.speak(u);
    } catch (e) {
      console.warn("Speech Synthesis error", e);
    }
  }

  // ==========================================
  // AUDIO TOGGLE
  // ==========================================
  function toggleAudio() {
    const isMuted = Sonidos.toggleMute();
    actualizarBotonAudio();
  }

  function actualizarBotonAudio() {
    const btn = document.getElementById('btn-toggle-sonido');
    if (btn) {
      const muted = Sonidos.isMuted();
      btn.innerHTML = muted ? '🔇 <span>Silencio</span>' : '🔊 <span>Sonido</span>';
    }
  }

  function cerrarModalLogro() {
    const modal = document.getElementById('modal-logro');
    if (modal) modal.classList.remove('activo');
  }

  function salirAlLogin() {
    Mensajes.confirmar({
      titulo: 'Cambiar de Estudiante',
      texto: '¿Deseas salir a la portada para seleccionar otro nombre o avatar?<br><small class="text-muted">⭐ Tu progreso y estrellas quedan guardadas automáticamente.</small>',
      icono: '👤',
      tipo: 'aviso',
      textoConfirmar: 'Sí, cambiar estudiante ➜',
      textoCancelar: 'Quedarme aquí ✕',
      alConfirmar: () => {
        window.location.href = "../index.html";
      }
    });
  }

  return {
    init,
    navegar,
    verTabla,
    cambiarPestanaTabla,
    setFactorVisual,
    iniciarPracticaTabla,
    mostrarPistaPractica,
    responderPractica,
    lanzarConfeti,
    leerEnVozAlta,
    toggleAudio,
    cerrarModalLogro,
    salirAlLogin
  };
})();

// Iniciar aplicación al cargar el DOM
window.addEventListener('DOMContentLoaded', () => {
  App.init();
});
