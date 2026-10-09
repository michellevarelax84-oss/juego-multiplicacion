/**
 * PLATAFORMA EDUCATIVA "MIS TABLAS"
 * Módulo de Juegos y Actividades Interactivas (NO Monótonas)
 * 8 Actividades Lúdicas con Enfoque COPISI para 4° Básico
 * ¡TODOS LOS JUEGOS Y DESAFÍOS CUENTAN CON TEMPORIZADOR DE 1 MINUTO (60 SEGUNDOS)!
 */

const Juegos = (() => {
  let juegoActivo = null;
  let timerGeneral = null;

  // Utilidad para números aleatorios
  function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function shuffle(arr) {
    return [...arr].sort(() => Math.random() - 0.5);
  }

  function limpiarTimer() {
    if (timerGeneral) {
      clearInterval(timerGeneral);
      timerGeneral = null;
    }
  }

  // ==========================================
  // 1. MEMORIA MATEMÁTICA (1 MINUTO)
  // ==========================================
  const Memoria = {
    cartas: [],
    primeraCarta: null,
    segundaCarta: null,
    bloqueado: false,
    paresEncontrados: 0,
    totalPares: 6,
    tiempoRestante: 60,
    activo: false,

    iniciar(tabla = 0) {
      limpiarTimer();
      this.primeraCarta = null;
      this.segundaCarta = null;
      this.bloqueado = false;
      this.paresEncontrados = 0;
      this.totalPares = 6;
      this.tiempoRestante = 60;
      this.activo = true;

      // Generar 6 parejas
      const pares = [];
      const factoresUsados = new Set();
      while (pares.length < this.totalPares) {
        const t = (tabla >= 2 && tabla <= 10) ? tabla : rand(2, 10);
        const f = rand(2, 9);
        const clave = `${t}x${f}`;
        if (!factoresUsados.has(clave)) {
          factoresUsados.add(clave);
          pares.push({ op: `${t} × ${f}`, res: `${t * f}`, id: clave });
        }
      }

      this.cartas = [];
      pares.forEach((p, index) => {
        this.cartas.push({ id: `c-${index}-op`, parId: p.id, texto: p.op, tipo: 'op' });
        this.cartas.push({ id: `c-${index}-res`, parId: p.id, texto: p.res, tipo: 'res' });
      });
      this.cartas = shuffle(this.cartas);

      this.render();
      this.iniciarTimer();
    },

    iniciarTimer() {
      timerGeneral = setInterval(() => {
        if (!this.activo) return;
        this.tiempoRestante--;

        const elTxt = document.getElementById('memo-tiempo');
        const elBar = document.getElementById('memo-timer-bar');
        if (elTxt) elTxt.textContent = `${this.tiempoRestante}s`;
        if (elBar) elBar.style.width = `${(this.tiempoRestante / 60) * 100}%`;

        if (this.tiempoRestante <= 5 && this.tiempoRestante > 0) {
          Sonidos.tick();
        }

        if (this.tiempoRestante <= 0) {
          this.terminarPorTiempo();
        }
      }, 1000);
    },

    render() {
      const contenedor = document.getElementById('area-juego-memoria');
      if (!contenedor) return;

      contenedor.innerHTML = `
        <div class="juego-header">
          <div class="d-flex justify-between align-center flex-wrap gap-2">
            <div>
              <h3>🧠 Memoria Matemática (Desafío 1 Minuto)</h3>
              <p>Encuentra las 6 parejas de operaciones y resultados antes de que se agote el minuto.</p>
            </div>
            <button class="btn btn-sm btn-outline" onclick="Juegos.iniciar('memoria')">🔄 Reiniciar (60s)</button>
          </div>
          <div class="juego-stats mt-2">
            <span>⏱️ Tiempo: <strong id="memo-tiempo" class="text-primario">${this.tiempoRestante}s</strong></span>
            <span>Pares encontrados: <strong id="memo-pares">${this.paresEncontrados}</strong> / ${this.totalPares}</span>
          </div>
          <div class="barra-tiempo-container">
            <div class="barra-tiempo-fill" id="memo-timer-bar" style="width: ${(this.tiempoRestante / 60) * 100}%"></div>
          </div>
        </div>
        <div class="grid-memoria" id="grid-memoria">
          ${this.cartas.map(c => `
            <div class="carta-memoria" data-id="${c.id}" data-par="${c.parId}" onclick="Juegos.memoriaClick('${c.id}')">
              <div class="carta-inner">
                <div class="carta-frente">❓</div>
                <div class="carta-dorso ${c.tipo}">${c.texto}</div>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    },

    clickCarta(id) {
      if (!this.activo || this.bloqueado) return;
      const el = document.querySelector(`.carta-memoria[data-id="${id}"]`);
      if (!el || el.classList.contains('volteada') || el.classList.contains('emparejada')) return;

      Sonidos.clic();
      el.classList.add('volteada');

      if (!this.primeraCarta) {
        this.primeraCarta = { id, parId: el.dataset.par, el };
        return;
      }

      this.segundaCarta = { id, parId: el.dataset.par, el };
      this.bloqueado = true;

      // Verificar si coinciden
      if (this.primeraCarta.parId === this.segundaCarta.parId) {
        Sonidos.acierto();
        this.primeraCarta.el.classList.add('emparejada');
        this.segundaCarta.el.classList.add('emparejada');
        this.paresEncontrados++;

        const contador = document.getElementById('memo-pares');
        if (contador) contador.textContent = this.paresEncontrados;

        this.primeraCarta = null;
        this.segundaCarta = null;
        this.bloqueado = false;

        if (this.paresEncontrados === this.totalPares) {
          this.ganar();
        }
      } else {
        Sonidos.error();
        setTimeout(() => {
          if (this.primeraCarta && this.primeraCarta.el) this.primeraCarta.el.classList.remove('volteada');
          if (this.segundaCarta && this.segundaCarta.el) this.segundaCarta.el.classList.remove('volteada');
          this.primeraCarta = null;
          this.segundaCarta = null;
          this.bloqueado = false;
        }, 1000);
      }
    },

    ganar() {
      limpiarTimer();
      this.activo = false;
      Sonidos.fanfarria();

      const bonusTiempo = this.tiempoRestante * 2;
      const xpTotal = 50 + bonusTiempo;
      Progreso.agregarXP(xpTotal, `Memoria completada en 1 minuto (+${bonusTiempo} XP por rapidez)`);
      Progreso.desbloquearLogro("memoria_pro");
      App.lanzarConfeti();

      const contenedor = document.getElementById('area-juego-memoria');
      if (!contenedor) return;

      contenedor.innerHTML = `
        <div class="juego-fin anim-pop">
          <h2>🎉 ¡VICTORIA EN EL MINUTO!</h2>
          <div class="resultado-stats-caja">
            <p>¡Encontraste todas las parejas con <strong>${this.tiempoRestante} segundos</strong> de sobra!</p>
            <p>Puntos obtenidos: <strong>+${xpTotal} XP 💎</strong></p>
          </div>
          <button class="btn btn-primario btn-lg mt-3" onclick="Juegos.iniciar('memoria')">
            🔄 Jugar Otra Ronda de 1 Minuto
          </button>
        </div>
      `;
    },

    terminarPorTiempo() {
      limpiarTimer();
      this.activo = false;
      Sonidos.error();

      const contenedor = document.getElementById('area-juego-memoria');
      if (!contenedor) return;

      const xpGanada = this.paresEncontrados * 8;
      if (xpGanada > 0) Progreso.agregarXP(xpGanada);

      contenedor.innerHTML = `
        <div class="juego-fin anim-pop">
          <h2>⏰ ¡Se Acabó el Minuto!</h2>
          <div class="resultado-stats-caja">
            <p>Lograste encontrar <strong>${this.paresEncontrados}</strong> de ${this.totalPares} parejas.</p>
            <p>¡Buen intento! Cada vez serás más rápido.</p>
          </div>
          <button class="btn btn-primario btn-lg mt-3" onclick="Juegos.iniciar('memoria')">
            ⚡ Reintentar Desafío de 1 Minuto
          </button>
        </div>
      `;
    }
  };

  // ==========================================
  // 2. ATRAPA EL RESULTADO (1 MINUTO)
  // ==========================================
  const Atrapa = {
    aciertos: 0,
    racha: 0,
    tiempoRestante: 60,
    preguntaActual: null,
    activo: false,

    iniciar() {
      limpiarTimer();
      this.aciertos = 0;
      this.racha = 0;
      this.tiempoRestante = 60;
      this.activo = true;

      this.siguientePregunta();
      this.iniciarTimer();
    },

    iniciarTimer() {
      timerGeneral = setInterval(() => {
        if (!this.activo) return;
        this.tiempoRestante--;

        const elTxt = document.getElementById('atrapa-tiempo');
        const elBar = document.getElementById('atrapa-timer-bar');
        if (elTxt) elTxt.textContent = `${this.tiempoRestante}s`;
        if (elBar) elBar.style.width = `${(this.tiempoRestante / 60) * 100}%`;

        if (this.tiempoRestante <= 5 && this.tiempoRestante > 0) {
          Sonidos.tick();
        }

        if (this.tiempoRestante <= 0) {
          this.terminar();
        }
      }, 1000);
    },

    siguientePregunta() {
      if (!this.activo) return;

      const t = rand(2, 10);
      const f = rand(2, 10);
      const res = t * f;

      const opciones = new Set([res]);
      while (opciones.size < 4) {
        const offset = (Math.random() < 0.5 ? -1 : 1) * rand(1, 4) * (Math.random() < 0.5 ? 1 : 2);
        const dist = Math.max(2, res + offset);
        if (dist !== res) opciones.add(dist);
      }

      this.preguntaActual = {
        tabla: t,
        factor: f,
        correcta: res,
        opciones: shuffle([...opciones])
      };

      this.render();
    },

    render() {
      const contenedor = document.getElementById('area-juego-atrapa');
      if (!contenedor) return;

      const p = this.preguntaActual;
      contenedor.innerHTML = `
        <div class="juego-header">
          <div class="d-flex justify-between align-center flex-wrap gap-2">
            <div>
              <h3>🫧 Atrapa el Resultado (Desafío 1 Minuto)</h3>
              <p>¡Atrapa la mayor cantidad de burbujas correctas antes de que termine el minuto!</p>
            </div>
            <button class="btn btn-sm btn-outline" onclick="Juegos.iniciar('atrapa')">🔄 Reiniciar (60s)</button>
          </div>
          <div class="juego-stats mt-2">
            <span>⏱️ Tiempo: <strong id="atrapa-tiempo" class="text-primario">${this.tiempoRestante}s</strong></span>
            <span>Aciertos: <strong id="atrapa-aciertos">${this.aciertos}</strong></span>
            <span>Racha: <strong class="text-amarillo">🔥 x${Math.max(1, this.racha)}</strong></span>
          </div>
          <div class="barra-tiempo-container">
            <div class="barra-tiempo-fill" id="atrapa-timer-bar" style="width: ${(this.tiempoRestante / 60) * 100}%"></div>
          </div>
        </div>
        <div class="tablero-atrapa">
          <div class="pregunta-burbuja-box anim-pulse">
            <span class="signo-op">¿Cuánto es?</span>
            <h1 class="operacion-destacada">${p.tabla} × ${p.factor} = ?</h1>
          </div>
          <div class="zona-burbujas" id="zona-burbujas">
            ${p.opciones.map((op, i) => `
              <button class="burbuja-flotante b-anim-${(i % 4) + 1}" onclick="Juegos.atrapaResponder(${op})">
                <span>${op}</span>
              </button>
            `).join('')}
          </div>
        </div>
      `;
    },

    responder(opcionElegida) {
      if (!this.activo || !this.preguntaActual) return;
      Sonidos.burbuja();

      if (opcionElegida === this.preguntaActual.correcta) {
        Sonidos.acierto();
        this.aciertos++;
        this.racha++;
        Progreso.agregarXP(5 * Math.min(3, this.racha));
        this.siguientePregunta();
      } else {
        Sonidos.error();
        this.racha = 0;
        this.siguientePregunta();
      }
    },

    terminar() {
      limpiarTimer();
      this.activo = false;
      Sonidos.fanfarria();

      const xpFinal = this.aciertos * 10;
      Progreso.agregarXP(xpFinal, `Atrapa el resultado en 1 minuto (${this.aciertos} aciertos)`);
      if (this.aciertos >= 8) Progreso.desbloquearLogro("cazador_burbujas");
      App.lanzarConfeti();

      const contenedor = document.getElementById('area-juego-atrapa');
      if (!contenedor) return;

      contenedor.innerHTML = `
        <div class="juego-fin anim-pop">
          <h2>⏰ ¡Fin del Minuto!</h2>
          <div class="resultado-stats-caja">
            <p>Atrapaste <strong>${this.aciertos}</strong> burbujas correctas en 60 segundos.</p>
            <p>Puntos ganados: <strong>+${xpFinal} XP 💎</strong></p>
          </div>
          <button class="btn btn-primario btn-lg mt-3" onclick="Juegos.iniciar('atrapa')">
            ⚡ Jugar Otra Ronda de 1 Minuto
          </button>
        </div>
      `;
    }
  };

  // ==========================================
  // 3. CONSTRUYE LA MULTIPLICACIÓN (1 MINUTO)
  // ==========================================
  const Constructor = {
    mision: null,
    grupos: 3,
    elementosPorGrupo: 4,
    construccionesLogradas: 0,
    tiempoRestante: 60,
    activo: false,

    iniciar() {
      limpiarTimer();
      this.construccionesLogradas = 0;
      this.tiempoRestante = 60;
      this.activo = true;
      this.nuevaMision();
      this.iniciarTimer();
    },

    iniciarTimer() {
      timerGeneral = setInterval(() => {
        if (!this.activo) return;
        this.tiempoRestante--;

        const elTxt = document.getElementById('construye-tiempo');
        const elBar = document.getElementById('construye-timer-bar');
        if (elTxt) elTxt.textContent = `${this.tiempoRestante}s`;
        if (elBar) elBar.style.width = `${(this.tiempoRestante / 60) * 100}%`;

        if (this.tiempoRestante <= 5 && this.tiempoRestante > 0) {
          Sonidos.tick();
        }

        if (this.tiempoRestante <= 0) {
          this.terminar();
        }
      }, 1000);
    },

    nuevaMision() {
      const t = rand(2, 6);
      const f = rand(2, 6);
      this.mision = {
        grupos: t,
        elementos: f,
        total: t * f
      };
      this.grupos = 2;
      this.elementosPorGrupo = 2;
      this.render();
    },

    render() {
      const contenedor = document.getElementById('area-juego-construye');
      if (!contenedor) return;

      const m = this.mision;
      const totalActual = this.grupos * this.elementosPorGrupo;
      const sumaRepetida = Array(this.grupos).fill(this.elementosPorGrupo).join(' + ');

      contenedor.innerHTML = `
        <div class="juego-header">
          <div class="d-flex justify-between align-center flex-wrap gap-2">
            <div>
              <h3>🧱 Construye la Multiplicación (Desafío 1 Minuto)</h3>
              <p>Construye la mayor cantidad de multiplicaciones agrupando objetos en 60 segundos.</p>
            </div>
            <button class="btn btn-sm btn-outline" onclick="Juegos.iniciar('construye')">🔄 Reiniciar (60s)</button>
          </div>
          <div class="juego-stats mt-2">
            <span>⏱️ Tiempo: <strong id="construye-tiempo" class="text-primario">${this.tiempoRestante}s</strong></span>
            <span>Construcciones completadas: <strong>${this.construccionesLogradas}</strong></span>
          </div>
          <div class="barra-tiempo-container">
            <div class="barra-tiempo-fill" id="construye-timer-bar" style="width: ${(this.tiempoRestante / 60) * 100}%"></div>
          </div>
        </div>

        <div class="panel-mision-construye">
          <div class="reto-box">
            <span>🎯 Tu Misión:</span>
            <strong>Representa ${m.grupos} × ${m.elementos} (Total: ${m.total})</strong>
          </div>
        </div>

        <div class="controles-construye">
          <div class="control-grupo">
            <label>Canastos (Grupos):</label>
            <div class="btn-group-step">
              <button class="btn-step" onclick="Juegos.construyeCambiar('grupos', -1)">−</button>
              <span class="valor-step" id="val-grupos">${this.grupos}</span>
              <button class="btn-step" onclick="Juegos.construyeCambiar('grupos', 1)">+</button>
            </div>
          </div>

          <div class="control-grupo">
            <label>Manzanas por canasto:</label>
            <div class="btn-group-step">
              <button class="btn-step" onclick="Juegos.construyeCambiar('elementos', -1)">−</button>
              <span class="valor-step" id="val-elementos">${this.elementosPorGrupo}</span>
              <button class="btn-step" onclick="Juegos.construyeCambiar('elementos', 1)">+</button>
            </div>
          </div>
        </div>

        <div class="vista-concreta" id="vista-concreta">
          ${this.generarCanastosHTML()}
        </div>

        <div class="resumen-construye">
          <p><strong>Suma iterada:</strong> ${sumaRepetida} = <span class="total-badge">${totalActual}</span></p>
          <p><strong>Multiplicación actual:</strong> ${this.grupos} grupos de ${this.elementosPorGrupo} = <strong>${this.grupos} × ${this.elementosPorGrupo}</strong></p>
          <button class="btn btn-exito btn-lg mt-3" onclick="Juegos.construyeComprobar()">
            ✅ ¡Comprobar Construcción!
          </button>
        </div>
      `;
    },

    generarCanastosHTML() {
      let html = '';
      for (let g = 1; g <= this.grupos; g++) {
        let manzanas = '';
        for (let e = 1; e <= this.elementosPorGrupo; e++) {
          manzanas += '<span class="objeto-fruta anim-pop" title="Manzana">🍎</span>';
        }
        html += `
          <div class="canasto-caja">
            <div class="canasto-titulo">Canasto ${g}</div>
            <div class="canasto-contenido">${manzanas}</div>
            <div class="canasto-pie">${this.elementosPorGrupo} manzanas</div>
          </div>
        `;
      }
      return html;
    },

    cambiar(tipo, delta) {
      if (!this.activo) return;
      Sonidos.clic();
      if (tipo === 'grupos') {
        this.grupos = Math.max(1, Math.min(8, this.grupos + delta));
      } else {
        this.elementosPorGrupo = Math.max(1, Math.min(8, this.elementosPorGrupo + delta));
      }
      this.render();
    },

    comprobar() {
      if (!this.activo) return;
      const m = this.mision;

      if (this.grupos === m.grupos && this.elementosPorGrupo === m.elementos) {
        Sonidos.acierto();
        this.construccionesLogradas++;
        Progreso.agregarXP(30, `¡Construcción correcta (${this.construccionesLogradas})!`);
        Progreso.desbloquearLogro("constructor");
        this.nuevaMision();
      } else if (this.grupos * this.elementosPorGrupo === m.total) {
        Sonidos.acierto();
        this.construccionesLogradas++;
        Progreso.agregarXP(25, `¡Correcto por propiedad conmutativa!`);
        this.nuevaMision();
      } else {
        Sonidos.error();
        Mensajes.alerta({
          titulo: '¡Casi lo tienes!',
          texto: `Tu construcción da <strong>${this.grupos * this.elementosPorGrupo}</strong>, pero la misión pide <strong>${m.total}</strong>.<br>¡Ajusta los canastos rápido antes de que se acabe el minuto!`,
          icono: '🤔',
          tipo: 'aviso',
          botonTexto: '¡Seguir Intentando! ➜'
        });
      }
    },

    terminar() {
      limpiarTimer();
      this.activo = false;
      Sonidos.fanfarria();

      const xpFinal = this.construccionesLogradas * 20;
      Progreso.agregarXP(xpFinal, `Construcciones en 1 minuto`);
      App.lanzarConfeti();

      const contenedor = document.getElementById('area-juego-construye');
      if (!contenedor) return;

      contenedor.innerHTML = `
        <div class="juego-fin anim-pop">
          <h2>⏰ ¡Minuto Cumplido!</h2>
          <div class="resultado-stats-caja">
            <p>Construiste <strong>${this.construccionesLogradas}</strong> multiplicaciones con éxito en 60 segundos.</p>
            <p>Puntos ganados: <strong>+${xpFinal} XP 💎</strong></p>
          </div>
          <button class="btn btn-primario btn-lg mt-3" onclick="Juegos.iniciar('construye')">
            ⚡ Jugar Otra Ronda de 1 Minuto
          </button>
        </div>
      `;
    }
  };

  // ==========================================
  // 4. ¿QUIÉN TIENE LA RESPUESTA? (1 MINUTO)
  // ==========================================
  const QuienTiene = {
    casoIndex: 0,
    aciertos: 0,
    tiempoRestante: 60,
    activo: false,

    iniciar() {
      limpiarTimer();
      this.aciertos = 0;
      this.tiempoRestante = 60;
      this.activo = true;
      this.casoIndex = rand(0, DATOS.quienTieneRespuesta.length - 1);
      this.render();
      this.iniciarTimer();
    },

    iniciarTimer() {
      timerGeneral = setInterval(() => {
        if (!this.activo) return;
        this.tiempoRestante--;

        const elTxt = document.getElementById('quien-tiempo');
        const elBar = document.getElementById('quien-timer-bar');
        if (elTxt) elTxt.textContent = `${this.tiempoRestante}s`;
        if (elBar) elBar.style.width = `${(this.tiempoRestante / 60) * 100}%`;

        if (this.tiempoRestante <= 5 && this.tiempoRestante > 0) {
          Sonidos.tick();
        }

        if (this.tiempoRestante <= 0) {
          this.terminar();
        }
      }, 1000);
    },

    render() {
      const contenedor = document.getElementById('area-juego-quien');
      if (!contenedor) return;

      const caso = DATOS.quienTieneRespuesta[this.casoIndex];
      const avataresPersonajes = {
        "Búho Tito": "🦉",
        "Mono Lalo": "🐵",
        "Ranita Pipa": "🐸"
      };

      contenedor.innerHTML = `
        <div class="juego-header">
          <div class="d-flex justify-between align-center flex-wrap gap-2">
            <div>
              <h3>👥 ¿Quién tiene la respuesta? (Desafío 1 Minuto)</h3>
              <p>Identifica rápidamente al personaje que tiene la respuesta correcta en 60 segundos.</p>
            </div>
            <button class="btn btn-sm btn-outline" onclick="Juegos.iniciar('quien')">🔄 Reiniciar (60s)</button>
          </div>
          <div class="juego-stats mt-2">
            <span>⏱️ Tiempo: <strong id="quien-tiempo" class="text-primario">${this.tiempoRestante}s</strong></span>
            <span>Aciertos: <strong id="quien-aciertos">${this.aciertos}</strong></span>
          </div>
          <div class="barra-tiempo-container">
            <div class="barra-tiempo-fill" id="quien-timer-bar" style="width: ${(this.tiempoRestante / 60) * 100}%"></div>
          </div>
        </div>

        <div class="pregunta-personajes-box">
          <span class="badge-pregunta">Pregunta en la pizarra:</span>
          <h2>${caso.pregunta}</h2>
        </div>
        <div class="grid-personajes">
          ${caso.personajes.map((pj, i) => `
            <div class="tarjeta-personaje anim-card" onclick="Juegos.quienElegir(${i})">
              <div class="pj-avatar-grande">${avataresPersonajes[pj.nombre] || '🐾'}</div>
              <h4>${pj.nombre}</h4>
              <div class="pj-cartel">
                <span class="pj-cartel-num">${pj.respuesta}</span>
              </div>
              <button class="btn btn-sm btn-primario mt-2">¡Elegir a ${pj.nombre.split(' ')[0]}!</button>
            </div>
          `).join('')}
        </div>
        <div id="feedback-quien" class="feedback-quien-zona"></div>
      `;
    },

    elegir(index) {
      if (!this.activo) return;
      const caso = DATOS.quienTieneRespuesta[this.casoIndex];
      const pj = caso.personajes[index];
      const zona = document.getElementById('feedback-quien');
      if (!zona) return;

      if (pj.correcta) {
        Sonidos.acierto();
        this.aciertos++;
        Progreso.agregarXP(15, `¡Acierto con ${pj.nombre}!`);

        zona.innerHTML = `
          <div class="alerta alerta-exito anim-pop">
            <h4>🎉 ¡CORRECTO!</h4>
            <p><strong>${pj.nombre} dice:</strong> "${pj.mensaje}"</p>
          </div>
        `;
        setTimeout(() => this.siguiente(), 800);
      } else {
        Sonidos.error();
        zona.innerHTML = `
          <div class="alerta alerta-error anim-shake">
            <h4>❌ Incorrecto</h4>
            <p><strong>${pj.nombre} dice:</strong> "${pj.mensaje}"</p>
          </div>
        `;
      }
    },

    siguiente() {
      if (!this.activo) return;
      this.casoIndex = (this.casoIndex + 1) % DATOS.quienTieneRespuesta.length;
      this.render();
    },

    terminar() {
      limpiarTimer();
      this.activo = false;
      Sonidos.fanfarria();

      const xpFinal = this.aciertos * 15;
      Progreso.agregarXP(xpFinal, `Personajes en 1 minuto`);
      App.lanzarConfeti();

      const contenedor = document.getElementById('area-juego-quien');
      if (!contenedor) return;

      contenedor.innerHTML = `
        <div class="juego-fin anim-pop">
          <h2>⏰ ¡Minuto Finalizado!</h2>
          <div class="resultado-stats-caja">
            <p>Acertaste con <strong>${this.aciertos}</strong> personajes en 60 segundos.</p>
            <p>Puntos ganados: <strong>+${xpFinal} XP 💎</strong></p>
          </div>
          <button class="btn btn-primario btn-lg mt-3" onclick="Juegos.iniciar('quien')">
            ⚡ Jugar Otra Ronda de 1 Minuto
          </button>
        </div>
      `;
    }
  };

  // ==========================================
  // 5. DESAFÍO CONTRA EL TIEMPO (1 MINUTO)
  // ==========================================
  const Tiempo = {
    tiempoRestante: 60,
    aciertos: 0,
    racha: 0,
    rachaMax: 0,
    preguntaActual: null,
    activo: false,

    iniciar() {
      limpiarTimer();
      this.tiempoRestante = 60;
      this.aciertos = 0;
      this.racha = 0;
      this.rachaMax = 0;
      this.activo = true;

      this.siguientePregunta();
      this.iniciarTimer();
    },

    iniciarTimer() {
      timerGeneral = setInterval(() => {
        if (!this.activo) return;
        this.tiempoRestante--;

        const elBar = document.getElementById('tiempo-progreso-bar');
        const elTxt = document.getElementById('tiempo-texto');
        if (elTxt) elTxt.textContent = `${this.tiempoRestante}s`;
        if (elBar) elBar.style.width = `${(this.tiempoRestante / 60) * 100}%`;

        if (this.tiempoRestante <= 5 && this.tiempoRestante > 0) {
          Sonidos.tick();
        }

        if (this.tiempoRestante <= 0) {
          this.terminar();
        }
      }, 1000);
    },

    siguientePregunta() {
      if (!this.activo) return;

      const t = rand(2, 10);
      const f = rand(2, 10);
      const res = t * f;

      const opciones = new Set([res]);
      while (opciones.size < 4) {
        const offset = (Math.random() < 0.5 ? -1 : 1) * rand(1, 4) * (Math.random() < 0.5 ? 1 : 2);
        const dist = Math.max(1, res + offset);
        if (dist !== res) opciones.add(dist);
      }

      this.preguntaActual = {
        op: `${t} × ${f}`,
        res: res,
        opciones: shuffle([...opciones])
      };

      this.renderPregunta();
    },

    renderPregunta() {
      const contenedor = document.getElementById('area-juego-tiempo');
      if (!contenedor) return;

      const p = this.preguntaActual;
      contenedor.innerHTML = `
        <div class="juego-header">
          <div class="d-flex justify-between align-center flex-wrap gap-2">
            <div>
              <h3>⏱️ Desafío Contra el Tiempo (1 Minuto)</h3>
              <p>¡Responde la mayor cantidad de multiplicaciones en 60 segundos!</p>
            </div>
            <button class="btn btn-sm btn-outline" onclick="Juegos.iniciar('tiempo')">🔄 Reiniciar (60s)</button>
          </div>
          <div class="juego-stats mt-2">
            <span>⏱️ Tiempo: <strong id="tiempo-texto" class="text-primario">${this.tiempoRestante}s</strong></span>
            <span>Aciertos: <strong id="tiempo-aciertos">${this.aciertos}</strong></span>
            <span>Racha Combo: <strong class="text-amarillo">🔥 x${Math.max(1, this.racha)}</strong></span>
          </div>
          <div class="barra-tiempo-container">
            <div class="barra-tiempo-fill" id="tiempo-progreso-bar" style="width: ${(this.tiempoRestante / 60) * 100}%"></div>
          </div>
        </div>
        <div class="tablero-tiempo-pregunta">
          <h1 class="tiempo-op-display">${p.op} = ?</h1>
          <div class="grid-opciones-tiempo">
            ${p.opciones.map(op => `
              <button class="btn-opcion-tiempo" onclick="Juegos.tiempoResponder(${op})">${op}</button>
            `).join('')}
          </div>
        </div>
      `;
    },

    responder(opcion) {
      if (!this.activo || !this.preguntaActual) return;

      if (opcion === this.preguntaActual.res) {
        Sonidos.acierto();
        this.aciertos++;
        this.racha++;
        if (this.racha > this.rachaMax) this.rachaMax = this.racha;
        Progreso.agregarXP(5 * Math.min(3, this.racha));
      } else {
        Sonidos.error();
        this.racha = 0;
      }

      this.siguientePregunta();
    },

    terminar() {
      limpiarTimer();
      this.activo = false;
      Sonidos.fanfarria();

      const xpFinal = this.aciertos * 10;
      Progreso.agregarXP(xpFinal, `Desafío contra el tiempo (${this.aciertos} aciertos)`);
      App.lanzarConfeti();

      const contenedor = document.getElementById('area-juego-tiempo');
      if (!contenedor) return;

      contenedor.innerHTML = `
        <div class="juego-fin anim-pop">
          <h2>⏰ ¡Tiempo Terminado (1 Minuto)!</h2>
          <div class="resultado-stats-caja">
            <p>Aciertos totales: <strong>${this.aciertos}</strong></p>
            <p>Mejor racha: <strong>🔥 x${this.rachaMax}</strong></p>
            <p>Puntos ganados: <strong>+${xpFinal} XP 💎</strong></p>
          </div>
          <button class="btn btn-primario btn-lg mt-3" onclick="Juegos.iniciar('tiempo')">
            ⚡ Jugar Otra Ronda de 1 Minuto
          </button>
        </div>
      `;
    }
  };

  // ==========================================
  // 6. ARRASTRA Y COMPLETA (1 MINUTO)
  // ==========================================
  const Arrastra = {
    ejercicios: [],
    fichas: [],
    seleccionada: null,
    tiempoRestante: 60,
    activo: false,

    iniciar() {
      limpiarTimer();
      this.seleccionada = null;
      this.ejercicios = [];
      this.tiempoRestante = 60;
      this.activo = true;

      const claves = new Set();
      while (this.ejercicios.length < 4) {
        const t = rand(3, 9);
        const f = rand(3, 9);
        const k = `${t}x${f}`;
        if (!claves.has(k)) {
          claves.add(k);
          this.ejercicios.push({
            id: `ej-${this.ejercicios.length}`,
            op: `${t} × ${f}`,
            res: t * f,
            colocada: null
          });
        }
      }

      this.fichas = shuffle(this.ejercicios.map((e, i) => ({
        id: `f-${i}`,
        valor: e.res,
        usada: false
      })));

      this.render();
      this.iniciarTimer();
    },

    iniciarTimer() {
      timerGeneral = setInterval(() => {
        if (!this.activo) return;
        this.tiempoRestante--;

        const elTxt = document.getElementById('arrastra-tiempo');
        const elBar = document.getElementById('arrastra-timer-bar');
        if (elTxt) elTxt.textContent = `${this.tiempoRestante}s`;
        if (elBar) elBar.style.width = `${(this.tiempoRestante / 60) * 100}%`;

        if (this.tiempoRestante <= 5 && this.tiempoRestante > 0) {
          Sonidos.tick();
        }

        if (this.tiempoRestante <= 0) {
          this.terminarPorTiempo();
        }
      }, 1000);
    },

    render() {
      const contenedor = document.getElementById('area-juego-arrastra');
      if (!contenedor) return;

      contenedor.innerHTML = `
        <div class="juego-header">
          <div class="d-flex justify-between align-center flex-wrap gap-2">
            <div>
              <h3>🧩 Arrastra y Completa (Desafío 1 Minuto)</h3>
              <p>Ubica las 4 fichas en sus operaciones antes de que termine el minuto (arrastra o toca la ficha y luego la casilla).</p>
            </div>
            <button class="btn btn-sm btn-outline" onclick="Juegos.iniciar('arrastra')">🔄 Reiniciar (60s)</button>
          </div>
          <div class="juego-stats mt-2">
            <span>⏱️ Tiempo: <strong id="arrastra-tiempo" class="text-primario">${this.tiempoRestante}s</strong></span>
          </div>
          <div class="barra-tiempo-container">
            <div class="barra-tiempo-fill" id="arrastra-timer-bar" style="width: ${(this.tiempoRestante / 60) * 100}%"></div>
          </div>
        </div>

        <div class="panel-arrastra">
          <div class="casillas-operaciones">
            ${this.ejercicios.map(ej => `
              <div class="fila-arrastra" data-ej-id="${ej.id}" ondragover="event.preventDefault()" ondrop="Juegos.arrastraDrop(event, '${ej.id}')" onclick="Juegos.arrastraClickCasilla('${ej.id}')">
                <span class="arrastra-op">${ej.op} = </span>
                <div class="casilla-vacia ${ej.colocada !== null ? 'con-ficha' : ''}">
                  ${ej.colocada !== null ? ej.colocada : '¿?'}
                </div>
              </div>
            `).join('')}
          </div>

          <div class="fichas-disponibles-box">
            <h4>Fichas de números:</h4>
            <div class="fichas-contenedor" id="fichas-contenedor">
              ${this.fichas.map(f => `
                <div class="ficha-numero ${f.usada ? 'usada' : ''} ${this.seleccionada === f.id ? 'seleccionada' : ''}"
                     id="${f.id}"
                     draggable="${!f.usada}"
                     ondragstart="Juegos.arrastraDragStart(event, '${f.id}')"
                     onclick="Juegos.arrastraClickFicha('${f.id}')">
                  ${f.valor}
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="text-center mt-4">
          <button class="btn btn-exito btn-lg" onclick="Juegos.arrastraComprobar()">
            ✅ Comprobar Resultados
          </button>
        </div>
      `;
    },

    clickFicha(id) {
      if (!this.activo) return;
      const f = this.fichas.find(x => x.id === id);
      if (!f || f.usada) return;
      Sonidos.clic();
      this.seleccionada = (this.seleccionada === id) ? null : id;
      this.render();
    },

    clickCasilla(ejId) {
      if (!this.activo || !this.seleccionada) return;
      const f = this.fichas.find(x => x.id === this.seleccionada);
      const ej = this.ejercicios.find(x => x.id === ejId);
      if (!f || !ej) return;

      this.colocarFichaEnCasilla(f, ej);
    },

    dragStart(e, id) {
      if (!this.activo) return;
      e.dataTransfer.setData('text/plain', id);
    },

    drop(e, ejId) {
      if (!this.activo) return;
      e.preventDefault();
      const fichaId = e.dataTransfer.getData('text/plain');
      const f = this.fichas.find(x => x.id === fichaId);
      const ej = this.ejercicios.find(x => x.id === ejId);
      if (f && ej) {
        this.colocarFichaEnCasilla(f, ej);
      }
    },

    colocarFichaEnCasilla(ficha, ej) {
      Sonidos.clic();
      if (ej.colocada !== null) {
        const viejaFicha = this.fichas.find(x => x.valor === ej.colocada && x.usada);
        if (viejaFicha) viejaFicha.usada = false;
      }
      ej.colocada = ficha.valor;
      ficha.usada = true;
      this.seleccionada = null;
      this.render();
    },

    comprobar() {
      if (!this.activo) return;
      const todasColocadas = this.ejercicios.every(e => e.colocada !== null);
      if (!todasColocadas) {
        Mensajes.alerta({
          titulo: 'Operaciones Incompletas',
          texto: 'Por favor coloca las 4 fichas numéricas en sus casillas antes de comprobar.',
          icono: '🧩',
          tipo: 'aviso',
          botonTexto: '¡Entendido!'
        });
        return;
      }

      let aciertos = 0;
      this.ejercicios.forEach(e => {
        if (e.colocada === e.res) aciertos++;
      });

      if (aciertos === 4) {
        limpiarTimer();
        this.activo = false;
        Sonidos.fanfarria();

        const bonus = this.tiempoRestante * 2;
        const totalXP = 50 + bonus;
        Progreso.agregarXP(totalXP, `Completado en 1 minuto (+${bonus} XP bonus)`);
        App.lanzarConfeti();

        const contenedor = document.getElementById('area-juego-arrastra');
        if (contenedor) {
          contenedor.innerHTML = `
            <div class="juego-fin anim-pop">
              <h2>🎉 ¡PERFECTO EN EL MINUTO!</h2>
              <div class="resultado-stats-caja">
                <p>Las 4 operaciones están correctas con <strong>${this.tiempoRestante}s</strong> restantes.</p>
                <p>Puntos ganados: <strong>+${totalXP} XP 💎</strong></p>
              </div>
              <button class="btn btn-primario btn-lg mt-3" onclick="Juegos.iniciar('arrastra')">
                ⚡ Jugar Otra Ronda de 1 Minuto
              </button>
            </div>
          `;
        }
      } else {
        Sonidos.error();
        Mensajes.alerta({
          titulo: 'Revisa tus fichas',
          texto: `Has acertado <strong>${aciertos} de 4</strong> operaciones.<br>¡Cambia las fichas que faltan antes de que termine el minuto!`,
          icono: '⚠️',
          tipo: 'aviso',
          botonTexto: '¡Seguir Intentando! ➜'
        });
      }
    },

    terminarPorTiempo() {
      limpiarTimer();
      this.activo = false;
      Sonidos.error();

      let aciertos = 0;
      this.ejercicios.forEach(e => {
        if (e.colocada === e.res) aciertos++;
      });

      const contenedor = document.getElementById('area-juego-arrastra');
      if (!contenedor) return;

      contenedor.innerHTML = `
        <div class="juego-fin anim-pop">
          <h2>⏰ ¡Se Terminó el Minuto!</h2>
          <div class="resultado-stats-caja">
            <p>Lograste colocar <strong>${aciertos}</strong> de 4 operaciones correctas.</p>
          </div>
          <button class="btn btn-primario btn-lg mt-3" onclick="Juegos.iniciar('arrastra')">
            ⚡ Reintentar Desafío de 1 Minuto
          </button>
        </div>
      `;
    }
  };

  // ==========================================
  // 7. DETECTIVE MATEMÁTICO (1 MINUTO)
  // ==========================================
  const Detective = {
    enigmaIndex: 0,
    codigoIngresado: "",
    tiempoRestante: 60,
    activo: false,

    iniciar() {
      limpiarTimer();
      this.enigmaIndex = rand(0, DATOS.detectiveEnigmas.length - 1);
      this.codigoIngresado = "";
      this.tiempoRestante = 60;
      this.activo = true;

      this.render();
      this.iniciarTimer();
    },

    iniciarTimer() {
      timerGeneral = setInterval(() => {
        if (!this.activo) return;
        this.tiempoRestante--;

        const elTxt = document.getElementById('detective-tiempo');
        const elBar = document.getElementById('detective-timer-bar');
        if (elTxt) elTxt.textContent = `${this.tiempoRestante}s`;
        if (elBar) elBar.style.width = `${(this.tiempoRestante / 60) * 100}%`;

        if (this.tiempoRestante <= 5 && this.tiempoRestante > 0) {
          Sonidos.tick();
        }

        if (this.tiempoRestante <= 0) {
          this.terminarPorTiempo();
        }
      }, 1000);
    },

    render() {
      const contenedor = document.getElementById('area-juego-detective');
      if (!contenedor) return;

      const enigma = DATOS.detectiveEnigmas[this.enigmaIndex];
      contenedor.innerHTML = `
        <div class="juego-header">
          <div class="d-flex justify-between align-center flex-wrap gap-2">
            <div>
              <h3>🕵️ Detective Matemático (Desafío 1 Minuto)</h3>
              <p>¡La caja fuerte se bloqueará en 60 segundos! Descifra la clave antes de que suene la alarma.</p>
            </div>
            <button class="btn btn-sm btn-outline" onclick="Juegos.iniciar('detective')">🔄 Reiniciar (60s)</button>
          </div>
          <div class="juego-stats mt-2">
            <span>⏱️ Tiempo restante: <strong id="detective-tiempo" class="text-primario">${this.tiempoRestante}s</strong></span>
          </div>
          <div class="barra-tiempo-container">
            <div class="barra-tiempo-fill" id="detective-timer-bar" style="width: ${(this.tiempoRestante / 60) * 100}%"></div>
          </div>
        </div>

        <div class="tablero-detective">
          <div class="cuaderno-pistas">
            <h4>📋 ${enigma.titulo}</h4>
            <div class="lista-pistas">
              ${enigma.pistas.map(p => `
                <div class="item-pista anim-slide">
                  <p>${p}</p>
                </div>
              `).join('')}
            </div>
            <div class="pista-ayuda">
              <small>💡 Analiza los múltiplos y realiza sumas con sus cifras.</small>
            </div>
          </div>

          <div class="caja-fuerte-box">
            <div class="caja-fuerte-pantalla" id="pantalla-caja">
              ${this.codigoIngresado || "___"}
            </div>
            <div class="teclado-caja-fuerte">
              ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(n => `
                <button class="btn-tecla-num" onclick="Juegos.detectiveTecla(${n})">${n}</button>
              `).join('')}
              <button class="btn-tecla-num btn-tecla-borrar" onclick="Juegos.detectiveBorrar()">⌫</button>
            </div>
            <button class="btn btn-dorado btn-block mt-3" onclick="Juegos.detectiveAbrir()">
              🔓 ¡Abrir Caja Fuerte!
            </button>
          </div>
        </div>
        <div id="feedback-detective" class="mt-3"></div>
      `;
    },

    tecla(num) {
      if (!this.activo) return;
      if (this.codigoIngresado.length < 3) {
        Sonidos.clic();
        this.codigoIngresado += num;
        const pantalla = document.getElementById('pantalla-caja');
        if (pantalla) pantalla.textContent = this.codigoIngresado;
      }
    },

    borrar() {
      if (!this.activo) return;
      Sonidos.clic();
      this.codigoIngresado = this.codigoIngresado.slice(0, -1);
      const pantalla = document.getElementById('pantalla-caja');
      if (pantalla) pantalla.textContent = this.codigoIngresado || "___";
    },

    abrir() {
      if (!this.activo) return;
      const enigma = DATOS.detectiveEnigmas[this.enigmaIndex];
      const val = parseInt(this.codigoIngresado, 10);
      const fb = document.getElementById('feedback-detective');
      if (!fb) return;

      if (val === enigma.respuesta) {
        limpiarTimer();
        this.activo = false;
        Sonidos.fanfarria();

        const bonus = this.tiempoRestante * 2;
        const totalXP = 50 + bonus;
        Progreso.agregarXP(totalXP, `Caja fuerte abierta en 1 minuto (+${bonus} XP rapidez)`);
        Progreso.desbloquearLogro("detective_oro");
        App.lanzarConfeti();

        fb.innerHTML = `
          <div class="alerta alerta-exito anim-pop">
            <h4>🏆 ¡CAJA FUERTE ABIERTA A TIEMPO!</h4>
            <p><strong>Explicación del Detective:</strong> ${enigma.explicacion}</p>
            <p class="mt-1">¡Abriste la caja fuerte con ${this.tiempoRestante}s de sobra y ganaste +${totalXP} XP!</p>
            <button class="btn btn-primario mt-2" onclick="Juegos.iniciar('detective')">Nuevo Enigma (1 Minuto) ➜</button>
          </div>
        `;
      } else {
        Sonidos.error();
        fb.innerHTML = `
          <div class="alerta alerta-error anim-shake">
            <h4>🔒 Clave Incorrecta (${this.codigoIngresado || 'vacío'})</h4>
            <p>¡Cuidado! El tiempo sigue corriendo. Revisa las pistas y prueba de nuevo.</p>
          </div>
        `;
      }
    },

    terminarPorTiempo() {
      limpiarTimer();
      this.activo = false;
      Sonidos.error();

      const enigma = DATOS.detectiveEnigmas[this.enigmaIndex];
      const contenedor = document.getElementById('area-juego-detective');
      if (!contenedor) return;

      contenedor.innerHTML = `
        <div class="juego-fin anim-pop">
          <h2>🚨 ¡Alarma Bloqueada! (1 Minuto Terminado)</h2>
          <div class="resultado-stats-caja">
            <p>El código secreto era: <strong>${enigma.respuesta}</strong></p>
            <p>${enigma.explicacion}</p>
          </div>
          <button class="btn btn-primario btn-lg mt-3" onclick="Juegos.iniciar('detective')">
            ⚡ Reintentar con Nuevo Enigma (60s)
          </button>
        </div>
      `;
    }
  };

  // ==========================================
  // 8. MISIÓN O NIVEL (1 MINUTO)
  // ==========================================
  const Mision = {
    misiones: [
      { id: 1, titulo: "Bosque de los Números", tablas: [2, 3, 4], desc: "Desafío combinado con las tablas del 2, 3 y 4", icono: "🌲" },
      { id: 2, titulo: "Valle de los Cristales", tablas: [5, 6, 7], desc: "Desafío intermedio con las tablas del 5, 6 y 7", icono: "💎" },
      { id: 3, titulo: "Cima de los Campeones", tablas: [8, 9, 10], desc: "Desafío avanzado con las tablas del 8, 9 y 10", icono: "⛰️" },
      { id: 4, titulo: "Torneo del Rey Matemático", tablas: [2, 3, 4, 5, 6, 7, 8, 9, 10], desc: "La prueba final con todas las tablas combinadas", icono: "👑" }
    ],
    misionActiva: null,
    pasoActual: 0,
    vidas: 3,
    preguntaActual: null,
    tiempoRestante: 60,
    activo: false,

    iniciar() {
      limpiarTimer();
      this.misionActiva = null;
      this.activo = false;
      this.renderSelector();
    },

    renderSelector() {
      const contenedor = document.getElementById('area-juego-mision');
      if (!contenedor) return;

      contenedor.innerHTML = `
        <div class="juego-header">
          <h3>🗺️ Misiones y Niveles (Desafíos de 1 Minuto)</h3>
          <p>Supera los 5 desafíos de cada aventura antes de que terminen los 60 segundos:</p>
        </div>
        <div class="grid-misiones">
          ${this.misiones.map(m => `
            <div class="tarjeta-mision anim-card" onclick="Juegos.misionComenzar(${m.id})">
              <div class="mision-icono">${m.icono}</div>
              <h4>Nivel ${m.id}: ${m.titulo}</h4>
              <p>${m.desc}</p>
              <div class="mision-tablas-badge">
                Tablas: ${m.tablas.join(', ')}
              </div>
              <button class="btn btn-primario btn-sm mt-3">Comenzar Misión (60s)</button>
            </div>
          `).join('')}
        </div>
      `;
    },

    comenzar(id) {
      limpiarTimer();
      this.misionActiva = this.misiones.find(m => m.id === id);
      this.pasoActual = 1;
      this.vidas = 3;
      this.tiempoRestante = 60;
      this.activo = true;

      this.siguientePregunta();
      this.iniciarTimer();
    },

    iniciarTimer() {
      timerGeneral = setInterval(() => {
        if (!this.activo) return;
        this.tiempoRestante--;

        const elTxt = document.getElementById('mision-tiempo');
        const elBar = document.getElementById('mision-timer-bar');
        if (elTxt) elTxt.textContent = `${this.tiempoRestante}s`;
        if (elBar) elBar.style.width = `${(this.tiempoRestante / 60) * 100}%`;

        if (this.tiempoRestante <= 5 && this.tiempoRestante > 0) {
          Sonidos.tick();
        }

        if (this.tiempoRestante <= 0) {
          this.terminarPorTiempo();
        }
      }, 1000);
    },

    siguientePregunta() {
      if (!this.activo) return;

      if (this.pasoActual > 5) {
        limpiarTimer();
        this.activo = false;
        Sonidos.fanfarria();

        const bonus = this.tiempoRestante * 2;
        const totalXP = 80 + bonus;
        Progreso.agregarXP(totalXP, `Misión "${this.misionActiva.titulo}" superada en 1 minuto`);
        App.lanzarConfeti();
        this.renderFin(true, totalXP);
        return;
      }

      const m = this.misionActiva;
      const t = m.tablas[rand(0, m.tablas.length - 1)];
      const f = rand(2, 9);
      const res = t * f;

      const ops = new Set([res]);
      while (ops.size < 4) {
        ops.add(Math.max(2, res + (rand(-3, 3) * 2)));
      }

      this.preguntaActual = {
        tabla: t,
        factor: f,
        correcta: res,
        opciones: shuffle([...ops])
      };

      this.renderPaso();
    },

    renderPaso() {
      const contenedor = document.getElementById('area-juego-mision');
      if (!contenedor) return;

      const p = this.preguntaActual;
      const m = this.misionActiva;

      contenedor.innerHTML = `
        <div class="juego-header">
          <div class="d-flex justify-between align-center flex-wrap gap-2">
            <div>
              <h3>${m.icono} ${m.titulo} (Desafío 1 Minuto)</h3>
            </div>
            <button class="btn btn-sm btn-outline" onclick="Juegos.iniciar('mision')">✕ Salir a Misiones</button>
          </div>
          <div class="juego-stats mt-2">
            <span>⏱️ Tiempo: <strong id="mision-tiempo" class="text-primario">${this.tiempoRestante}s</strong></span>
            <span>Desafío: <strong>${this.pasoActual}</strong> / 5</span>
            <span>Vidas: ${'❤️'.repeat(this.vidas)}</span>
          </div>
          <div class="barra-tiempo-container">
            <div class="barra-tiempo-fill" id="mision-timer-bar" style="width: ${(this.tiempoRestante / 60) * 100}%"></div>
          </div>
        </div>
        <div class="mision-pregunta-caja anim-pop">
          <h2>¿Cuánto es ${p.tabla} × ${p.factor}?</h2>
          <div class="grid-mision-opciones">
            ${p.opciones.map(op => `
              <button class="btn-mision-opcion" onclick="Juegos.misionResponder(${op})">${op}</button>
            `).join('')}
          </div>
        </div>
      `;
    },

    responder(op) {
      if (!this.activo) return;

      if (op === this.preguntaActual.correcta) {
        Sonidos.acierto();
        this.pasoActual++;
        this.siguientePregunta();
      } else {
        Sonidos.error();
        this.vidas--;
        if (this.vidas <= 0) {
          limpiarTimer();
          this.activo = false;
          this.renderFin(false);
        } else {
          Mensajes.alerta({
            titulo: '¡Cuidado con las vidas!',
            texto: `La respuesta correcta era <strong>${this.preguntaActual.correcta}</strong>.<br>Te quedan <strong>${this.vidas} vidas</strong> ❤️ y <strong>${this.tiempoRestante} segundos</strong>.`,
            icono: '⚠️',
            tipo: 'error',
            botonTexto: '¡Continuar Misión! ➜',
            alCerrar: () => {
              this.pasoActual++;
              this.siguientePregunta();
            }
          });
        }
      }
    },

    renderFin(exito, xp = 0) {
      const contenedor = document.getElementById('area-juego-mision');
      if (!contenedor) return;

      contenedor.innerHTML = `
        <div class="juego-fin anim-pop">
          <h2>${exito ? '🏆 ¡MISIÓN COMPLETADA EN EL MINUTO!' : '💔 Misión Fallida'}</h2>
          <div class="resultado-stats-caja">
            <p>${exito ? `¡Conquistaste "${this.misionActiva.titulo}" con ${this.tiempoRestante}s de sobra!` : 'Te quedaste sin vidas durante el minuto.'}</p>
            ${exito ? `<p>Recompensa: <strong>+${xp} XP 💎</strong></p>` : ''}
          </div>
          <button class="btn btn-primario mt-3" onclick="Juegos.iniciar('mision')">Volver a Misiones</button>
        </div>
      `;
    },

    terminarPorTiempo() {
      limpiarTimer();
      this.activo = false;
      Sonidos.error();

      const contenedor = document.getElementById('area-juego-mision');
      if (!contenedor) return;

      contenedor.innerHTML = `
        <div class="juego-fin anim-pop">
          <h2>⏰ ¡Tiempo Agotado en la Misión!</h2>
          <div class="resultado-stats-caja">
            <p>Se acabó el minuto. Lograste superar ${this.pasoActual - 1} de 5 desafíos.</p>
          </div>
          <button class="btn btn-primario mt-3" onclick="Juegos.iniciar('mision')">Reintentar Misión (60s)</button>
        </div>
      `;
    }
  };

  return {
    iniciar(tipo, param = null) {
      limpiarTimer();
      juegoActivo = tipo;

      // Ocultar todas las sub-áreas de juego y mostrar solo la seleccionada
      document.querySelectorAll('.sub-area-juego').forEach(el => el.classList.remove('activo'));
      const target = document.getElementById(`area-juego-${tipo}`);
      if (target) {
        target.classList.add('activo');
        window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
      }

      switch (tipo) {
        case 'memoria': Memoria.iniciar(param); break;
        case 'atrapa': Atrapa.iniciar(); break;
        case 'construye': Constructor.iniciar(); break;
        case 'quien': QuienTiene.iniciar(); break;
        case 'tiempo': Tiempo.iniciar(); break;
        case 'arrastra': Arrastra.iniciar(); break;
        case 'detective': Detective.iniciar(); break;
        case 'mision': Mision.iniciar(); break;
      }
    },

    // Delegaciones de eventos a objetos
    memoriaClick: (id) => Memoria.clickCarta(id),
    atrapaResponder: (op) => Atrapa.responder(op),
    construyeCambiar: (t, d) => Constructor.cambiar(t, d),
    construyeComprobar: () => Constructor.comprobar(),
    quienElegir: (i) => QuienTiene.elegir(i),
    quienSiguiente: () => QuienTiene.siguiente(),
    tiempoResponder: (op) => Tiempo.responder(op),
    arrastraClickFicha: (id) => Arrastra.clickFicha(id),
    arrastraClickCasilla: (id) => Arrastra.clickCasilla(id),
    arrastraDragStart: (e, id) => Arrastra.dragStart(e, id),
    arrastraDrop: (e, id) => Arrastra.drop(e, id),
    arrastraComprobar: () => Arrastra.comprobar(),
    detectiveTecla: (n) => Detective.tecla(n),
    detectiveBorrar: () => Detective.borrar(),
    detectiveAbrir: () => Detective.abrir(),
    misionComenzar: (id) => Mision.comenzar(id),
    misionResponder: (op) => Mision.responder(op)
  };
})();
