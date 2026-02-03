import React from 'react';

const StarBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 animate-pulse"></div>
      <div className="absolute w-full h-full bg-gradient-to-b from-transparent to-black opacity-80"></div>
    </div>
  );
};

export default StarBackground;