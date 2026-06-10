# Spotify Clone

A modern, fully-functional Spotify clone built with React, TypeScript, and Tailwind CSS.

## Features

### 🎵 Music Player
- Full-featured audio player with play/pause functionality
- Track progress bar with seek capability
- Volume control with slider
- Next/Previous track navigation
- Queue management
- Visual playing indicator with animated bars

### 🎨 Modern UI/UX
- Dark theme matching Spotify's design
- Smooth animations and transitions
- Gradient backgrounds for different sections
- Hover effects on interactive elements
- Custom scrollbar styling
- Responsive grid layouts

### 📱 Multiple Views
- **Home**: Featured playlists, quick play grid, recently played
- **Search**: Browse categories, search tracks and playlists
- **Library**: View playlists, artists, and albums with tabs
- **Playlist View**: Detailed playlist page with track listings
- **Liked Songs**: Dedicated view for favorite tracks

### 🎧 Player Features
- Real-time track information display
- Album artwork
- Artist and track details
- Interactive controls
- Time display (current/total)
- Volume adjustment

### 🎼 Music Management
- Browse playlists
- View track details
- Play individual tracks or entire playlists
- Navigate between tracks
- Visual feedback for currently playing track

### 📊 API Integration
- Mock music API simulating real API calls
- Async data loading
- Track, playlist, and artist data structures
- Simulated network delays for realistic behavior

## Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **Context API** - State management

## Project Structure

```
src/
├── components/
│   ├── Sidebar.tsx          # Navigation sidebar
│   ├── Player.tsx           # Bottom music player
│   ├── HomeView.tsx         # Home page
│   ├── SearchView.tsx       # Search page
│   ├── LibraryView.tsx      # Library page
│   ├── PlaylistView.tsx     # Playlist detail page
│   ├── LikedSongsView.tsx   # Liked songs page
│   ├── PlaylistCard.tsx     # Playlist card component
│   └── TrackRow.tsx         # Track row component
├── context/
│   └── PlayerContext.tsx    # Music player state management
├── services/
│   └── musicApi.ts          # Mock API service
├── types/
│   └── music.ts             # TypeScript type definitions
├── utils/
│   ├── formatTime.ts        # Time formatting utility
│   └── cn.ts                # Utility functions
├── App.tsx                  # Main app component
├── main.tsx                 # Entry point
└── index.css                # Global styles

```

## Key Components

### PlayerContext
Manages global music player state including:
- Current track
- Play/pause state
- Volume
- Current time and duration
- Queue management
- Audio element ref

### Sidebar
Navigation menu with:
- Logo
- Main menu items
- Library sections
- Install app option

### Player
Bottom player bar with:
- Track information
- Playback controls
- Progress bar
- Volume control

### Views
Multiple views for different app sections, each with custom styling and functionality.

## Styling Features

- Custom scrollbar styling
- Smooth transitions
- Gradient backgrounds
- Hover effects
- Pulse animations for playing indicator
- Custom range input styling
- Responsive layouts

## Build

The project builds to a single HTML file with all assets inlined for easy deployment.

```bash
npm run build
```

Output: `dist/index.html` (254 KB)
