import type { AudioSource } from "./player";

export class AudioTrack {
  audio: HTMLAudioElement;
  originalFile: File | undefined;

  constructor() {
    this.originalFile = undefined;
    this.audio = new Audio();
  }

  getDuration() {
    if (this.audio.src) {
      return Number((this.audio.duration / 60).toFixed(2));
    }
  }

  updateAudioFile(file: File, from: AudioSource) {
    console.log(from);

    this.originalFile = file;

    if (this.audio.src) {
      URL.revokeObjectURL(this.audio.src);
    }

    this.audio.src = URL.createObjectURL(file);
  }
}
