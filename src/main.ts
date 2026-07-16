type PlayerState = "play" | "pause" | "stop";
type Input = HTMLInputElement;
type Button = HTMLButtonElement;

const inputFile = document.getElementById("input-file")! as Input;
const playbackBtn = document.getElementById("playback-toggle")! as Button;
const stopBtn = document.getElementById("control-stop")! as Button;

class Player {
  state: PlayerState = "stop";
  audioObjectUrl?: string;
  playingSeconds: number = 0;
  playingInterval: number | undefined = undefined;
  currentAudioElement: HTMLAudioElement | null = null;
  audioTrack: AudioTrack | null = null;
  trackDuration: number = 0;
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

    clearInterval(this.playingInterval);

    this.audioObjectUrl = URL.createObjectURL(file);
    const audioInstance = new Audio(this.audioObjectUrl);
    this.currentAudioElement = audioInstance;

    audioInstance.addEventListener("loadeddata", () => {
      this.audioTrack = new AudioTrack(file, audioInstance);
      this.trackDuration = Number(this.audioTrack.duration);
      this.playerView.updateTrackDuration(this.audioTrack.duration);
    });

    this.playerView.updateTrackInfo(file);
    playbackBtn.disabled = false;
  }

  isValidFile(file: File): Boolean {
    const validOptions = ["mpeg", "mp3", "wav"];
    return validOptions.some((option) => file.type.endsWith(option));
  }

  play() {
    if (this.currentAudioElement === null) {
      return;
    }

    this.state = "play";
    this.playerView.updatePlaybackText("pause");
    this.currentAudioElement?.play();

    this.playingInterval = setInterval(() => {
      this.playingSeconds++;

      const minutes = Math.floor(this.trackDuration / 60);
      const seconds = this.playingSeconds % 60;
      const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;
      this.playerView.updateTrackCurrentTime(formattedTime);
    }, 1000);
  }

  pause() {
    this.state = "pause";
    this.playerView.updatePlaybackText("play");
    this.currentAudioElement?.pause();
    clearInterval(this.playingInterval);
  }

  playbackToggle() {
    if (this.state !== "play") {
      this.play();
      return;
    }

    this.pause();
  }

  stop() {
    if (this.currentAudioElement) {
      this.currentAudioElement.load();
    }

    this.state = "stop";
    this.playerView.updatePlaybackText("play");
    this.playerView.updateTrackCurrentTime("0:00");
    this.playingSeconds = 0;
    clearInterval(this.playingInterval);
  }

  resetFileInput() {
    inputFile.files = null;
    inputFile.value = "";
  }
}

class AudioTrack {
  originalFile: File;
  audio: HTMLAudioElement;
  duration: string;

  constructor(originalFile: File, audio: HTMLAudioElement) {
    this.originalFile = originalFile;
    this.audio = audio;
    this.duration = (this.audio.duration / 60).toFixed(2);
  }
}

class PlayerView {
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

  updateTrackInfo(file: File | null) {
    this.trackNameElement.textContent = `Name: ${file?.name}`;
  }

  updateTrackDuration(duration: string) {
    this.trackDurationElement.textContent = duration;
  }

  updateTrackCurrentTime(time: string) {
    this.trackCurrentTime.textContent = time;
  }
}

const player = new Player(new PlayerView());

inputFile.addEventListener("change", (event) => player.uploadFile(event));
playbackBtn.addEventListener("click", () => player.playbackToggle());
stopBtn.addEventListener("click", () => player.stop());
