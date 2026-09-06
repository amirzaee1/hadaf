/** The application is intentionally silent. Kept as a no-op for legacy components. */
class SilentSoundEngine {
  public init() {}
  public toggleSound(): boolean { return false; }
  public getIsPlaying(): boolean { return false; }
  public playAtmosphere() {}
  public stop() {}
  public playChime(_frequency?: number) {}
  public playSuccess() {}
  public playTick(_frequency?: number) {}
  public playShatter() {}
}

export const soundEngine = new SilentSoundEngine();
