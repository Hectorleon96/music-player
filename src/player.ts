import { inputFile, playbackBtn, repeatBtn, type Input } from "./dom";
import type { PlayerView } from "./playerView";
import { AudioTrack } from "./audioTrack";

export type PlayerState = "play" | "pause" | "stop";
export type AudioSource = "upload" | "selection" | undefined;

type ResetSelection = () => void;

export class Player {
  state: PlayerState = "stop";
  audioTrack: AudioTrack = new AudioTrack();
  playerView: PlayerView;
  resetSelection: ResetSelection | undefined;
  repeatEnabled = false;

  constructor(playerView: PlayerView) {
    this.playerView = playerView;
    this.configureEvents();
    repeatBtn.addEventListener("click", () => this.toggleRepeat());
  }

  uploadFile(event: Event): void {
    const { files } = event.target as Input;

    if (files && files.length > 0) {
      this.loadTrack(files[0], "upload");
      this.playerView.setupUploadedTrack(files[0]);
    } else {
      this.resetFileInput();
    }
  }

  loadTrack(file: File, from: AudioSource) {
    if (this.isValidFile(file) === false) {
      this.resetFileInput();
      return;
    }

    if (from === "upload" && this.resetSelection) {
      this.resetSelection();
    }

    this.audioTrack.updateAudioFile(file);
    this.playerView.updateTrackInfo(file);
    this.play();
    playbackBtn.disabled = false;
  }

  configureEvents() {
    this.audioTrack.audio.addEventListener("loadedmetadata", () => {
      this.playerView.updateTrackDuration(this.audioTrack.getDuration() || "");
    });

    this.audioTrack.audio.addEventListener("timeupdate", () => {
      const seconds = this.audioTrack.audio.currentTime;
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      this.playerView.updateTrackCurrentTime(
        `${mins}:${secs.toString().padStart(2, "0")}`,
      );
    });

    this.audioTrack.audio.addEventListener("ended", () => {
      this.stop();
    });
  }

  isValidFile(file: File): boolean {
    const validOptions = ["mpeg", "mp3", "wav"];
    return validOptions.some((option) => file.type.endsWith(option));
  }

  play() {
    this.state = "play";
    this.playerView.updatePlaybackText("pause");
    this.audioTrack.audio.play();
  }

  pause() {
    this.state = "pause";
    this.playerView.updatePlaybackText("play");
    this.audioTrack.audio.pause();
  }

  playbackToggle() {
    if (this.state !== "play") {
      this.play();
      return;
    }
    this.pause();
  }

  stop() {
    this.audioTrack.audio.load();
    this.audioTrack.audio.pause();
    this.state = "stop";
    this.playerView.updatePlaybackText("play");
    this.playerView.updateTrackCurrentTime("0:00");
  }

  toggleRepeat() {
    this.repeatEnabled = !this.repeatEnabled;
    this.audioTrack.audio.loop = this.repeatEnabled;
    this.playerView.updateRepeatText(this.repeatEnabled);
  }

  resetFileInput() {
    inputFile.files = null;
    inputFile.value = "";
  }

  updateVolume(event: Event) {
    const { value: volume } = event.target as HTMLInputElement;
    localStorage.setItem("volume", volume);
    this.audioTrack.audio.volume = Number(volume);
  }

  savedVolume(): string {
    const DEFAULT_VOLUME = "0.50";
    return localStorage.getItem("volume") || DEFAULT_VOLUME;
  }
}
