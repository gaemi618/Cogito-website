import React, { useState, useRef, useEffect } from 'react';
import { AnimusType, Message } from '../types';
import { CHARACTERS } from '../constants';
import { generateAnimusResponse } from '../services/geminiService';
import { ArrowLeft, Send, Sparkles } from 'lucide-react';
import ProfileModal from './ProfileModal';

interface ChatInterfaceProps {
  animusId: AnimusType;
  onBack: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ animusId, onBack }) => {
  const character = CHARACTERS[animusId];
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      role: 'model',
      text: character.greeting,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const responseText = await generateAnimusResponse(animusId, messages, userMsg.text);
      
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Dynamic Styles based on Character
  const containerStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(${character.locationImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black text-gray-100" style={containerStyle}>
      {/* Dynamic Overlay based on character theme for mood tinting */}
      <div className={`absolute inset-0 pointer-events-none opacity-20 bg-gradient-to-br ${character.bgGradient}`}></div>
      
      {/* Header */}
      <header className="relative z-10 flex items-center p-4 border-b border-white/10 glass-panel backdrop-blur-md h-24">
        <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white mr-2">
          <ArrowLeft size={24} />
        </button>
        
        {/* Clickable Header Profile Area */}
        <div 
          className="flex items-center cursor-pointer group hover:bg-white/5 p-2 rounded-xl transition-colors"
          onClick={() => setShowProfile(true)}
        >
          {/* Increased Avatar Size */}
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/30 mr-4 shadow-lg group-hover:border-purple-400 transition-colors">
              <img src={character.profileImage} alt={character.name} className="w-full h-full object-cover object-top" />
          </div>
          <div>
            <h1 className="text-xl font-serif font-bold text-white flex items-center gap-2">
                {character.name}
            </h1>
            <p className="text-xs text-gray-300 group-hover:text-purple-300 transition-colors">{character.locationName}</p>
          </div>
        </div>
      </header>

      {/* Messages Area */}
      <div className="relative z-10 flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'} items-end`}>
              {!isUser && (
                // Increased Chat Avatar Size
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center mr-3 border border-${character.themeColor} bg-black/50 overflow-hidden shrink-0 cursor-pointer hover:scale-105 transition-transform`}
                  onClick={() => setShowProfile(true)}
                >
                  <img src={character.profileImage} alt="Avatar" className="w-full h-full object-cover object-top" />
                </div>
              )}
              <div 
                className={`max-w-[75%] p-4 rounded-3xl whitespace-pre-wrap leading-relaxed shadow-lg text-sm md:text-base ${
                  isUser 
                    ? 'bg-purple-900/80 text-white rounded-br-none border border-purple-700/50 backdrop-blur-sm' 
                    : 'glass-panel text-gray-100 rounded-bl-none border-white/10'
                }`}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
        {isLoading && (
          <div className="flex justify-start items-center">
             <div className="w-12 h-12 rounded-full flex items-center justify-center mr-3 overflow-hidden shrink-0 opacity-70">
                <img src={character.profileImage} alt="Thinking" className="w-full h-full object-cover object-top grayscale" />
             </div>
             <div className="glass-panel p-3 rounded-2xl rounded-bl-none text-sm text-gray-400 animate-pulse flex items-center gap-2">
               <Sparkles size={14} className={`animate-spin text-${character.themeColor}`} />
               생각에 잠기는 중...
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="relative z-10 p-4 glass-panel border-t border-white/10">
        <form onSubmit={handleSendMessage} className="flex gap-2 max-w-4xl mx-auto">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="고민을 털어놓으세요..."
            className="flex-1 bg-black/40 border border-gray-600 rounded-full px-6 py-4 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder-gray-400 backdrop-blur-sm"
          />
          <button 
            type="submit"
            disabled={isLoading || !inputText.trim()}
            className="p-4 bg-white/10 hover:bg-white/20 rounded-full transition-colors disabled:opacity-50 text-white border border-white/10"
          >
            <Send size={20} />
          </button>
        </form>
      </div>

      {showProfile && (
        <ProfileModal 
          character={character} 
          onClose={() => setShowProfile(false)} 
        />
      )}
    </div>
  );
};

export default ChatInterface;