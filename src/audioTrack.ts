export class AudioTrack {
  originalFile: File;
  audio: HTMLAudioElement;

  constructor(originalFile: File, audio: HTMLAudioElement) {
    this.originalFile = originalFile;
    this.audio = audio;
  }

  getDuration() {
    return Number((this.audio.duration / 60).toFixed(2));
  }
}
