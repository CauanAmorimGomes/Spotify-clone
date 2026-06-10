import { useEffect, useState } from 'react';
import { Playlist, Track } from '../types/music';
import { musicApi } from '../services/musicApi';
import PlaylistCard from './PlaylistCard';

interface LibraryViewProps {
  onPlaylistClick: (playlistId: string) => void;
}

export default function LibraryView({ onPlaylistClick }: LibraryViewProps) {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [activeTab, setActiveTab] = useState<'playlists' | 'artists' | 'albums'>('playlists');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [playlistsData, tracksData] = await Promise.all([
      musicApi.getPlaylists(),
      musicApi.getTracks(),
    ]);
    setPlaylists(playlistsData);
    setTracks(tracksData);
  };

  // Extract unique albums from tracks
  const albums = tracks.reduce((acc, track) => {
    if (!acc.find(a => a.album === track.album)) {
      acc.push({
        album: track.album,
        artist: track.artist,
        cover: track.cover,
      });
    }
    return acc;
  }, [] as Array<{ album: string; artist: string; cover: string }>);

  return (
    <div className="h-full overflow-y-auto px-8 py-6">
      <h1 className="mb-6 text-4xl font-bold text-white">Your Library</h1>

      {/* Tabs */}
      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setActiveTab('playlists')}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
            activeTab === 'playlists'
              ? 'bg-white text-black'
              : 'bg-gray-800 text-white hover:bg-gray-700'
          }`}
        >
          Playlists
        </button>
        <button
          onClick={() => setActiveTab('artists')}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
            activeTab === 'artists'
              ? 'bg-white text-black'
              : 'bg-gray-800 text-white hover:bg-gray-700'
          }`}
        >
          Artists
        </button>
        <button
          onClick={() => setActiveTab('albums')}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
            activeTab === 'albums'
              ? 'bg-white text-black'
              : 'bg-gray-800 text-white hover:bg-gray-700'
          }`}
        >
          Albums
        </button>
      </div>

      {/* Content */}
      <div className="pb-32">
        {activeTab === 'playlists' && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {playlists.map((playlist) => (
              <PlaylistCard
                key={playlist.id}
                playlist={playlist}
                onClick={() => onPlaylistClick(playlist.id)}
              />
            ))}
          </div>
        )}

        {activeTab === 'artists' && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {['The Weeknd', 'Dua Lipa', 'Olivia Rodrigo', 'Justin Bieber', 'Lil Nas X'].map((artist, idx) => (
              <div
                key={artist}
                className="group cursor-pointer rounded-lg bg-gray-900/40 p-4 transition-all hover:bg-gray-800/60"
              >
                <div className="relative mb-4">
                  <img
                    src={`https://images.unsplash.com/photo-${
                      idx % 2 === 0 ? '1493225457124-a3eb161ffa5f' : '1470225620780-dba8ba36b745'
                    }?w=300&h=300&fit=crop`}
                    alt={artist}
                    className="aspect-square w-full rounded-full object-cover shadow-lg"
                  />
                </div>
                <h3 className="mb-1 truncate font-semibold text-white">{artist}</h3>
                <p className="text-sm text-gray-400">Artist</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'albums' && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {albums.map((album) => (
              <div
                key={album.album}
                className="group cursor-pointer rounded-lg bg-gray-900/40 p-4 transition-all hover:bg-gray-800/60"
              >
                <div className="relative mb-4">
                  <img
                    src={album.cover}
                    alt={album.album}
                    className="aspect-square w-full rounded-md object-cover shadow-lg"
                  />
                </div>
                <h3 className="mb-1 truncate font-semibold text-white">{album.album}</h3>
                <p className="text-sm text-gray-400">{album.artist}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
