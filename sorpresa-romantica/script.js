const experience = document.getElementById("experience");
const startExperienceButton = document.getElementById("startExperience");
const musicToggleButton = document.getElementById("musicToggle");
const loadSongButton = document.getElementById("loadSong");
const songUploadInput = document.getElementById("songUpload");
const uploadedSong = document.getElementById("uploadedSong");
const envelope = document.getElementById("envelope");
const typedLetter = document.getElementById("typedLetter");
const finalTypewriter = document.getElementById("finalTypewriter");
const launchStarsButton = document.getElementById("launchStars");
const memoryTrack = document.getElementById("memoryTrack");
const memoryDisplay = document.getElementById("memoryDisplay");
const wishOutput = document.getElementById("wishOutput");
const wishButtons = document.querySelectorAll(".wish-button");
const closeOverlayButton = document.getElementById("closeOverlay");
const momentOverlay = document.getElementById("momentOverlay");
const overlayEyebrow = document.getElementById("overlayEyebrow");
const overlayTitle = document.getElementById("overlayTitle");
const overlayText = document.getElementById("overlayText");
const floatingHearts = document.getElementById("floatingHearts");
const finalBurstButton = document.getElementById("finalBurst");
const cursorGlow = document.querySelector(".cursor-glow");
const sky = document.getElementById("sky");
const skyContext = sky.getContext("2d");

const memoryData = [
  {
    number: "01",
    title: "Tu mirada",
    text: "Tiene esa mezcla de ternura y fuerza capaz de detener el tiempo por un segundo y volverlo inolvidable.",
  },
  {
    number: "02",
    title: "Tu voz",
    text: "Hay voces que se escuchan y ya. La tuya, en cambio, se queda. Acompaña, calma y enciende algo bonito por dentro.",
  },
  {
    number: "03",
    title: "Tu energía",
    text: "Llegas y todo cambia de color. Como si la rutina recordara que todavía sabe bailar.",
  },
  {
    number: "04",
    title: "Tu manera de querer",
    text: "Hay personas que solo están. Tú abrazas, inspiras y haces sentir hogar incluso en un instante pequeño.",
  },
];

const wishMoments = {
  aurora: {
    eyebrow: "Abrazo infinito",
    title: "Si pudiera aparecer frente a ti ahora mismo...",
    text: "te abrazaría con esa fuerza tranquila que dice sin palabras: aquí estoy, contigo, de verdad.",
    output: "El momento cambió a una aurora suave: calma, cercanía y ganas de no soltarte.",
    particles: ["#88f0dc", "#8fc4ff", "#ffd374"],
  },
  sunset: {
    eyebrow: "Ritmo compartido",
    title: "Si todo se volviera música por un momento...",
    text: "te invitaría a bailar sin prisa, como si el resto del mundo se hubiera quedado muy lejos.",
    output: "Ahora todo late como un atardecer encendido: calor, complicidad y movimiento.",
    particles: ["#ffb36b", "#ff7d7d", "#ffe08c"],
  },
  starlight: {
    eyebrow: "Destello total",
    title: "Y si el tiempo se atreviera a quedarse quieto...",
    text: "te besaría en ese segundo exacto en el que la noche se llena de luces y todo parece posible.",
    output: "La escena se volvió cielo nocturno: brillo, deseo y un final que se siente enorme.",
    particles: ["#8fb9ff", "#cfdcff", "#ffbfd1"],
  },
};

const noteFrequencies = {
  G3: 196.0,
  A3: 220.0,
  B3: 246.94,
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  F3: 174.61,
  G4: 392.0,
  A4: 440.0,
  B4: 493.88,
  C5: 523.25,
  D5: 587.33,
  E5: 659.25,
  G5: 783.99,
};

const melodyPattern = [
  { note: "A4", beats: 1 },
  { note: "C5", beats: 1 },
  { note: "E5", beats: 2 },
  { note: "D5", beats: 1 },
  { note: "C5", beats: 1 },
  { note: "A4", beats: 2 },
  { note: "G4", beats: 1 },
  { note: "A4", beats: 1 },
  { note: "C5", beats: 2 },
  { note: "E5", beats: 1 },
  { note: "D5", beats: 1 },
  { note: "C5", beats: 2 },
  { note: "A4", beats: 1 },
  { note: "G4", beats: 1 },
  { note: "E4", beats: 2 },
  { note: "A4", beats: 2 },
];

