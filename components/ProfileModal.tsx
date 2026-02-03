import React from 'react';
import { AnimusCharacter } from '../types';
import { X } from 'lucide-react';

interface ProfileModalProps {
  character: AnimusCharacter;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ character, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>
      
      {/* Increased max-width and height for better image visibility */}
      <div className="relative w-full max-w-5xl h-[85vh] bg-gray-900 border border-gray-700 rounded-3xl overflow-hidden shadow-2xl transform transition-all animate-fade-in flex flex-col md:flex-row">
        
        {/* Close Button (Absolute z-index to sit on top) */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors border border-white/20"
        >
          <X size={24} />
        </button>

        {/* Left Side: Large Character Image */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full relative bg-gradient-to-b from-gray-800 to-black overflow-hidden group">
             {/* Background location blurred behind the character */}
             <div className="absolute inset-0 opacity-30">
                <img src={character.locationImage} alt="bg" className="w-full h-full object-cover blur-md" />
             </div>
             
             {/* Main Character Image - Large and mostly uncropped */}
             <img 
                src={character.profileImage} 
                alt={character.name} 
                className="relative z-10 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" 
             />
             
             {/* Gradient overlay at bottom for text readability if needed */}
             <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gray-900 to-transparent z-20 md:hidden"></div>
        </div>
        
        {/* Right Side: Information (Scrollable) */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full bg-gray-900/95 flex flex-col relative z-30">
          <div className="p-8 overflow-y-auto scrollbar-hide h-full">
            
            {/* Header Info */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <span className={`px-3 py-1 text-xs font-bold rounded-full bg-${character.themeColor}/20 text-${character.themeColor} border border-${character.themeColor}/50`}>
                  {character.role}
                </span>
                <span className="text-gray-500 text-xs tracking-widest uppercase">Animus Profile</span>
              </div>
              <h2 className="text-4xl font-serif font-bold text-white mb-1">{character.name}</h2>
              <p className="text-gray-400 italic flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gray-600"></span>
                {character.locationName}
              </p>
            </div>
            
            {/* Details Grid */}
            <div className="space-y-8">
               <div className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-colors">
                 <h3 className={`text-sm font-bold uppercase tracking-wider text-${character.themeColor} mb-3 flex items-center`}>
                   소개 (Description)
                 </h3>
                 <p className="text-gray-200 leading-relaxed text-lg font-light">
                   {character.description}
                 </p>
               </div>
               
               <div className="space-y-4">
                 <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                    <h3 className={`text-xs font-bold uppercase tracking-wider text-gray-500 mb-2`}>
                      외관 (Appearance)
                    </h3>
                    <p className="text-gray-300">
                      {character.appearance}
                    </p>
                 </div>
                 
                 <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                    <h3 className={`text-xs font-bold uppercase tracking-wider text-gray-500 mb-2`}>
                      성격 (Personality)
                    </h3>
                    <p className="text-gray-300">
                      {character.personality}
                    </p>
                 </div>

                 <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                    <h3 className={`text-xs font-bold uppercase tracking-wider text-gray-500 mb-2`}>
                       말투 (Speech Style)
                    </h3>
                    <p className="text-gray-300">
                      {character.speechStyle}
                    </p>
                 </div>
               </div>
            </div>

            {/* Quote decoration */}
            <div className="mt-8 pt-8 border-t border-gray-800 text-center opacity-50">
                <p className="font-serif italic text-gray-500">"Cogito, ergo sum."</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;