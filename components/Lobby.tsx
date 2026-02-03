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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cat.ids.map((id) => {
                const char: AnimusCharacter = CHARACTERS[id];
                return (
                  <div
                    key={id}
                    className="group relative overflow-hidden rounded-xl border border-gray-700 bg-gray-900 transition-all duration-300 text-left h-64 hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] hover:-translate-y-1 flex flex-col justify-between"
                  >
                    {/* Background Image with Overlay */}
                    <div className="absolute inset-0">
                        <img 
                            src={char.locationImage} 
                            alt={char.locationName} 
                            className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-all duration-700 transform group-hover:scale-110" 
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent group-hover:via-gray-900/40 transition-colors`}></div>
                    </div>
                    
                    <div className="relative z-10 p-6 flex flex-col h-full justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <span className={`text-xs font-bold px-2 py-1 rounded bg-black/60 border border-${char.themeColor} text-gray-300 backdrop-blur-sm`}>
                            {char.role}
                          </span>
                          <Sparkles size={16} className={`text-${char.themeColor} opacity-70 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]`} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-100 mb-1 group-hover:text-white font-serif drop-shadow-lg">{char.name}</h3>
                        <p className="text-sm text-gray-300 line-clamp-2 italic drop-shadow-md">{char.locationName}</p>
                      </div>
                      
                      {/* Description Text */}
                      <p className="text-xs text-gray-400 line-clamp-2 group-hover:opacity-0 transition-opacity absolute bottom-6 left-6 right-6 drop-shadow-md">
                        {char.description}
                      </p>

                      {/* Action Buttons (Visible on Hover) */}
                      <div className="flex gap-2 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 mt-auto">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectAnimus(id);
                          }}
                          className={`flex-1 flex items-center justify-center bg-${char.themeColor}/30 hover:bg-${char.themeColor}/50 border border-${char.themeColor}/50 text-white py-2 rounded-lg text-sm transition-colors backdrop-blur-md`}
                        >
                          상담하기 <ArrowRight size={14} className="ml-1" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setViewingProfile(id);
                          }}
                          className="px-3 py-2 bg-black/40 hover:bg-black/60 border border-gray-500/50 rounded-lg text-gray-300 hover:text-white transition-colors backdrop-blur-md"
                          title="프로필 보기"
                        >
                          <Info size={18} />
                        </button>
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