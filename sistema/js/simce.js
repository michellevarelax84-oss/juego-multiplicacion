/**
 * PLATAFORMA EDUCATIVA "MIS TABLAS"
 * Módulo de Ensayo Matemático Tipo SIMCE 4° Básico
 * Implementación con sector lateral de 10 preguntas y área principal con alternativas
 */

const Simce = (() => {
  let preguntas = [];
  let respuestasUsuario = {}; // { 1: 0, 2: 1, ... }
  let preguntaActualIndex = 0;
  let finalizado = false;

  function iniciar() {
    preguntas = [...DATOS.simcePreguntas];
    respuestasUsuario = {};
    preguntaActualIndex = 0;
    finalizado = false;

    renderEstructura();
    cargarPregunta(0);
  }

  function renderEstructura() {
    const contenedor = document.getElementById('pantalla-simce');
    if (!contenedor) return;

    contenedor.innerHTML = `
      <div class="simce-contenedor">
        <!-- Barra superior del ensayo -->
        <div class="simce-header">
          <div class="simce-titulo-box">
            <span class="simce-badge">PRUEBA OFICIAL</span>
            <h2>📝 Ensayo Matemático Tipo SIMCE</h2>
            <p>Multiplicación y Resolución de Problemas en Contextos Cotidianos (4° Básico)</p>
          </div>
          <div class="simce-acciones-header">
            <button class="btn btn-outline" onclick="App.navegar('menu')">✕ Salir al Menú</button>
          </div>
        </div>

        <div class="simce-layout">
          <!-- Sector lateral: Lista de 10 preguntas numeradas -->
          <aside class="simce-lateral">
            <h4>Navegación del Ensayo</h4>
            <p class="simce-lateral-desc">Selecciona cualquier pregunta para responderla:</p>
            <div class="grid-numeros-simce" id="grid-numeros-simce">
              ${preguntas.map((p, idx) => `
                <button class="btn-num-simce" id="btn-num-${idx}" onclick="Simce.irAPregunta(${idx})">
                  <span class="num-val">${idx + 1}</span>
                  <span class="num-estado" id="estado-icon-${idx}">⚪</span>
                </button>
              `).join('')}
            </div>

            <div class="simce-leyenda">
              <div class="leyenda-item"><span class="punto punto-actual"></span> Actual</div>
              <div class="leyenda-item"><span class="punto punto-respondida"></span> Respondida</div>
              <div class="leyenda-item"><span class="punto punto-pendiente"></span> Pendiente</div>
            </div>

            <div class="simce-progreso-resumen">
              <span>Respondidas: <strong id="simce-respondidas-count">0</strong> / 10</span>
              <div class="barra-progreso-mini">
                <div class="barra-progreso-fill" id="simce-progreso-bar" style="width: 0%"></div>
              </div>
            </div>

            <button class="btn btn-exito btn-block mt-4" onclick="Simce.solicitarFinalizacion()">
              🏁 Entregar y Finalizar Ensayo
            </button>
          </aside>

          <!-- Área Principal: Pregunta y alternativas -->
          <main class="simce-principal" id="simce-area-pregunta">
            <!-- Cargado dinámicamente por cargarPregunta() -->
          </main>
        </div>
      </div>
    `;
  }

  function cargarPregunta(index) {
    preguntaActualIndex = index;
    const p = preguntas[index];
    const area = document.getElementById('simce-area-pregunta');
    if (!area || !p) return;

    // Actualizar botones laterales
    actualizarPanelLateral();

    const letras = ['A', 'B', 'C', 'D'];
    const respuestaSeleccionada = respuestasUsuario[p.id];

    area.innerHTML = `
      <div class="pregunta-tarjeta anim-fade">
        <div class="pregunta-meta">
          <span class="badge-contexto">${p.icono} ${p.contexto}</span>
          <span class="badge-numero-pregunta">Pregunta ${index + 1} de ${preguntas.length}</span>
        </div>

        <div class="pregunta-enunciado">
          <p>${p.enunciado}</p>
        </div>

        <div class="pregunta-alternativas">
          ${p.opciones.map((op, opIdx) => {
            const estaSeleccionada = respuestaSeleccionada === opIdx;
            return `
              <button class="btn-alternativa ${estaSeleccionada ? 'seleccionada' : ''}" onclick="Simce.seleccionarRespuesta(${p.id}, ${opIdx})">
                <span class="letra-alt">${letras[opIdx]}</span>
                <span class="texto-alt">${op}</span>
                ${estaSeleccionada ? '<span class="check-alt">✓</span>' : ''}
              </button>
            `;
          }).join('')}
        </div>

        <div class="pregunta-navegacion">
          <button class="btn btn-outline" ${index === 0 ? 'disabled' : ''} onclick="Simce.anterior()">
            ← Pregunta Anterior
          </button>
          <div class="espaciador"></div>
          ${index < preguntas.length - 1 ? `
            <button class="btn btn-primario" onclick="Simce.siguiente()">
              Pregunta Siguiente →
            </button>
          ` : `
            <button class="btn btn-exito" onclick="Simce.solicitarFinalizacion()">
              🏁 Finalizar Ensayo
            </button>
          `}
        </div>
      </div>
    `;
  }

  function actualizarPanelLateral() {
    preguntas.forEach((p, idx) => {
      const btn = document.getElementById(`btn-num-${idx}`);
      const icon = document.getElementById(`estado-icon-${idx}`);
      if (!btn) return;

      const respondida = respuestasUsuario[p.id] !== undefined;
      const esActual = idx === preguntaActualIndex;

      btn.className = 'btn-num-simce';
      if (esActual) btn.classList.add('actual');
      if (respondida) btn.classList.add('respondida');

      if (icon) {
        icon.textContent = respondida ? '🟢' : '⚪';
      }
    });

    const totalResp = Object.keys(respuestasUsuario).length;
    const txtCount = document.getElementById('simce-respondidas-count');
    const bar = document.getElementById('simce-progreso-bar');
    if (txtCount) txtCount.textContent = totalResp;
    if (bar) bar.style.width = `${(totalResp / preguntas.length) * 100}%`;
  }

  function seleccionarRespuesta(preguntaId, opcionIdx) {
    Sonidos.clic();
    respuestasUsuario[preguntaId] = opcionIdx;
    cargarPregunta(preguntaActualIndex);
  }

  function irAPregunta(index) {
    Sonidos.clic();
    cargarPregunta(index);
  }

  function anterior() {
    if (preguntaActualIndex > 0) {
      Sonidos.clic();
      cargarPregunta(preguntaActualIndex - 1);
    }
  }

  function siguiente() {
    if (preguntaActualIndex < preguntas.length - 1) {
      Sonidos.clic();
      cargarPregunta(preguntaActualIndex + 1);
    }
  }

  function solicitarFinalizacion() {
    const totalResp = Object.keys(respuestasUsuario).length;
    if (totalResp < preguntas.length) {
      const faltan = preguntas.length - totalResp;
      Mensajes.confirmar({
        titulo: 'Preguntas Sin Responder',
        texto: `Tienes <strong>${faltan} pregunta(s) sin responder</strong> de las 10.<br>¿Deseas entregar el ensayo de todas formas o prefieres completarlas?`,
        icono: '📝',
        tipo: 'aviso',
        textoConfirmar: 'Entregar de todas formas 🏁',
        textoCancelar: 'Seguir respondiendo ➜',
        alConfirmar: () => calcularResultados()
      });
    } else {
      Mensajes.confirmar({
        titulo: '¿Listo para entregar el Ensayo?',
        texto: 'Has respondido las 10 preguntas con éxito.<br>¿Deseas calcular tu puntaje oficial y ver el informe de retroalimentación?',
        icono: '🎓',
        tipo: 'exito',
        textoConfirmar: '¡Sí, entregar ensayo! 🏆',
        textoCancelar: 'Revisar respuestas ➜',
        alConfirmar: () => calcularResultados()
      });
    }
  }

  function calcularResultados() {
    finalizado = true;
    let aciertos = 0;

    preguntas.forEach(p => {
      if (respuestasUsuario[p.id] === p.correcta) {
        aciertos++;
      }
    });

    const total = preguntas.length;
    const porcentaje = Math.round((aciertos / total) * 100);

    // Clasificación de logro oficial chileno SIMCE
    let nivel = "Insuficiente";
    let nivelClase = "nivel-insuficiente";
    let nivelMensaje = "¡No te preocupes! El aprendizaje es un camino paso a paso. Te recomendamos repasar los módulos de aprendizaje visual para afianzar tus tablas.";

    if (porcentaje >= 80) {
      nivel = "Adecuado";
      nivelClase = "nivel-adecuado";
      nivelMensaje = "¡Sobresaliente! Tienes un dominio excelente de las tablas de multiplicar y sabes aplicarlas con seguridad en problemas de la vida real.";
    } else if (porcentaje >= 60) {
      nivel = "Elemental";
      nivelClase = "nivel-elemental";
      nivelMensaje = "¡Buen trabajo! Resuelves bien la mayoría de los problemas. Practicando un poco más en los juegos alcanzarás el nivel Adecuado.";
    }

    // Registrar en progreso
    Progreso.registrarIntentoSimce(aciertos, total, nivel);

    if (porcentaje >= 80) {
      Sonidos.fanfarria();
      App.lanzarConfeti();
    } else {
      Sonidos.acierto();
    }

    renderPantallaResultados(aciertos, total, porcentaje, nivel, nivelClase, nivelMensaje);
  }

  function renderPantallaResultados(aciertos, total, porcentaje, nivel, nivelClase, nivelMensaje) {
    const contenedor = document.getElementById('pantalla-simce');
    if (!contenedor) return;

    const letras = ['A', 'B', 'C', 'D'];

    contenedor.innerHTML = `
      <div class="simce-resultados-contenedor anim-pop">
        <div class="resultado-cabecera">
          <div class="trofeo-resultado-box">
            <img src="imagen/trofeo.svg" alt="Trofeo" class="img-trofeo-anim">
          </div>
          <h1>Resultado Final del Ensayo SIMCE</h1>
          <p>Informe pedagógico de desempeño para 4° Básico</p>
        </div>

        <div class="resultado-tarjetas-resumen">
          <div class="tarjeta-resumen-item">
            <span class="label">Puntaje Obtenido</span>
            <strong class="valor">${aciertos} / ${total}</strong>
            <small>${porcentaje}% de aciertos</small>
          </div>
          <div class="tarjeta-resumen-item ${nivelClase}">
            <span class="label">Nivel de Logro SIMCE</span>
            <strong class="valor valor-nivel">${nivel}</strong>
            <small>${nivelMensaje}</small>
          </div>
        </div>

        <!-- Desglose y Retroalimentación pregunta por pregunta -->
        <div class="retroalimentacion-seccion">
          <h3>📋 Retroalimentación Pedagógica Detallada</h3>
          <p>Revisa la explicación paso a paso de cada una de las 10 situaciones:</p>

          <div class="lista-revision-preguntas">
            ${preguntas.map((p, idx) => {
              const respUserIdx = respuestasUsuario[p.id];
              const esCorrecta = respUserIdx === p.correcta;
              const respondio = respUserIdx !== undefined;

              return `
                <div class="tarjeta-revision ${esCorrecta ? 'rev-correcta' : 'rev-incorrecta'}">
                  <div class="rev-header">
                    <span class="rev-num">Pregunta ${idx + 1} (${p.contexto})</span>
                    <span class="rev-estado-badge">${esCorrecta ? '✅ Correcta' : (respondio ? '❌ Incorrecta' : '⚪ Omitida')}</span>
                  </div>
                  <p class="rev-enunciado">${p.enunciado}</p>

                  <div class="rev-comparacion">
                    <div class="rev-tu-respuesta">
                      <strong>Tu respuesta:</strong> ${respondio ? `${letras[respUserIdx]}) ${p.opciones[respUserIdx]}` : '<em>No respondida</em>'}
                    </div>
                    <div class="rev-correcta-respuesta">
                      <strong>Respuesta Correcta:</strong> ${letras[p.correcta]}) ${p.opciones[p.correcta]}
                    </div>
                  </div>

                  <div class="rev-explicacion">
                    <strong>💡 Explicación matemática:</strong>
                    <p>${p.explicacion}</p>
                    <div class="rev-operacion-destacada">Operación: ${p.operacion}</div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <div class="acciones-fin-simce">
          <button class="btn btn-primario btn-lg" onclick="Simce.iniciar()">
            🔄 Repetir Ensayo SIMCE
          </button>
          <button class="btn btn-outline btn-lg" onclick="App.navegar('menu')">
            🏠 Volver al Menú Principal
          </button>
        </div>
      </div>
    `;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return {
    iniciar,
    cargarPregunta,
    seleccionarRespuesta,
    irAPregunta,
    anterior,
    siguiente,
    solicitarFinalizacion
  };
})();
