import { playbackBtn, repeatBtn } from "./dom";
import type { AudioSource } from "./player";

type LoadTrack = (file: File, from: AudioSource) => void;
type ClearSelection = () => void;

export class PlayerView {
  trackNameElement: HTMLElement;
  trackCurrentTime: HTMLElement;
  trackDurationElement: HTMLElement;
  inputTrack: HTMLElement;
  loadTrack: LoadTrack | undefined;
  clearSelection: ClearSelection | undefined;

  constructor() {
    this.trackNameElement = document.getElementById("track-name")!;
    this.trackCurrentTime = document.getElementById("track-currenttime")!;
    this.trackDurationElement = document.getElementById("track-duration")!;
    this.inputTrack = document.getElementById("input-track-container")!;
  }

  setupUploadedTrack(file: File) {
    this.inputTrack.classList.add("track-item");
    this.inputTrack.querySelector("h3")!.textContent = file.name;
    this.configureUploadedTrackClick(file);
  }

  configureUploadedTrackClick(file: File) {
    this.inputTrack.addEventListener("click", () => {
      if (this.loadTrack && this.clearSelection) {
        this.clearSelection();
        this.loadTrack(file, "selection");
      }
    });
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

  updateRepeatText(enabled: boolean) {
    repeatBtn.textContent = enabled ? "Repeat: On" : "Repeat";
  }
}
