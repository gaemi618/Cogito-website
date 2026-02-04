import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Lobby from './components/Lobby';
import ChatInterface from './components/ChatInterface';
import StarBackground from './components/StarBackground';
import { AnimusType } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'lobby' | 'chat'>('landing');
  const [selectedAnimus, setSelectedAnimus] = useState<AnimusType | null>(null);

  const enterApp = () => {
    setView('lobby');
  };

  const handleSelectAnimus = (animus: AnimusType) => {
    setSelectedAnimus(animus);
    setView('chat');
  };

  const handleBackToLobby = () => {
    setSelectedAnimus(null);
    setView('lobby');
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-purple-500 selection:text-white">
      {/* Global Background Effect */}
      <StarBackground />
      
      {/* View Routing */}
      {view === 'landing' && <LandingPage onEnter={enterApp} />}
      
      {view === 'lobby' && (
        <div className="animate-fade-in">
          <Lobby onSelectAnimus={handleSelectAnimus} />
        </div>
      )}

      {view === 'chat' && selectedAnimus && (
        <div className="animate-fade-in">
          <ChatInterface animusId={selectedAnimus} onBack={handleBackToLobby} />
        </div>
      )}
    </div>
  );
};

export default App;