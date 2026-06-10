import { Track } from '../types/music';
import { usePlayer } from '../context/PlayerContext';
import { formatTime } from '../utils/formatTime';

interface TrackRowProps {
  track: Track;
  index: number;
}

export default function TrackRow({ track, index }: TrackRowProps) {
  const { currentTrack, isPlaying, playTrack, togglePlay } = usePlayer();
  const isCurrentTrack = currentTrack?.id === track.id;

  const handleClick = () => {
    if (isCurrentTrack) {
      togglePlay();
    } else {
      playTrack(track);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="group grid grid-cols-[16px_4fr_2fr_1fr] gap-4 rounded px-4 py-2 text-gray-400 hover:bg-gray-800/50 cursor-pointer"
    >
      <div className="flex items-center justify-center">
        {isCurrentTrack && isPlaying ? (
          <div className="flex items-center gap-0.5">
            <div className="h-3 w-0.5 animate-pulse bg-green-500" style={{ animationDelay: '0ms' }} />
            <div className="h-3 w-0.5 animate-pulse bg-green-500" style={{ animationDelay: '150ms' }} />
            <div className="h-3 w-0.5 animate-pulse bg-green-500" style={{ animationDelay: '300ms' }} />
          </div>
        ) : (
          <>
            <span className={`text-sm group-hover:hidden ${isCurrentTrack ? 'text-green-500' : ''}`}>
              {index + 1}
            </span>
            <PlayIcon className="hidden h-4 w-4 text-white group-hover:block" />
          </>
        )}
      </div>
      
      <div className="flex items-center gap-3 min-w-0">
        <img
          src={track.cover}
          alt={track.title}
          className="h-10 w-10 rounded object-cover"
        />
        <div className="min-w-0">
          <div className={`truncate text-sm ${isCurrentTrack ? 'text-green-500' : 'text-white'}`}>
            {track.title}
          </div>
          <div className="truncate text-xs text-gray-400">{track.artist}</div>
        </div>
      </div>

      <div className="flex items-center">
        <span className="truncate text-sm">{track.album}</span>
      </div>

      <div className="flex items-center justify-end">
        <button className="mr-4 opacity-0 group-hover:opacity-100 hover:text-white transition-opacity">
          <HeartIcon className="h-4 w-4" />
        </button>
        <span className="text-sm">{formatTime(track.duration)}</span>
      </div>
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

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );
}
