export type Input = HTMLInputElement;
export type Button = HTMLButtonElement;

export const inputFile = document.getElementById("input-file")! as Input;

export const playbackBtn = document.getElementById(
  "playback-toggle",
)! as Button;

export const stopBtn = document.getElementById("control-stop")! as Button;

export const volumeInput = document.getElementById("volumen-input")! as Input;

export const exampleTracksList = document.getElementById(
  "example-tracks-list",
) as HTMLUListElement;

export const repeatBtn = document.getElementById("repeat-toggle") as Button;
