import { exampleTracksList } from "./dom";
import { TRACKS_EXAMPLES } from "./tracksExamples";

export class ExampleTracks {
  createListElements(): HTMLLIElement[] {
    const examplesAsListItem = TRACKS_EXAMPLES.map((track) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
        <h3 class='example-track-title'>${track.name}</h3>
        <p class='example-track-artist'>${track.artist}</p>
      `;

      listItem.id = track.id.toString();
      listItem.dataset.source = track.fileSrc;
      listItem.dataset.selected = "false";
      listItem.classList.add("track-example-item");
      listItem.draggable = true;

      return listItem;
    });

    return examplesAsListItem;
  }

  render() {
    const listItems = this.createListElements();
    listItems.forEach((item) => exampleTracksList.appendChild(item));
  }
}
