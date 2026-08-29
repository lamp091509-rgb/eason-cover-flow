export class AudioManager {
  constructor() {
    this.audio = new Audio();
    this.audio.preload = 'metadata';
    this.currentId = null;
  }

  async play(track) {
    if (!track.audio) {
      throw new Error(`No audio is available for ${track.title}.`);
    }
    if (this.currentId !== track.id) {
      this.audio.pause();
      this.audio.src = track.audio;
      this.audio.load();
      this.currentId = track.id;
    }
    await this.audio.play();
  }

  pause() { this.audio.pause(); }
  toggle(track) { return this.audio.paused ? this.play(track) : Promise.resolve(this.pause()); }
  get isPlaying() { return !this.audio.paused; }
}
