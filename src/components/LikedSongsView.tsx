import { useEffect, useState } from 'react';
import { Track } from '../types/music';
import { musicApi } from '../services/musicApi';
import TrackRow from './TrackRow';
import { usePlayer } from '../context/PlayerContext';

interface LikedSongsViewProps {
  onBack: () => void;
}

export default function LikedSongsView({ onBack }: LikedSongsViewProps) {
  const [tracks, setTracks] = useState<Track[]>([]);
  const { playTrack, addToQueue } = usePlayer();

  useEffect(() => {
    loadTracks();
  }, []);

  const loadTracks = async () => {
    const data = await musicApi.getTracks();
    setTracks(data);
    addToQueue(data);
  };

  const handlePlayAll = () => {
    if (tracks.length > 0) {
      playTrack(tracks[0]);
    }
  };

  return (
    <div className="h-full overflow-y-auto">
      {/* Header with gradient */}
      <div className="relative bg-gradient-to-b from-purple-700 to-gray-900 px-8 pt-16 pb-6">
        <button
          onClick={onBack}
          className="absolute left-8 top-6 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
        >
          <BackIcon className="h-5 w-5" />
        </button>

        <div className="flex items-end gap-6">
          <div className="flex h-52 w-52 items-center justify-center rounded bg-gradient-to-br from-purple-400 to-purple-600 shadow-2xl">
            <HeartIcon className="h-24 w-24 text-white" />
          </div>
          <div className="flex-1 pb-2">
            <p className="mb-2 text-sm font-semibold uppercase">Playlist</p>
            <h1 className="mb-6 text-6xl font-bold text-white">Liked Songs</h1>
            <p className="text-sm text-gray-300">
              <span className="font-semibold">Your Library</span> • {tracks.length} songs
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
            <ShuffleIcon className="h-8 w-8" />
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
          {tracks.map((track, index) => (
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
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );
}

function ShuffleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.6 6.6L21 4m0 0l-2.4-2.4M21 4H9a5 5 0 000 10h1M5.4 17.4L3 20m0 0l2.4 2.4M3 20h12a5 5 0 000-10h-1" />
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
