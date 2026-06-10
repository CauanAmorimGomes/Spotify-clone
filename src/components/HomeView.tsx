import { useEffect, useState } from 'react';
import { Playlist } from '../types/music';
import { musicApi } from '../services/musicApi';
import PlaylistCard from './PlaylistCard';
import { usePlayer } from '../context/PlayerContext';

interface HomeViewProps {
  onPlaylistClick: (playlistId: string) => void;
}

export default function HomeView({ onPlaylistClick }: HomeViewProps) {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToQueue } = usePlayer();

  useEffect(() => {
    loadPlaylists();
  }, []);

  const loadPlaylists = async () => {
    try {
      const data = await musicApi.getPlaylists();
      setPlaylists(data);
    } catch (error) {
      console.error('Failed to load playlists:', error);
    } finally {
      setLoading(false);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto px-8 py-6">
      <h1 className="mb-6 text-4xl font-bold text-white">{getGreeting()}</h1>

      {/* Quick Play Grid */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {playlists.slice(0, 6).map((playlist) => (
          <div
            key={playlist.id}
            onClick={() => {
              addToQueue(playlist.tracks);
              onPlaylistClick(playlist.id);
            }}
            className="group flex cursor-pointer items-center gap-4 overflow-hidden rounded bg-gray-800/40 transition-all hover:bg-gray-700/60"
          >
            <img
              src={playlist.cover}
              alt={playlist.name}
              className="h-20 w-20 object-cover"
            />
            <span className="flex-1 truncate font-semibold text-white">
              {playlist.name}
            </span>
            <button className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-500 opacity-0 shadow-lg transition-all hover:scale-105 hover:bg-green-400 group-hover:opacity-100">
              <PlayIcon className="h-6 w-6 text-black ml-0.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Featured Playlists */}
      <section className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Made for you</h2>
          <button className="text-sm font-semibold text-gray-400 hover:text-white">
            See all
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {playlists.map((playlist) => (
            <PlaylistCard
              key={playlist.id}
              playlist={playlist}
              onClick={() => {
                addToQueue(playlist.tracks);
                onPlaylistClick(playlist.id);
              }}
            />
          ))}
        </div>
      </section>

      {/* Recently Played */}
      <section className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Recently played</h2>
          <button className="text-sm font-semibold text-gray-400 hover:text-white">
            See all
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {playlists.slice(0, 6).map((playlist) => (
            <PlaylistCard
              key={`recent-${playlist.id}`}
              playlist={playlist}
              onClick={() => {
                addToQueue(playlist.tracks);
                onPlaylistClick(playlist.id);
              }}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
