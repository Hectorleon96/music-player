export type TrackExample = {
  id: number;
  name: string;
  artist: string;
  fileSrc: string;
  originalSrc: string;
};

export const TRACKS_EXAMPLES: TrackExample[] = [
  {
    id: 1,
    name: "Beats",
    artist: "Loksii",
    fileSrc: "./assets/beats-loksii.mp3",
    originalSrc: "https://pixabay.com/music/beats-no-copyright-music-211881/",
  },
  {
    id: 2,
    name: "Meditation/Spiritual",
    artist: "Alex Morgan",
    fileSrc: "./assets/meditation-spitirual-alex-morgan.mp3",
    originalSrc:
      "https://pixabay.com/music/meditationspiritual-no-copyright-music-528321/",
  },
  {
    id: 3,
    name: "Funk",
    artist: "Moodmode",
    fileSrc: "./assets/funk-moodmode.mp3",
    originalSrc: "https://pixabay.com/music/funk-no-copyright-music-201745/",
  },
];
