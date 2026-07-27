import { Player } from "./player";
import { PlayerView } from "./playerView";
import * as DOM from "./dom";
import { ExampleTracks } from "./exampleTracks";

const playerView = new PlayerView();
const player = new Player(playerView);

playerView.loadTrack = (file, from) => {
  player.loadTrack(file, from);
};

const exampleTracks = new ExampleTracks((file) =>
  player.loadTrack(file, "selection"),
);

exampleTracks.init();

player.resetSelection = () => exampleTracks.toggleActive("");
playerView.clearSelection = () => exampleTracks.clearSelection();

DOM.inputFile.addEventListener("change", (event) => player.uploadFile(event));

DOM.playbackBtn.addEventListener("click", () => player.playbackToggle());

DOM.stopBtn.addEventListener("click", () => player.stop());

DOM.volumeInput.value = player.savedVolume();

DOM.volumeInput.addEventListener("input", (event) =>
  player.updateVolume(event),
);
