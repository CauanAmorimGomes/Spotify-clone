import { useState, useEffect } from 'react';
import { Track, Playlist } from '../types/music';
import { musicApi } from '../services/musicApi';
import TrackRow from './TrackRow';
import PlaylistCard from './PlaylistCard';

interface SearchViewProps {
  onPlaylistClick: (playlistId: string) => void;
}

export default function SearchView({ onPlaylistClick }: SearchViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [tracks, setTracks] = useState<Track[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [tracksData, playlistsData] = await Promise.all([
      musicApi.getTracks(),
      musicApi.getPlaylists(),
    ]);
    setTracks(tracksData);
    setPlaylists(playlistsData);
  };

  const filteredTracks = searchQuery
    ? tracks.filter(
        (track) =>
          track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          track.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
          track.album.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const filteredPlaylists = searchQuery
    ? playlists.filter(
        (playlist) =>
          playlist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          playlist.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const browseCategories = [
    { name: 'Pop', color: 'bg-pink-500', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop' },
    { name: 'Hip-Hop', color: 'bg-red-600', image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop' },
    { name: 'Rock', color: 'bg-orange-500', image: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=300&h=300&fit=crop' },
    { name: 'Latin', color: 'bg-yellow-500', image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop' },
    { name: 'Dance/Electronic', color: 'bg-green-500', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop' },
    { name: 'R&B', color: 'bg-blue-500', image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop' },
    { name: 'Indie', color: 'bg-indigo-500', image: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300&h=300&fit=crop' },
    { name: 'Workout', color: 'bg-purple-500', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300&h=300&fit=crop' },
  ];

  return (
    <div className="h-full overflow-y-auto px-8 py-6">
      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <SearchIcon className="absolute left-3 top-1/2 h-6 w-6 -translate-y-1/2 text-gray-900" />
          <input
            type="text"
            placeholder="What do you want to listen to?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full bg-white py-3 pl-12 pr-4 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>
      </div>

      {/* Search Results */}
      {searchQuery ? (
        <div className="space-y-8">
          {/* Tracks Results */}
          {filteredTracks.length > 0 && (
            <section>
              <h2 className="mb-4 text-2xl font-bold text-white">Songs</h2>
              <div>
                {filteredTracks.map((track, index) => (
                  <TrackRow key={track.id} track={track} index={index} />
                ))}
              </div>
            </section>
          )}

          {/* Playlists Results */}
          {filteredPlaylists.length > 0 && (
            <section>
              <h2 className="mb-4 text-2xl font-bold text-white">Playlists</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {filteredPlaylists.map((playlist) => (
                  <PlaylistCard
                    key={playlist.id}
                    playlist={playlist}
                    onClick={() => onPlaylistClick(playlist.id)}
                  />
                ))}
              </div>
            </section>
          )}

          {/* No Results */}
          {filteredTracks.length === 0 && filteredPlaylists.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-xl text-white">No results found for "{searchQuery}"</p>
              <p className="mt-2 text-gray-400">
                Please make sure your words are spelled correctly, or use fewer or different keywords.
              </p>
            </div>
          )}
        </div>
      ) : (
        /* Browse Categories */
        <div>
          <h2 className="mb-4 text-2xl font-bold text-white">Browse all</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {browseCategories.map((category) => (
              <div
                key={category.name}
                className={`group relative aspect-square cursor-pointer overflow-hidden rounded-lg ${category.color} p-4 transition-all hover:scale-105`}
              >
                <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute -right-4 bottom-0 h-24 w-24 rotate-12 rounded shadow-xl transition-transform group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}
