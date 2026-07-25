import { exampleTracksList } from "./dom";
import { TRACKS_EXAMPLES } from "./tracksExamples";

type LoadFile = (file: File) => void;

export class ExampleTracks {
  private trackStringIdentified: string = "track-example-item";
  loadTrack;

  constructor(loadFile: LoadFile) {
    this.loadTrack = loadFile;
  }

  createListElements(): HTMLLIElement[] {
    const examplesAsListItem = TRACKS_EXAMPLES.map((track) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
        <h3 class='example-track-title'>${track.name}</h3>
        <p class='example-track-artist'>${track.artist}</p>
      `;

      listItem.id = `${this.trackStringIdentified}-${track.id}`;
      listItem.dataset.selected = "false";
      listItem.classList.add(this.trackStringIdentified);
      listItem.draggable = true;

      return listItem;
    });

    return examplesAsListItem;
  }

  render(listItems: HTMLLIElement[]) {
    listItems.forEach((item) => exampleTracksList.appendChild(item));
  }

  configureInteraction() {
    exampleTracksList.addEventListener("click", async (event) => {
      const composedPath = event.composedPath();

      const trackClicked = composedPath.find((element) => {
        const el = element as HTMLElement;
        return (
          el.classList && el.classList.contains(this.trackStringIdentified)
        );
      });

      if (trackClicked === undefined) {
        return;
      }

      const el = trackClicked as HTMLElement;
      const trackClickedId = el.id.replace(
        `${this.trackStringIdentified}-`,
        "",
      );

      const track = TRACKS_EXAMPLES.find(
        (track) => track.id === Number(trackClickedId),
      );

      if (track === undefined) {
        return;
      }

      const fetchTrack = await fetch(track.fileSrc);
      const blob = await fetchTrack.blob();
      const file = new File([blob], track.name, { type: "audio/mpeg" });
      this.loadTrack(file);
      this.toggleActive(el.id);
    });
  }

  toggleActive(clickedElementId: string) {
    [...exampleTracksList.children].forEach((element) => {
      const el = element as HTMLLIElement;

      if (el.id === clickedElementId) {
        el.dataset.selected = el.dataset.selected === "true" ? "false" : "true";
      } else {
        el.dataset.selected = "false";
      }
    });
  }

  init() {
    const listItems = this.createListElements();
    this.render(listItems);
    this.configureInteraction();
  }
}
