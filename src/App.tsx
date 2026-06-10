import { useState } from 'react';
import { PlayerProvider } from './context/PlayerContext';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import HomeView from './components/HomeView';
import SearchView from './components/SearchView';
import PlaylistView from './components/PlaylistView';
import LibraryView from './components/LibraryView';
import LikedSongsView from './components/LikedSongsView';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(null);

  const handlePlaylistClick = (playlistId: string) => {
    setSelectedPlaylistId(playlistId);
    setCurrentView('playlist');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedPlaylistId(null);
  };

  const renderView = () => {
    if (currentView === 'playlist' && selectedPlaylistId) {
      return (
        <PlaylistView
          playlistId={selectedPlaylistId}
          onBack={handleBackToHome}
        />
      );
    }

    switch (currentView) {
      case 'search':
        return <SearchView onPlaylistClick={handlePlaylistClick} />;
      case 'library':
        return <LibraryView onPlaylistClick={handlePlaylistClick} />;
      case 'liked':
        return <LikedSongsView onBack={handleBackToHome} />;
      case 'home':
      default:
        return <HomeView onPlaylistClick={handlePlaylistClick} />;
    }
  };

  return (
    <PlayerProvider>
      <div className="flex h-screen overflow-hidden bg-black">
        {/* Sidebar */}
        <Sidebar currentView={currentView} onViewChange={setCurrentView} />

        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          <div className="h-[calc(100vh-90px)] bg-gradient-to-b from-gray-800 to-black">
            {renderView()}
          </div>
        </main>
      </div>

      {/* Player */}
      <Player />
    </PlayerProvider>
  );
}
