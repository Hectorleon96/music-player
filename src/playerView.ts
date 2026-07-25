import { playbackBtn } from "./dom";

export class PlayerView {
  trackNameElement: HTMLElement;
  trackCurrentTime: HTMLElement;
  trackDurationElement: HTMLElement;
  inputTrack: HTMLElement;

  constructor() {
    this.trackNameElement = document.getElementById("track-name")!;
    this.trackCurrentTime = document.getElementById("track-currenttime")!;
    this.trackDurationElement = document.getElementById("track-duration")!;
    this.inputTrack = document.getElementById("input-track-container")!;
  }

  configureUploadedTrack(file: File) {
    if (this.inputTrack.classList.contains("track-item") === false) {
      this.inputTrack.classList.add("track-item");
    }

    this.inputTrack.querySelector("h3")!.textContent = file.name;
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
