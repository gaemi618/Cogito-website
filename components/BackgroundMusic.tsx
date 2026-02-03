import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

const BackgroundMusic: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Erik Satie - Gymnopédie No.1 (Public Domain / Wikimedia Commons)
  const musicUrl = "https://upload.wikimedia.org/wikipedia/commons/e/e9/Satie_-_Gymnop%C3%A9die_No._1.ogg";

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // Create a promise to handle autoplay policies
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Audio play failed (browser policy):", error);
        });
      }
    }
    setIsPlaying(!isPlaying);
  };

  // Adjust volume to be subtle
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4; // 40% volume for background ambiance
    }
  }, []);

  return (
    <div className="fixed top-6 right-6 z-50 animate-fade-in">
      <audio ref={audioRef} loop src={musicUrl} />
      
      <button
        onClick={toggleMusic}
        className={`group flex items-center justify-center p-3 rounded-full border transition-all duration-500 backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.5)] ${
          isPlaying 
            ? 'bg-purple-900/40 border-purple-400/50 text-purple-200 shadow-[0_0_20px_rgba(168,85,247,0.4)]' 
            : 'bg-black/40 border-gray-600/50 text-gray-400 hover:bg-gray-800/60 hover:text-white'
        }`}
        title={isPlaying ? "음악 끄기" : "음악 켜기 (Satie - Gymnopédie No.1)"}
      >
        <div className="relative">
          {isPlaying ? (
            <>
              <Volume2 size={20} className="relative z-10" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-purple-400 rounded-full animate-ping"></span>
            </>
          ) : (
            <VolumeX size={20} />
          )}
        </div>
        
        {/* Expanded label on hover */}
        <span className={`overflow-hidden transition-all duration-300 ease-in-out font-serif text-sm whitespace-nowrap ${
          isPlaying ? 'max-w-[0px] group-hover:max-w-[100px] ml-0 group-hover:ml-2' : 'max-w-[0px]'
        }`}>
          Gymnopédie No.1
        </span>
      </button>
    </div>
  );
};

export default BackgroundMusic;