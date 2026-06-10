import { usePlayer } from '../context/PlayerContext';
import { formatTime } from '../utils/formatTime';

export default function Player() {
  const {
    currentTrack,
    isPlaying,
    volume,
    currentTime,
    duration,
    togglePlay,
    nextTrack,
    previousTrack,
    setVolume,
    seek,
  } = usePlayer();

  if (!currentTrack) {
    return null;
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    seek(percentage * duration);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900 to-black border-t border-gray-800 px-4 py-3">
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between gap-4">
        {/* Track Info */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <img
            src={currentTrack.cover}
            alt={currentTrack.title}
            className="h-14 w-14 rounded object-cover"
          />
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold text-white">
              {currentTrack.title}
            </div>
            <div className="truncate text-xs text-gray-400">
              {currentTrack.artist}
            </div>
          </div>
          <button className="text-gray-400 hover:text-white transition-colors">
            <HeartIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center gap-2 flex-1 max-w-2xl">
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-white transition-colors">
              <ShuffleIcon className="h-4 w-4" />
            </button>
            <button
              onClick={previousTrack}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <PreviousIcon className="h-5 w-5" />
            </button>
            <button
              onClick={togglePlay}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black hover:scale-105 transition-transform"
            >
              {isPlaying ? (
                <PauseIcon className="h-5 w-5" />
              ) : (
                <PlayIcon className="h-5 w-5 ml-0.5" />
              )}
            </button>
            <button
              onClick={nextTrack}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <NextIcon className="h-5 w-5" />
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              <RepeatIcon className="h-4 w-4" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex w-full items-center gap-2">
            <span className="text-xs text-gray-400 w-10 text-right">
              {formatTime(currentTime)}
            </span>
            <div
              onClick={handleProgressClick}
              className="group relative h-1 flex-1 cursor-pointer rounded-full bg-gray-600 hover:bg-gray-500"
            >
              <div
                className="absolute h-full rounded-full bg-white"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
              <div
                className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-white opacity-0 transition-opacity group-hover:opacity-100"
                style={{ left: `${(currentTime / duration) * 100}%` }}
              />
            </div>
            <span className="text-xs text-gray-400 w-10">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Volume Controls */}
        <div className="flex items-center gap-2 flex-1 justify-end">
          <VolumeIcon className="h-5 w-5 text-gray-400" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 accent-white"
          />
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

function PauseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
    </svg>
  );
}

function NextIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 4l12 8-12 8V4zm13 0v16h-2V4h2z" />
    </svg>
  );
}

function PreviousIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 4v16l-12-8 12-8zM5 4h2v16H5V4z" />
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

function RepeatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M13 17h1a5 5 0 005-5V8m-8-3h-1a5 5 0 00-5 5v4" />
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

function VolumeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
    </svg>
  );
}
