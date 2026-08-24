// ─── Audio Engine using /mysound.mp3 & Interactive Micro-SFX ─────────────────

class OceanicAudioSystem {
  constructor() {
    this.bgAudio = null;
    this.ctx = null;
    this.isMuted = false;
    this.isExplicitlyMuted = false;
    this.fadeInterval = null;
  }

  initBgAudio() {
    if (this.bgAudio) return;
    this.bgAudio = new Audio("/mysound.mp3");
    this.bgAudio.loop = true;
    this.bgAudio.volume = 0;
    this.bgAudio.preload = "auto";
  }

  initWebAudio() {
    if (this.ctx) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    } catch (e) {}
  }

  startBgAudio() {
    if (this.isExplicitlyMuted) return Promise.resolve(false);
    this.initBgAudio();
    this.initWebAudio();

    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }

    this.isMuted = false;

    return this.bgAudio
      .play()
      .then(() => {
        this.fadeAudio(0.75, 600);
        return true;
      })
      .catch((e) => {
        // Autoplay may be blocked until user interacts with the page
        return false;
      });
  }

  stopBgAudio() {
    this.isMuted = true;
    this.isExplicitlyMuted = true;
    this.fadeAudio(0, 400, () => {
      if (this.bgAudio) this.bgAudio.pause();
    });
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

    const startVol = this.bgAudio.volume;
    const stepTime = 30;
    const steps = Math.max(1, durationMs / stepTime);
    const volStep = (targetVol - startVol) / steps;
    let currentStep = 0;

    this.fadeInterval = setInterval(() => {
      currentStep++;
      let newVol = this.bgAudio.volume + volStep;
      if (newVol < 0) newVol = 0;
      if (newVol > 1) newVol = 1;
      this.bgAudio.volume = newVol;

      if (currentStep >= steps) {
        clearInterval(this.fadeInterval);
        this.bgAudio.volume = targetVol;
        if (onComplete) onComplete();
      }
    }, stepTime);
  }

  // ── Tactile Micro-Interaction Sound Effects ─────────────────────────────
  playClick() {
    if (this.isMuted) return;
    this.initWebAudio();
    if (!this.ctx) return;
    try {
      if (this.ctx.state === "suspended") this.ctx.resume();
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
    if (this.isMuted) return;
    this.initWebAudio();
    if (!this.ctx) return;
    try {
      if (this.ctx.state === "suspended") this.ctx.resume();
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
    if (this.isMuted) return;
    this.initWebAudio();
    if (!this.ctx) return;
    try {
      if (this.ctx.state === "suspended") this.ctx.resume();
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
