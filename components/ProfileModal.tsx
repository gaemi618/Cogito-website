import React from 'react';
import { AnimusCharacter } from '../types';
import { X, Sparkles } from 'lucide-react';

interface ProfileModalProps {
  character: AnimusCharacter;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ character, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>
      
      <div className="relative w-full max-w-2xl bg-gray-900 border border-gray-700 rounded-3xl overflow-hidden shadow-2xl transform transition-all animate-fade-in">
        {/* Header Background */}
        <div className="h-32 w-full relative overflow-hidden">
             <img src={character.locationImage} alt="Background" className="w-full h-full object-cover opacity-40 blur-sm" />
             <div className={`absolute inset-0 bg-gradient-to-r ${character.bgGradient} opacity-30 mix-blend-overlay`}></div>
        </div>
        
        {/* Content */}
        <div className="relative -mt-16 px-8 pb-8">
          <div className="flex justify-between items-end">
             {/* Character Portrait */}
             <div className={`w-32 h-32 rounded-3xl bg-gray-800 border-4 border-gray-900 shadow-xl flex items-center justify-center overflow-hidden relative`}>
                <img 
                    src={character.profileImage} 
                    alt={character.name} 
                    className="w-full h-full object-cover" 
                />
             </div>
             
             {/* Close Button */}
             <button 
                onClick={onClose}
                className="mb-8 p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors border border-gray-700"
             >
               <X size={24} />
             </button>
          </div>
          
          <div className="mt-6">
            <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
              <h2 className="text-3xl font-serif font-bold text-white">{character.name}</h2>
              <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full bg-${character.themeColor}/20 text-${character.themeColor} border border-${character.themeColor}/50 w-fit`}>
                {character.role}
              </span>
            </div>
            <p className="text-gray-400 italic mb-6 text-sm">{character.locationName}</p>
            
            <div className="space-y-6 h-64 overflow-y-auto scrollbar-hide">
               <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                 <h3 className={`text-sm font-bold uppercase tracking-wider text-${character.themeColor} mb-2`}>
                   소개 (Description)
                 </h3>
                 <p className="text-gray-300 leading-relaxed">
                   {character.description}
                 </p>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                    <h3 className={`text-sm font-bold uppercase tracking-wider text-${character.themeColor} mb-2`}>
                      외관 (Appearance)
                    </h3>
                    <p className="text-gray-300 text-sm">
                      {character.appearance}
                    </p>
                 </div>
                 
                 <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                    <h3 className={`text-sm font-bold uppercase tracking-wider text-${character.themeColor} mb-2`}>
                      성격 (Personality)
                    </h3>
                    <p className="text-gray-300 text-sm">
                      {character.personality}
                    </p>
                 </div>
               </div>

               <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                 <h3 className={`text-sm font-bold uppercase tracking-wider text-${character.themeColor} mb-2`}>
                   말투 (Speech Style)
                 </h3>
                 <p className="text-gray-300 text-sm">
                   {character.speechStyle}
                 </p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;