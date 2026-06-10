import { Track, Playlist, Artist } from '../types/music';

// Mock data - in a real app, this would fetch from an API like Spotify or Deezer
export const mockTracks: Track[] = [
  {
    id: '1',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: 200,
    cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    id: '2',
    title: 'Levitating',
    artist: 'Dua Lipa',
    album: 'Future Nostalgia',
    duration: 203,
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
  },
  {
    id: '3',
    title: 'Save Your Tears',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: 215,
    cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
  },
  {
    id: '4',
    title: 'Good 4 U',
    artist: 'Olivia Rodrigo',
    album: 'SOUR',
    duration: 178,
    cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'
  },
  {
    id: '5',
    title: 'Peaches',
    artist: 'Justin Bieber',
    album: 'Justice',
    duration: 198,
    cover: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3'
  },
  {
    id: '6',
    title: 'drivers license',
    artist: 'Olivia Rodrigo',
    album: 'SOUR',
    duration: 242,
    cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3'
  },
  {
    id: '7',
    title: 'Montero',
    artist: 'Lil Nas X',
    album: 'MONTERO',
    duration: 137,
    cover: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3'
  },
  {
    id: '8',
    title: 'Stay',
    artist: 'The Kid LAROI & Justin Bieber',
    album: 'F*CK LOVE 3',
    duration: 141,
    cover: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&h=400&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3'
  }
];

export const mockPlaylists: Playlist[] = [
  {
    id: 'p1',
    name: 'Today\'s Top Hits',
    description: 'The hottest tracks right now',
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop',
    tracks: mockTracks.slice(0, 4)
  },
  {
    id: 'p2',
    name: 'Chill Vibes',
    description: 'Relax and unwind with these chill tracks',
    cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop',
    tracks: mockTracks.slice(2, 6)
  },
  {
    id: 'p3',
    name: 'Workout Mix',
    description: 'Get pumped with high-energy music',
    cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    tracks: mockTracks.slice(4, 8)
  },
  {
    id: 'p4',
    name: 'Party Playlist',
    description: 'Turn up the volume and let\'s party',
    cover: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop',
    tracks: mockTracks.slice(1, 5)
  }
];

export const mockArtists: Artist[] = [
  {
    id: 'a1',
    name: 'The Weeknd',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    followers: 92000000
  },
  {
    id: 'a2',
    name: 'Dua Lipa',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
    followers: 85000000
  },
  {
    id: 'a3',
    name: 'Olivia Rodrigo',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop',
    followers: 45000000
  },
  {
    id: 'a4',
    name: 'Justin Bieber',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop',
    followers: 94000000
  }
];

// Simulate API calls
export const musicApi = {
  getTracks: async (): Promise<Track[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockTracks), 500);
    });
  },

  getPlaylists: async (): Promise<Playlist[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockPlaylists), 500);
    });
  },

  getArtists: async (): Promise<Artist[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockArtists), 500);
    });
  },

  getPlaylistById: async (id: string): Promise<Playlist | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const playlist = mockPlaylists.find(p => p.id === id);
        resolve(playlist);
      }, 500);
    });
  }
};
