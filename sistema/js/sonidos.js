/**
 * PLATAFORMA EDUCATIVA "MIS TABLAS"
 * Motor de Audio Web (Web Audio API)
 * Genera efectos de sonido lúdicos sin depender de archivos de audio externos.
 */

const Sonidos = (() => {
  let audioCtx = null;
  let muted = localStorage.getItem('misTablas_mute') === 'true';

  function initAudio() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Reproducir un tono simple o arpegio
  function playTone(freq, type = 'sine', duration = 0.2, gainValue = 0.2, delay = 0) {
    if (muted) return;
    try {
      initAudio();
      if (!audioCtx) return;

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      const startTime = audioCtx.currentTime + delay;
      osc.type = type;
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(gainValue, startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);
    } catch (e) {
      console.warn("Audio no disponible", e);
    }
  }

  return {
    isMuted() {
      return muted;
    },
    toggleMute() {
      muted = !muted;
      localStorage.setItem('misTablas_mute', muted);
      return muted;
    },
    clic() {
      playTone(480, 'triangle', 0.08, 0.15);
    },
    acierto() {
      // Campanita alegre (Do - Mi - Sol)
      playTone(523.25, 'sine', 0.18, 0.2, 0);       // C5
      playTone(659.25, 'sine', 0.18, 0.2, 0.1);     // E5
      playTone(783.99, 'triangle', 0.35, 0.25, 0.2); // G5
    },
    error() {
      // Boing suave y amable (sin asustar al niño)
      playTone(280, 'sawtooth', 0.15, 0.12, 0);
      playTone(220, 'sawtooth', 0.25, 0.12, 0.12);
    },
    estrella() {
      // Arpegio ascendente brillante
      const notas = [523.25, 659.25, 783.99, 1046.50];
      notas.forEach((nota, i) => {
        playTone(nota, 'triangle', 0.25, 0.2, i * 0.08);
      });
    },
    fanfarria() {
      // Fanfarria triunfal para logros o fin de ensayo
      const notas = [
        { f: 523.25, d: 0.15, t: 0 },
        { f: 523.25, d: 0.15, t: 0.15 },
        { f: 523.25, d: 0.15, t: 0.30 },
        { f: 659.25, d: 0.45, t: 0.45 },
        { f: 587.33, d: 0.15, t: 0.85 },
        { f: 659.25, d: 0.15, t: 1.00 },
        { f: 783.99, d: 0.60, t: 1.15 }
      ];
      notas.forEach(n => {
        playTone(n.f, 'triangle', n.d, 0.25, n.t);
      });
    },
    tick() {
      playTone(800, 'sine', 0.04, 0.08);
    },
    burbuja() {
      playTone(400, 'sine', 0.05, 0.2);
      playTone(700, 'sine', 0.1, 0.2, 0.04);
    }
  };
})();