const chordPattern = [
  ["A3", "E4", "A4"],
  ["F3", "C4", "A4"],
  ["C4", "G4", "E5"],
  ["G3", "D4", "B4"],
];

const state = {
  started: false,
  letterRevealed: false,
  finalTyped: false,
  activeTheme: "default",
  musicEnabled: false,
  activeAudioSource: "synth",
  uploadedSongUrl: null,
  audioContext: null,
  masterGain: null,
  delayNode: null,
  delayFeedback: null,
  delayWet: null,
  synthTimer: null,
  synthIndex: 0,
  beatDuration: 0.78,
  stars: [],
  pointer: {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    active: false,
  },
  extraTwinkleUntil: 0,
};

const letterMessage =
  "A veces una persona no solo llega a tu vida... la transforma. Gracias por existir con esa luz tan tuya, por ser tan hermosa por dentro y por fuera, y por hacer que hasta los instantes pequeños se sientan enormes.";

const finalMessage =
  "Si pudiera resumirte en una sensación, diría esto: contigo el mundo se siente más bonito, más valiente y mucho más vivo. Esta sorpresa termina aquí, pero lo que provocas en mí sigue brillando.";

function init() {
  setupRevealObserver();
  setupPointerEffects();
  setupSky();
  setupHearts();
  setupMemoryCards();
  setupEnvelope();
  setupWishes();
  setupOverlay();
  setupAudioControls();
  setupExperienceStart();
}

function setupExperienceStart() {
  startExperienceButton.addEventListener("click", async () => {
    if (!state.started) {
      state.started = true;
      experience.classList.remove("hidden");
      document.querySelectorAll(".panel").forEach((panel, index) => {
        window.setTimeout(() => panel.classList.add("visible"), 120 * index);
      });
    }

    await playActiveAudio(true);
    experience.scrollIntoView({ behavior: "smooth", block: "start" });
    rainHearts(16);
    createBurst(window.innerWidth * 0.5, window.innerHeight * 0.34, {
      count: 28,
      heartMode: true,
    });
  });
}

function setupRevealObserver() {
  const revealElements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("visible");

        if (
          entry.target.id === "finale" &&
          !state.finalTyped &&
          finalTypewriter.textContent.trim() === ""
        ) {
          state.finalTyped = true;
          typeText(finalTypewriter, finalMessage, 28);
        }
      });
    },
    {
      threshold: 0.24,
    }
  );

  revealElements.forEach((element) => observer.observe(element));
}

function setupPointerEffects() {
  const setGlowPosition = (x, y) => {
    cursorGlow.style.transform = `translate(${x - 112}px, ${y - 112}px)`;
    state.pointer.x = x;
    state.pointer.y = y;
  };

  window.addEventListener("pointermove", (event) => {
    state.pointer.active = true;
    setGlowPosition(event.clientX, event.clientY);
  });

  window.addEventListener("pointerdown", (event) => {
    setGlowPosition(event.clientX, event.clientY);
    createBurst(event.clientX, event.clientY, {
      count: 10,
      palette: ["#f5b55e", "#7be2f5", "#ff6f8f"],
    });
  });

  window.addEventListener("pointerleave", () => {
    state.pointer.active = false;
  });
}

function setupSky() {
  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    sky.width = Math.floor(window.innerWidth * dpr);
    sky.height = Math.floor(window.innerHeight * dpr);
    sky.style.width = `${window.innerWidth}px`;
    sky.style.height = `${window.innerHeight}px`;
    skyContext.setTransform(dpr, 0, 0, dpr, 0, 0);
    createStars();
  };

  const animate = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const now = performance.now();

    skyContext.clearRect(0, 0, width, height);

    state.stars.forEach((star, index) => {
      star.phase += star.speed;
      const flicker = 0.55 + Math.sin(star.phase) * 0.35;
      const boost = now < state.extraTwinkleUntil ? 0.55 : 0;
      const radius = star.radius + flicker * 0.9 + boost;

      skyContext.beginPath();
      skyContext.arc(star.x, star.y, radius, 0, Math.PI * 2);
      skyContext.fillStyle = `rgba(255, 245, 225, ${0.25 + flicker * 0.45})`;
      skyContext.fill();

      const dx = star.x - state.pointer.x;
      const dy = star.y - state.pointer.y;
      const distance = Math.hypot(dx, dy);

      if (distance < 150 && state.pointer.active) {
        const nextStar = state.stars[(index + 1) % state.stars.length];
        skyContext.beginPath();
        skyContext.moveTo(star.x, star.y);
        skyContext.lineTo(nextStar.x, nextStar.y);
        skyContext.strokeStyle = `rgba(123, 226, 245, ${0.18 - distance / 900})`;
        skyContext.lineWidth = 1;
        skyContext.stroke();
      }
    });

    window.requestAnimationFrame(animate);
  };

  launchStarsButton.addEventListener("click", () => {
    state.extraTwinkleUntil = performance.now() + 2400;
    for (let index = 0; index < 6; index += 1) {
      window.setTimeout(() => {
        createBurst(Math.random() * window.innerWidth, Math.random() * window.innerHeight * 0.72, {
          count: 16,
          palette: ["#f5b55e", "#7be2f5", "#ffefc5"],
        });
      }, index * 120);
    }
  });

  window.addEventListener("resize", resize);
  resize();
  window.requestAnimationFrame(animate);
}

