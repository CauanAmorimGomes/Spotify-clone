import { useEffect, useState } from 'react';
import { Playlist } from '../types/music';
import { musicApi } from '../services/musicApi';
import TrackRow from './TrackRow';
import { usePlayer } from '../context/PlayerContext';

interface PlaylistViewProps {
  playlistId: string;
  onBack: () => void;
}

export default function PlaylistView({ playlistId, onBack }: PlaylistViewProps) {
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [loading, setLoading] = useState(true);
  const { playTrack, addToQueue } = usePlayer();

  useEffect(() => {
    loadPlaylist();
  }, [playlistId]);

  const loadPlaylist = async () => {
    try {
      const data = await musicApi.getPlaylistById(playlistId);
      if (data) {
        setPlaylist(data);
        addToQueue(data.tracks);
      }
    } catch (error) {
      console.error('Failed to load playlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlayAll = () => {
    if (playlist && playlist.tracks.length > 0) {
      playTrack(playlist.tracks[0]);
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!playlist) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-white">Playlist not found</div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      {/* Header with gradient */}
      <div className="relative bg-gradient-to-b from-indigo-800 to-gray-900 px-8 pt-16 pb-6">
        <button
          onClick={onBack}
          className="absolute left-8 top-6 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
        >
          <BackIcon className="h-5 w-5" />
        </button>

        <div className="flex items-end gap-6">
          <img
            src={playlist.cover}
            alt={playlist.name}
            className="h-52 w-52 rounded shadow-2xl"
          />
          <div className="flex-1 pb-2">
            <p className="mb-2 text-sm font-semibold uppercase">Playlist</p>
            <h1 className="mb-6 text-6xl font-bold text-white">{playlist.name}</h1>
            <p className="mb-4 text-sm text-gray-300">{playlist.description}</p>
            <p className="text-sm text-gray-300">
              <span className="font-semibold">Spotify</span> • {playlist.tracks.length} songs
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-gradient-to-b from-gray-900/95 to-black px-8 py-6">
        <div className="flex items-center gap-6">
          <button
            onClick={handlePlayAll}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-black transition-all hover:scale-105 hover:bg-green-400"
          >
            <PlayIcon className="h-7 w-7 ml-0.5" />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <HeartIcon className="h-8 w-8" />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <MoreIcon className="h-8 w-8" />
          </button>
        </div>
      </div>

      {/* Track List */}
      <div className="bg-black/20 px-8 pb-32">
        {/* Header */}
        <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 border-b border-gray-800 px-4 py-2 text-sm text-gray-400">
          <div className="flex items-center justify-center">#</div>
          <div>Title</div>
          <div>Album</div>
          <div className="flex justify-end">
            <ClockIcon className="h-5 w-5" />
          </div>
        </div>

        {/* Tracks */}
        <div className="mt-2">
          {playlist.tracks.map((track, index) => (
            <TrackRow key={track.id} track={track} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Icons
function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );
}

function MoreIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function BackIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  );
}
