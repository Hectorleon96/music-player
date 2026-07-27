# 🎵 Music Player

A lightweight music player built with **TypeScript**, **HTML**, and **CSS**, without using any JavaScript frameworks.

This project started as a simple idea: _"I just want to write code."_
Instead of building another CRUD application, the goal was to practice browser APIs, object-oriented programming, application architecture, and state management while creating something functional.

## ✨ Features

- Upload audio files from your local device
- Play, pause and stop playback
- Built-in example tracks
- Switch seamlessly between uploaded files and example tracks
- Repeat mode
- Persistent volume using Local Storage
- Track duration and current playback time
- Automatic playback when selecting a track
- Responsive layout for desktop and mobile devices

## 🛠️ Built With

- TypeScript
- HTML5
- CSS3
- Vite
- GitHub Pages
- GitHub Actions

## 🧩 Project Architecture

The application follows a simple object-oriented design where every class has a clear responsibility.

### Player

Responsible for the application's playback logic.

- Handles play, pause and stop
- Loads tracks
- Validates uploaded files
- Manages repeat mode
- Controls volume
- Coordinates communication between the other classes

### AudioTrack

Encapsulates the browser's `HTMLAudioElement`.

- Creates object URLs
- Stores the current audio file
- Provides track duration
- Updates the current audio source

### PlayerView

Responsible only for updating the user interface.

- Updates playback buttons
- Displays track information
- Updates timers
- Handles the uploaded track UI
- Connects UI events back to the Player through callbacks

### ExampleTracks

Manages the list of bundled example tracks.

- Renders the list
- Handles selection state
- Downloads bundled tracks
- Passes selected files to the Player

## 🚀 Running Locally

Clone the repository:

```bash
git clone https://github.com/hectorleon96/music-player.git
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## 🌐 Live Demo

https://hectorleon96.github.io/music-player/

## 📚 What I Practiced

- Object-Oriented Programming in TypeScript
- Browser Audio API (`HTMLAudioElement`)
- File API (`File`, `Blob`, `URL.createObjectURL`)
- DOM event handling
- Separation of responsibilities
- Callback-based communication between classes
- Local Storage
- GitHub Pages deployment
- GitHub Actions deployment workflow

## 📄 License

This project is available for learning and personal use.

Example music tracks are royalty-free and were obtained from Pixabay.