function createStars() {
  const count = Math.max(80, Math.floor(window.innerWidth / 14));
  state.stars = Array.from({ length: count }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    radius: Math.random() * 1.8 + 0.4,
    speed: Math.random() * 0.03 + 0.01,
    phase: Math.random() * Math.PI * 2,
  }));
}

function setupHearts() {
  window.setInterval(() => {
    createHeart();
  }, 850);
}

function createHeart() {
  const heart = document.createElement("span");
  const size = 10 + Math.random() * 16;
  const left = Math.random() * window.innerWidth;
  const drift = -60 + Math.random() * 120;
  const duration = 7 + Math.random() * 5;

  heart.className = "heart";
  heart.style.setProperty("--size", `${size}px`);
  heart.style.setProperty("--duration", `${duration}s`);
  heart.style.setProperty("--drift", `${drift}px`);
  heart.style.left = `${left}px`;
  heart.style.bottom = "-30px";
  heart.style.opacity = "0";

  floatingHearts.appendChild(heart);

  window.setTimeout(() => {
    heart.remove();
  }, duration * 1000);
}

function rainHearts(amount) {
  for (let index = 0; index < amount; index += 1) {
    window.setTimeout(createHeart, index * 90);
  }
}

function setupMemoryCards() {
  memoryTrack.addEventListener("click", (event) => {
    const button = event.target.closest(".memory-card");
    if (!button) {
      return;
    }

    const nextIndex = Number(button.dataset.memory);
    const item = memoryData[nextIndex];

    memoryTrack
      .querySelectorAll(".memory-card")
      .forEach((card) => card.classList.remove("active"));
    button.classList.add("active");

    memoryDisplay.animate(
      [
        { opacity: 1, transform: "translateY(0)" },
        { opacity: 0.3, transform: "translateY(10px)" },
      ],
      { duration: 160, fill: "forwards" }
    ).onfinish = () => {
      memoryDisplay.innerHTML = `
        <p class="memory-number">${item.number}</p>
        <h3>${item.title}</h3>
        <p>${item.text}</p>
      `;

      memoryDisplay.animate(
        [
          { opacity: 0.3, transform: "translateY(10px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        { duration: 240, fill: "forwards" }
      );
    };
  });
}

function setupEnvelope() {
  envelope.addEventListener("click", () => {
    if (state.letterRevealed) {
      createBurst(window.innerWidth * 0.5, window.innerHeight * 0.48, {
        count: 12,
        heartMode: true,
      });
      return;
    }

    state.letterRevealed = true;
    envelope.classList.add("is-open");
    envelope.setAttribute("aria-expanded", "true");
    typeText(typedLetter, letterMessage, 32);
    rainHearts(10);
  });
}

function setupWishes() {
  wishButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const theme = button.dataset.theme;
      const moment = wishMoments[theme];

      document.body.dataset.theme = theme;
      state.activeTheme = theme;
      wishOutput.textContent = moment.output;
      overlayEyebrow.textContent = moment.eyebrow;
      overlayTitle.textContent = moment.title;
      overlayText.textContent = moment.text;
      momentOverlay.classList.add("is-open");
      momentOverlay.setAttribute("aria-hidden", "false");

      const rect = button.getBoundingClientRect();
      createBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, {
        count: 18,
        palette: moment.particles,
      });
      createBurst(window.innerWidth * 0.5, window.innerHeight * 0.5, {
        count: 24,
        palette: moment.particles,
        heartMode: true,
      });
    });
  });
}

