import React, { useState } from 'react';
import { CHARACTERS } from '../constants';
import { AnimusType, AnimusCharacter } from '../types';
import { ArrowRight, Sparkles, Info } from 'lucide-react';
import ProfileModal from './ProfileModal';

interface LobbyProps {
  onSelectAnimus: (animus: AnimusType) => void;
}

const Lobby: React.FC<LobbyProps> = ({ onSelectAnimus }) => {
  const [viewingProfile, setViewingProfile] = useState<AnimusType | null>(null);

  const categories = [
    { title: "상념의 방 (The Core)", ids: [AnimusType.EGO, AnimusType.ID, AnimusType.SUPEREGO] },
    { title: "감정의 상담실 (Emotions)", ids: [AnimusType.HAPPINESS, AnimusType.SADNESS, AnimusType.ANGER, AnimusType.FEAR, AnimusType.DISGUST, AnimusType.SURPRISE] },
  ];

  return (
    <div className="relative z-10 w-full min-h-screen p-6 md:p-12 overflow-y-auto">
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-6xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-blue-200 mb-4 drop-shadow-lg">
          자아상담소 Cogito
        </h1>
        <p className="text-gray-400 font-light tracking-wider max-w-2xl mx-auto">
          어서오십시오. 당신의 마음을 마주할 준비가 되셨습니까?
          이곳에서 당신의 자아, 그리고 감정들과 대화를 나누어보세요.
        </p>
      </header>

      <div className="max-w-7xl mx-auto space-y-16 pb-20">
        {categories.map((cat, idx) => (
          <div key={idx} className="space-y-6">
            <h2 className="text-2xl font-serif text-purple-300 border-b border-purple-500/30 pb-2 inline-block">
              {cat.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cat.ids.map((id) => {
                const char: AnimusCharacter = CHARACTERS[id];
                return (
                  <div
                    key={id}
                    className="group relative overflow-hidden rounded-2xl border border-gray-700 bg-gray-900 transition-all duration-500 text-left h-72 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:-translate-y-2 flex flex-col justify-between"
                  >
                    {/* Background Image (Location) - Restored to primary focus */}
                    <div className="absolute inset-0">
                        <img 
                            src={char.locationImage} 
                            alt={char.locationName} 
                            className="w-full h-full object-cover opacity-50 group-hover:opacity-40 transition-all duration-700" 
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/60 to-transparent`}></div>
                    </div>
                    
                    <div className="relative z-10 p-6 flex flex-col h-full justify-between">
                      <div className="flex justify-between items-start">
                         <span className={`text-xs font-bold px-2 py-1 rounded bg-black/40 border border-${char.themeColor} text-gray-200 backdrop-blur-sm shadow-sm`}>
                            {char.role}
                          </span>
                      </div>
                      
                      <div className="mt-auto">
                        <h3 className="text-2xl font-bold text-gray-100 mb-1 group-hover:text-white font-serif drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{char.name}</h3>
                        <p className="text-sm text-gray-400 italic mb-4 drop-shadow-md">{char.locationName}</p>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-2 border-t border-gray-800/50">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectAnimus(id);
                            }}
                            className={`flex-1 flex items-center justify-center bg-${char.themeColor}/20 hover:bg-${char.themeColor}/40 border border-${char.themeColor}/40 text-white py-3 rounded-xl text-sm transition-all duration-300 backdrop-blur-md shadow-lg group-hover:shadow-${char.themeColor}/20`}
                          >
                            상담하기 <ArrowRight size={16} className="ml-2" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setViewingProfile(id);
                            }}
                            className="px-4 py-3 bg-gray-800/60 hover:bg-gray-700/80 border border-gray-600/50 rounded-xl text-gray-300 hover:text-white transition-colors backdrop-blur-md"
                            title="크게 보기"
                          >
                            <Info size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {viewingProfile && (
        <ProfileModal 
          character={CHARACTERS[viewingProfile]} 
          onClose={() => setViewingProfile(null)} 
        />
      )}
    </div>
  );
};

export default Lobby;