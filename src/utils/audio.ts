/**
 * Cinematic Generative Audio Engine for GOAL DREAM
 * Generates an ambient warm analog drone, cinematic sub-pads, and celestial harmonic chimes.
 */

class CinematicSoundEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private masterGain: GainNode | null = null;
  private droneOscillators: OscillatorNode[] = [];
  private filter: BiquadFilterNode | null = null;

  public init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AudioCtx();
  }

  public toggleSound(): boolean {
    this.init();
    if (!this.ctx) return false;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.playAtmosphere();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public playAtmosphere() {
    if (!this.ctx) this.init();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.stop(); // Clear previous nodes

    const now = this.ctx.currentTime;
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.001, now);
    this.masterGain.gain.exponentialRampToValueAtTime(0.18, now + 4);

    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.setValueAtTime(320, now);

    // Warm deep root chord (D minor celestial pad: D2 (73.4Hz), A2 (110Hz), F3 (174.6Hz), C4 (261.6Hz))
    const frequencies = [73.42, 110.0, 174.61, 261.63, 392.0];

    this.droneOscillators = frequencies.map((freq, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = i === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      // Subtle detune for lush cinematic warmth
      osc.detune.setValueAtTime((i % 2 === 0 ? 4 : -4), now);

      gain.gain.setValueAtTime(0.06 / (i + 1), now);

      osc.connect(gain);
      gain.connect(this.filter!);
      osc.start(now);
      return osc;
    });

    this.filter.connect(this.masterGain);
    this.masterGain.connect(this.ctx.destination);
    this.isPlaying = true;
  }

  public stop() {
    if (!this.ctx || !this.masterGain) {
      this.isPlaying = false;
      return;
    }

    const now = this.ctx.currentTime;
    this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);
    setTimeout(() => {
      this.droneOscillators.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {
          // ignore
        }
      });
      this.droneOscillators = [];
      this.isPlaying = false;
    }, 1600);
  }

  /**
   * Harmonious golden chime triggered upon chapter completion or interactive success
   */
  public playChime(freq = 523.25) { // C5 note default
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 1.2);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 2.6);
  }

  public playSuccess() {
    this.playChime(880);
  }

  /**
   * Tactile haptic tick sound for mobile sliders and buttons
   */
  public playTick(freq = 600) {
    if (!this.ctx) this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.04);

    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  }

  /**
   * Heavy shatter resonance when destroying pain stones
   */
  public playShatter() {
    if (!this.ctx) this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.18);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.22);
  }
}

export const soundEngine = new CinematicSoundEngine();