function setupOverlay() {
  closeOverlayButton.addEventListener("click", () => {
    momentOverlay.classList.remove("is-open");
    momentOverlay.setAttribute("aria-hidden", "true");
  });

  momentOverlay.addEventListener("click", (event) => {
    if (event.target === momentOverlay) {
      momentOverlay.classList.remove("is-open");
      momentOverlay.setAttribute("aria-hidden", "true");
    }
  });
}

function setupAudioControls() {
  musicToggleButton.addEventListener("click", async () => {
    if (state.musicEnabled) {
      pauseActiveAudio();
      return;
    }

    await playActiveAudio(true);
  });

  loadSongButton.addEventListener("click", () => {
    songUploadInput.click();
  });

  songUploadInput.addEventListener("change", async (event) => {
    const [file] = event.target.files;

    if (!file) {
      return;
    }

    if (state.uploadedSongUrl) {
      URL.revokeObjectURL(state.uploadedSongUrl);
    }

    state.uploadedSongUrl = URL.createObjectURL(file);
    uploadedSong.src = state.uploadedSongUrl;
    state.activeAudioSource = "uploaded";
    loadSongButton.textContent = "Cambiar canción";

    if (state.musicEnabled) {
      pauseSynth();
      await safePlayUploadedSong();
    } else {
      updateMusicLabel();
    }
  });
}

async function playActiveAudio(triggeredByUser = false) {
  if (state.activeAudioSource === "uploaded" && uploadedSong.src) {
    pauseSynth();
    state.musicEnabled = true;
    updateMusicLabel();
    await safePlayUploadedSong();
    return;
  }

  if (triggeredByUser) {
    await ensureAudioContext();
  }

  state.activeAudioSource = "synth";
  state.musicEnabled = true;
  startSynth();
  updateMusicLabel();
}

function pauseActiveAudio() {
  state.musicEnabled = false;

  if (state.activeAudioSource === "uploaded" && uploadedSong.src) {
    uploadedSong.pause();
  }

  pauseSynth();
  updateMusicLabel();
}

function updateMusicLabel() {
  if (state.musicEnabled) {
    musicToggleButton.textContent = "Pausar música";
    musicToggleButton.setAttribute("aria-pressed", "true");
    return;
  }

  musicToggleButton.setAttribute("aria-pressed", "false");
  musicToggleButton.textContent =
    state.activeAudioSource === "uploaded" && uploadedSong.src
      ? "Reproducir nuestra canción"
      : "Activar música";
}

async function ensureAudioContext() {
  if (!state.audioContext) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;

    if (!AudioContextClass) {
      return;
    }

    const audioContext = new AudioContextClass();
    const masterGain = audioContext.createGain();
    const delayNode = audioContext.createDelay();
    const delayFeedback = audioContext.createGain();
    const delayWet = audioContext.createGain();

    delayNode.delayTime.value = 0.32;
    delayFeedback.gain.value = 0.28;
    delayWet.gain.value = 0.18;
    masterGain.gain.value = 0.0001;

    masterGain.connect(audioContext.destination);
    masterGain.connect(delayNode);
    delayNode.connect(delayFeedback);
    delayFeedback.connect(delayNode);
    delayNode.connect(delayWet);
    delayWet.connect(audioContext.destination);

    state.audioContext = audioContext;
    state.masterGain = masterGain;
    state.delayNode = delayNode;
    state.delayFeedback = delayFeedback;
    state.delayWet = delayWet;
  }

  if (state.audioContext && state.audioContext.state === "suspended") {
    await state.audioContext.resume();
  }
}

function startSynth() {
  if (!state.audioContext || !state.masterGain) {
    return;
  }

  if (state.synthTimer) {
    return;
  }

  state.masterGain.gain.cancelScheduledValues(state.audioContext.currentTime);
  state.masterGain.gain.setTargetAtTime(0.12, state.audioContext.currentTime, 0.4);

  const step = () => {
    if (!state.musicEnabled || state.activeAudioSource !== "synth") {
      state.synthTimer = null;
      return;
    }

    const beat = melodyPattern[state.synthIndex % melodyPattern.length];
    const chord =
      chordPattern[Math.floor(state.synthIndex / 4) % chordPattern.length];
    const now = state.audioContext.currentTime;

    if (state.synthIndex % 4 === 0) {
      playChord(chord, now, state.beatDuration * 2.2);
    }

    playTone(beat.note, now, state.beatDuration * beat.beats * 0.92, "triangle", 0.18);
    playTone(beat.note, now + 0.04, state.beatDuration * beat.beats * 0.7, "sine", 0.06);

    state.synthIndex += 1;
    state.synthTimer = window.setTimeout(step, beat.beats * state.beatDuration * 1000);
  };

  step();
}

