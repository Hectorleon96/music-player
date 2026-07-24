// https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement

import { Player } from "./player";
import { PlayerView } from "./playerView";
import * as DOM from "./dom";
import { ExampleTracks } from "./exampleTracks";

const player = new Player(new PlayerView());

const exampleTracks = new ExampleTracks();
exampleTracks.init();

DOM.inputFile.addEventListener("change", (event) => player.uploadFile(event));

DOM.playbackBtn.addEventListener("click", () => player.playbackToggle());
DOM.stopBtn.addEventListener("click", () => player.stop());

DOM.volumeInput.value = player.savedVolume();
DOM.volumeInput.addEventListener("input", (event) =>
  player.updateVolume(event),
);
