
import React from 'react';

interface CelebrationViewProps {
  onReset: () => void;
}

export const CelebrationView: React.FC<CelebrationViewProps> = ({ onReset }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-12 space-y-10 animate-fadeIn max-w-xl mx-auto">
      <div className="relative">
        <div className="text-8xl sm:text-9xl animate-bounce">💍</div>
        <div className="absolute -bottom-4 -right-4 text-4xl animate-pulse">✨</div>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-6xl sm:text-8xl font-romantic text-rose-600 leading-none">
          Always.
        </h2>
        <p className="text-xl sm:text-2xl text-rose-400 font-script leading-relaxed px-6">
          You've made this the most magical day of all. I'm yours, now and forever. 🌹
        </p>
      </div>

      <div className="flex space-x-6 py-4">
        <span className="text-4xl animate-pulse delay-75">💖</span>
        <span className="text-4xl animate-pulse delay-150">🥂</span>
        <span className="text-4xl animate-pulse delay-300">🎀</span>
      </div>

      <button 
        onClick={onReset}
        className="mt-12 text-rose-300 hover:text-rose-500 font-bold uppercase tracking-widest text-[10px] sm:text-xs transition-colors border-b border-rose-100 pb-1"
      >
        Relive the Magic
      </button>
    </div>
  );
};