function pauseSynth() {
  if (!state.audioContext || !state.masterGain) {
    return;
  }

  if (state.synthTimer) {
    window.clearTimeout(state.synthTimer);
    state.synthTimer = null;
  }

  state.masterGain.gain.cancelScheduledValues(state.audioContext.currentTime);
  state.masterGain.gain.setTargetAtTime(0.0001, state.audioContext.currentTime, 0.2);
}

function playTone(note, time, duration, type, volume) {
  const frequency = noteFrequencies[note];

  if (!frequency || !state.audioContext || !state.masterGain) {
    return;
  }

  const oscillator = state.audioContext.createOscillator();
  const gainNode = state.audioContext.createGain();
  const filterNode = state.audioContext.createBiquadFilter();

  oscillator.type = type;
  oscillator.frequency.value = frequency;
  filterNode.type = "lowpass";
  filterNode.frequency.value = type === "triangle" ? 1800 : 1200;

  gainNode.gain.setValueAtTime(0.0001, time);
  gainNode.gain.linearRampToValueAtTime(volume, time + 0.04);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, time + duration);

  oscillator.connect(filterNode);
  filterNode.connect(gainNode);
  gainNode.connect(state.masterGain);

  oscillator.start(time);
  oscillator.stop(time + duration + 0.08);
}

function playChord(notes, time, duration) {
  notes.forEach((note, index) => {
    playTone(note, time + index * 0.02, duration, "sine", 0.04);
  });
}

async function safePlayUploadedSong() {
  try {
    state.musicEnabled = true;
    updateMusicLabel();
    await uploadedSong.play();
  } catch (error) {
    state.musicEnabled = false;
    updateMusicLabel();
  }
}

function typeText(element, text, speed = 28) {
  let index = 0;
  element.textContent = "";

  const interval = window.setInterval(() => {
    element.textContent += text[index];
    index += 1;

    if (index >= text.length) {
      window.clearInterval(interval);
    }
  }, speed);
}

function createBurst(x, y, options = {}) {
  const count = options.count ?? 14;
  const palette = options.palette ?? ["#f5b55e", "#ff6f8f", "#7be2f5"];
  const heartMode = options.heartMode ?? false;

  for (let index = 0; index < count; index += 1) {
    const particle = document.createElement("span");
    const angle = (Math.PI * 2 * index) / count + Math.random() * 0.22;
    const distance = 40 + Math.random() * 80;
    const size = heartMode ? 10 + Math.random() * 10 : 6 + Math.random() * 10;

    particle.className = `burst-particle${heartMode ? " heart-particle" : ""}`;
    particle.style.setProperty("--x", `${x}px`);
    particle.style.setProperty("--y", `${y}px`);
    particle.style.setProperty("--tx", `${Math.cos(angle) * distance}px`);
    particle.style.setProperty("--ty", `${Math.sin(angle) * distance}px`);
    particle.style.setProperty("--color", palette[index % palette.length]);
    particle.style.setProperty("--size", `${size}px`);

    document.body.appendChild(particle);
    window.setTimeout(() => particle.remove(), 1400);
  }
}

finalBurstButton.addEventListener("click", () => {
  document.body.dataset.theme = "starlight";
  overlayEyebrow.textContent = "Final espectacular";
  overlayTitle.textContent = "Te elegiría una y mil veces";
  overlayText.textContent =
    "Porque no eres un detalle bonito en la historia: eres una de las razones por las que la historia vale tanto.";
  momentOverlay.classList.add("is-open");
  momentOverlay.setAttribute("aria-hidden", "false");

  for (let index = 0; index < 7; index += 1) {
    window.setTimeout(() => {
      createBurst(window.innerWidth * 0.5, window.innerHeight * 0.52, {
        count: 26,
        palette: ["#8fb9ff", "#cfdcff", "#ffbfd1"],
        heartMode: true,
      });
    }, index * 180);
  }

  rainHearts(22);
});

window.addEventListener("beforeunload", () => {
  if (state.uploadedSongUrl) {
    URL.revokeObjectURL(state.uploadedSongUrl);
  }
});

init();
