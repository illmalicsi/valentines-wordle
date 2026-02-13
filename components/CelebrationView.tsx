
import React from 'react';

interface CelebrationViewProps {
  onReset: () => void;
}

export const CelebrationView: React.FC<CelebrationViewProps> = ({ onReset }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-4 space-y-4 animate-fadeIn max-w-xl mx-auto relative">
      <div className="relative group">
        <div className="text-6xl sm:text-8xl animate-bounce">💍</div>
        <div className="absolute -bottom-1 -right-1 text-2xl animate-pulse">🌸</div>
        <div className="absolute -top-3 -left-3 text-xl animate-spin-slow">✨</div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-center gap-3 opacity-50 mb-1">
           <div className="h-px w-6 bg-rose-200"></div>
           <span className="text-rose-300 text-xs">🌹</span>
           <div className="h-px w-6 bg-rose-200"></div>
        </div>
        
        <h2 className="text-4xl sm:text-7xl font-romantic text-rose-600 leading-none">
          Always.
        </h2>
        <p className="text-base sm:text-xl text-rose-400 font-script leading-relaxed px-4 max-w-xs mx-auto">
          You've turned a simple game into a memory I'll cherish forever. 🌹
        </p>
      </div>

      <div className="flex justify-center items-center space-x-3 py-1">
        <div className="p-1.5 bg-white rounded-full shadow-sm hover:scale-110 transition-transform text-sm">💖</div>
        <div className="p-1.5 bg-white rounded-full shadow-sm scale-110 border border-rose-100 hover:scale-125 transition-transform text-sm">🥂</div>
        <div className="p-1.5 bg-white rounded-full shadow-sm hover:scale-110 transition-transform text-sm">🎀</div>
      </div>

      <button 
        onClick={onReset}
        className="mt-4 text-rose-300 hover:text-rose-600 font-bold uppercase tracking-[0.2em] text-[8px] sm:text-[10px] transition-all border-b border-rose-100 pb-1 hover:tracking-[0.3em] transform-gpu hover:scale-110 active:scale-90 cursor-pointer"
      >
        Relive the Magic
      </button>
      
      <div className="fixed bottom-0 left-0 p-2 opacity-20 pointer-events-none animate-pulse">🌸</div>
      <div className="fixed bottom-0 right-0 p-2 opacity-20 pointer-events-none animate-pulse">🌸</div>
    </div>
  );
};
