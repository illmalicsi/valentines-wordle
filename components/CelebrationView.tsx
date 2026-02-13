
import React from 'react';

interface CelebrationViewProps {
  onReset: () => void;
}

export const CelebrationView: React.FC<CelebrationViewProps> = ({ onReset }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-6 space-y-8 animate-fadeIn max-w-xl mx-auto relative">
      <div className="relative group">
        <div className="text-7xl sm:text-8xl animate-bounce">💍</div>
        <div className="absolute -bottom-2 -right-2 text-3xl animate-pulse">🌸</div>
        <div className="absolute -top-4 -left-4 text-2xl animate-spin-slow">✨</div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-center gap-4 opacity-50 mb-2">
           <div className="h-px w-8 bg-rose-200"></div>
           <span className="text-rose-300 text-sm">🌹</span>
           <div className="h-px w-8 bg-rose-200"></div>
        </div>
        
        <h2 className="text-5xl sm:text-7xl font-romantic text-rose-600 leading-none">
          Always.
        </h2>
        <p className="text-lg sm:text-xl text-rose-400 font-script leading-relaxed px-4 max-w-xs mx-auto">
          You've turned a simple game into a memory I'll cherish forever. 🌹
        </p>
      </div>

      <div className="flex justify-center items-center space-x-4 py-2">
        <div className="p-2 bg-white rounded-full shadow-sm">💖</div>
        <div className="p-2 bg-white rounded-full shadow-sm scale-110 border border-rose-100">🥂</div>
        <div className="p-2 bg-white rounded-full shadow-sm">🎀</div>
      </div>

      <button 
        onClick={onReset}
        className="mt-8 text-rose-300 hover:text-rose-500 font-bold uppercase tracking-[0.3em] text-[8px] sm:text-[10px] transition-all border-b border-rose-100 pb-1 hover:tracking-[0.4em]"
      >
        Relive the Magic
      </button>
      
      <div className="fixed bottom-0 left-0 p-4 opacity-20 pointer-events-none">🌸</div>
      <div className="fixed bottom-0 right-0 p-4 opacity-20 pointer-events-none">🌸</div>
    </div>
  );
};
