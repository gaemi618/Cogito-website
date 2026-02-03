import React, { useState, useEffect } from 'react';
import { Smartphone } from 'lucide-react';

interface LandingPageProps {
  onEnter: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  const [showApp, setShowApp] = useState(false);
  const [message, setMessage] = useState("Are you desperate enough?");

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowApp(true);
      setMessage("A new application has been installed.");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center bg-black text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <img 
          src="https://i.postimg.cc/qM1MWPQp/kojitomein.png" 
          alt="Cogito Main" 
          className="w-full h-full object-cover opacity-80 animate-pulse"
          style={{ animationDuration: '4s' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80 z-10"></div>
      </div>

      <div className="z-20 flex flex-col items-center space-y-8 animate-fade-in">
        <h1 className="text-2xl font-serif tracking-widest text-gray-300 mb-8 drop-shadow-lg text-center px-4">{message}</h1>
        
        {showApp && (
          <button 
            onClick={onEnter}
            className="group relative flex flex-col items-center justify-center p-6 rounded-3xl bg-gray-900/80 border border-gray-600 hover:border-purple-500 hover:bg-gray-900 hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] transition-all duration-700 ease-in-out transform hover:scale-105 backdrop-blur-md"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-purple-600 blur-2xl opacity-20 group-hover:opacity-70 transition-opacity duration-500"></div>
              <Smartphone size={64} className="text-purple-300 relative z-10" />
            </div>
            <span className="mt-4 font-serif text-xl text-purple-200">Cogito</span>
            <span className="text-xs text-gray-400 mt-1 tracking-widest group-hover:text-purple-400 transition-colors">TAP TO OPEN</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default LandingPage;