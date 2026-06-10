import { Playlist } from '../types/music';

interface PlaylistCardProps {
  playlist: Playlist;
  onClick: () => void;
}

export default function PlaylistCard({ playlist, onClick }: PlaylistCardProps) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer rounded-lg bg-gray-900/40 p-4 transition-all hover:bg-gray-800/60"
    >
      <div className="relative mb-4">
        <img
          src={playlist.cover}
          alt={playlist.name}
          className="aspect-square w-full rounded-md object-cover shadow-lg"
        />
        <button className="absolute bottom-2 right-2 flex h-12 w-12 items-center justify-center rounded-full bg-green-500 opacity-0 shadow-xl transition-all hover:scale-105 hover:bg-green-400 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2">
          <PlayIcon className="h-6 w-6 text-black ml-0.5" />
        </button>
      </div>
      <h3 className="mb-1 truncate font-semibold text-white">{playlist.name}</h3>
      <p className="line-clamp-2 text-sm text-gray-400">{playlist.description}</p>
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
