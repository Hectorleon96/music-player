// https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement

import { Player } from "./player";
import { PlayerView } from "./playerView";
import * as DOM from "./dom";

const player = new Player(new PlayerView());

DOM.inputFile.addEventListener("change", (event) => player.uploadFile(event));
DOM.playbackBtn.addEventListener("click", () => player.playbackToggle());
DOM.stopBtn.addEventListener("click", () => player.stop());
DOM.volumeInput.addEventListener("input", (event) =>
  player.updateVolume(event),
);
