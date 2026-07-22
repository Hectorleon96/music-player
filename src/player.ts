import { inputFile, playbackBtn, type Input } from "./dom";
import type { PlayerView } from "./playerView";
import { AudioTrack } from "./audioTrack";

type PlayerState = "play" | "pause" | "stop";

export class Player {
  state: PlayerState = "stop";
  audioObjectUrl: string | undefined;
  audioTrack: AudioTrack | null = null;
  playerView: PlayerView;

  constructor(playerView: PlayerView) {
    this.playerView = playerView;
  }

  uploadFile(event: Event): void {
    const { files } = event.target as Input;

    if (files && files.length > 0) {
      this.fileToAudio(files[0]);
    } else {
      this.resetFileInput();
    }
  }

  fileToAudio(file: File) {
    if (this.isValidFile(file) === false) {
      this.resetFileInput();
      return;
    }

    if (this.audioObjectUrl) {
      URL.revokeObjectURL(this.audioObjectUrl);
    }

    this.audioObjectUrl = URL.createObjectURL(file);
    this.audioTrack = new AudioTrack(file, new Audio(this.audioObjectUrl));

    this.audioTrack.audio.addEventListener("loadedmetadata", () => {
      this.playerView.updateTrackDuration(this.audioTrack?.getDuration() || "");
    });

    this.audioTrack.audio.addEventListener("timeupdate", () => {
      if (this.audioTrack) {
        const seconds = this.audioTrack.audio.currentTime;
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        this.playerView.updateTrackCurrentTime(
          `${mins}:${secs.toString().padStart(2, "0")}`,
        );
      }
    });

    this.playerView.updateTrackInfo(file);
    playbackBtn.disabled = false;
  }

  isValidFile(file: File): Boolean {
    const validOptions = ["mpeg", "mp3", "wav"];
    return validOptions.some((option) => file.type.endsWith(option));
  }

  play() {
    if (this.audioTrack === null) {
      return;
    }

    this.state = "play";
    this.playerView.updatePlaybackText("pause");
    this.audioTrack.audio.play();
  }

  pause() {
    this.state = "pause";
    this.playerView.updatePlaybackText("play");
    this.audioTrack?.audio.pause();
  }

  playbackToggle() {
    if (this.state !== "play") {
      this.play();
      return;
    }

    this.pause();
  }

  stop() {
    if (this.audioTrack) {
      this.audioTrack.audio.load();
    }

    this.state = "stop";
    this.playerView.updatePlaybackText("play");
    this.playerView.updateTrackCurrentTime("0:00");
  }

  resetFileInput() {
    inputFile.files = null;
    inputFile.value = "";
  }
}
