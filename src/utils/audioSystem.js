// ─── Audio Engine using /mysound.mp3 & Interactive Micro-SFX ─────────────────

class OceanicAudioSystem {
  constructor() {
    this.bgAudio = null;
    this.ctx = null;
    this.isMuted = false;
    this.isExplicitlyMuted = false;
    this.fadeInterval = null;
    this.targetVolume = 0.65;
  }

  initBgAudio() {
    if (this.bgAudio) return;
    try {
      const baseUrl =
        typeof import.meta !== "undefined" && import.meta.env && import.meta.env.BASE_URL
          ? import.meta.env.BASE_URL
          : "/";
      const soundSrc = `${baseUrl.endsWith("/") ? baseUrl : baseUrl + "/"}mysound.mp3`;

      this.bgAudio = new Audio(soundSrc);
      this.bgAudio.loop = true;
      this.bgAudio.preload = "auto";
      this.bgAudio.playsInline = true;
      this.bgAudio.setAttribute("playsinline", "true");
      this.bgAudio.setAttribute("webkit-playsinline", "true");

      // Default volume set to audible level for platforms that restrict dynamic volume fading (e.g. iOS)
      try {
        this.bgAudio.volume = this.targetVolume;
      } catch (e) {}

      // Robust loop safeguard across mobile WebKit implementations
      this.bgAudio.addEventListener("ended", () => {
        if (!this.isExplicitlyMuted && this.bgAudio) {
          this.bgAudio.currentTime = 0;
          this.bgAudio.play().catch(() => {});
        }
      });
    } catch (e) {
      console.warn("Could not create HTML5 Audio element:", e);
    }
  }

  initWebAudio() {
    if (this.ctx) {
      if (this.ctx.state === "suspended") {
        this.ctx.resume().catch(() => {});
      }
      return;
    }
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    } catch (e) {}
  }

  startBgAudio() {
    if (this.isExplicitlyMuted) return Promise.resolve(false);
    this.initBgAudio();
    this.initWebAudio();

    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }

    if (!this.bgAudio) return Promise.resolve(false);

    this.isMuted = false;
    try {
      this.bgAudio.volume = this.targetVolume;
    } catch (e) {}

    const playPromise = this.bgAudio.play();
    if (playPromise !== undefined) {
      return playPromise
        .then(() => {
          this.isMuted = false;
          return true;
        })
        .catch((e) => {
          // Autoplay policy blocked until user interaction
          return false;
        });
    }
    return Promise.resolve(true);
  }

  stopBgAudio() {
    this.isMuted = true;
    this.isExplicitlyMuted = true;
    if (this.bgAudio) {
      this.bgAudio.pause();
    }
  }

  toggleSound() {
    this.initBgAudio();
    this.initWebAudio();

    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }

    if (!this.isMuted && this.bgAudio && !this.bgAudio.paused) {
      this.stopBgAudio();
      return false;
    } else {
      this.isExplicitlyMuted = false;
      this.startBgAudio();
      return true;
    }
  }

  fadeAudio(targetVol, durationMs, onComplete) {
    if (!this.bgAudio) return;
    if (this.fadeInterval) clearInterval(this.fadeInterval);

    try {
      const startVol = this.bgAudio.volume;
      const stepTime = 35;
      const steps = Math.max(1, durationMs / stepTime);
      const volStep = (targetVol - startVol) / steps;
      let currentStep = 0;

      this.fadeInterval = setInterval(() => {
        currentStep++;
        let newVol = this.bgAudio.volume + volStep;
        if (newVol < 0) newVol = 0;
        if (newVol > 1) newVol = 1;
        try {
          this.bgAudio.volume = newVol;
        } catch (e) {}

        if (currentStep >= steps) {
          clearInterval(this.fadeInterval);
          try {
            this.bgAudio.volume = targetVol;
          } catch (e) {}
          if (onComplete) onComplete();
        }
      }, stepTime);
    } catch (e) {
      if (onComplete) onComplete();
    }
  }

  // ── Tactile Micro-Interaction Sound Effects ─────────────────────────────
  playClick() {
    if (this.isMuted || this.isExplicitlyMuted) return;
    this.initWebAudio();
    if (!this.ctx) return;
    try {
      if (this.ctx.state === "suspended") this.ctx.resume().catch(() => {});
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(780, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.14, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.045);
    } catch (e) {}
  }

  playHover(freq = 520) {
    if (this.isMuted || this.isExplicitlyMuted) return;
    this.initWebAudio();
    if (!this.ctx) return;
    try {
      if (this.ctx.state === "suspended") this.ctx.resume().catch(() => {});
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1400, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.22);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.24);
    } catch (e) {}
  }

  playSonarPing() {
    if (this.isMuted || this.isExplicitlyMuted) return;
    this.initWebAudio();
    if (!this.ctx) return;
    try {
      if (this.ctx.state === "suspended") this.ctx.resume().catch(() => {});
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(940, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, this.ctx.currentTime + 0.35);

      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.36);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.38);
    } catch (e) {}
  }
}

export const sound = new OceanicAudioSystem();
