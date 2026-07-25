import { playbackBtn } from "./dom";

export class PlayerView {
  trackNameElement: HTMLElement;
  trackCurrentTime: HTMLElement;
  trackDurationElement: HTMLElement;

  constructor() {
    this.trackNameElement = document.getElementById("track-name")!;
    this.trackCurrentTime = document.getElementById("track-currenttime")!;
    this.trackDurationElement = document.getElementById("track-duration")!;
  }

  updatePlaybackText(text: "play" | "pause") {
    playbackBtn.textContent = text;
  }

  updateTrackInfo(file: File) {
    this.trackNameElement.textContent = file.name;
  }

  updateTrackDuration(duration: string | number) {
    this.trackDurationElement.textContent = `${duration}`;
  }

  updateTrackCurrentTime(time: string) {
    this.trackCurrentTime.textContent = time;
  }
}
