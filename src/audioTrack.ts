export class AudioTrack {
  audio: HTMLAudioElement;
  originalFile: File | undefined;

  constructor() {
    this.originalFile = undefined;
    this.audio = new Audio();
  }

  getDuration() {
    if (this.audio.src) {
      const mins = Math.floor(this.audio.duration / 60);
      const seconds = Math.floor(this.audio.duration % 60);
      const duration = `${mins}:${seconds}`;
      return duration;
    }
  }

  updateAudioFile(file: File) {
    this.originalFile = file;

    if (this.audio.src) {
      URL.revokeObjectURL(this.audio.src);
    }

    this.audio.src = URL.createObjectURL(file);
  }
}
