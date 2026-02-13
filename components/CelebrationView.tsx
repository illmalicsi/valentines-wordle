
import React from 'react';

interface CelebrationViewProps {
  onReset: () => void;
}

export const CelebrationView: React.FC<CelebrationViewProps> = ({ onReset }) => {
  // NOTE: Replace this placeholder URL with your actual Google Form or invitation link
  const INVITATION_URL = "https://forms.gle/RXj4wwr5QpSvD5ZAA";

  return (
    <div className="flex flex-col items-center justify-center text-center p-4 space-y-4 animate-fadeIn max-w-xl mx-auto relative">
      <div className="relative group">
        <div className="text-6xl sm:text-8xl animate-bounce">💍</div>
        <div className="absolute -bottom-1 -right-1 text-2xl animate-pulse">🌸</div>
        <div className="absolute -top-3 -left-3 text-xl animate-spin-slow">✨</div>
      </div>
      
      <div className="space-y-3">
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

        <div className="pt-6 flex flex-col items-center gap-4">
          <a 
            href={INVITATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-white transition-all duration-500 bg-gradient-to-r from-rose-400 to-rose-600 rounded-full hover:from-rose-500 hover:to-rose-700 hover:scale-105 active:scale-95 shadow-[0_15px_30px_-10px_rgba(244,63,94,0.4)] animate-float-soft overflow-hidden"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-[-25deg] -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
            
            <span className="relative flex items-center gap-3 text-xs sm:text-sm uppercase tracking-[0.2em]">
              Click this to accept invitation
              <span className="text-xl group-hover:scale-125 transition-transform inline-block">❤️</span>
            </span>
            
            <div className="absolute inset-0 rounded-full border-2 border-white/30 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </a>
          <p className="text-[10px] text-rose-300 italic opacity-60">Opens in a new tab</p>
        </div>
      </div>

      <div className="flex justify-center items-center space-x-3 py-2 mt-2">
        <div className="p-2 bg-white rounded-full shadow-sm hover:scale-110 transition-transform text-lg cursor-default">💖</div>
        <div className="p-2 bg-white rounded-full shadow-sm scale-110 border border-rose-100 hover:scale-125 transition-transform text-lg cursor-default">🥂</div>
        <div className="p-2 bg-white rounded-full shadow-sm hover:scale-110 transition-transform text-lg cursor-default">🎀</div>
      </div>

      <button 
        onClick={onReset}
        className="mt-6 text-rose-300 hover:text-rose-600 font-bold uppercase tracking-[0.2em] text-[8px] sm:text-[10px] transition-all border-b border-rose-100 pb-1 hover:tracking-[0.3em] transform-gpu hover:scale-110 active:scale-90 cursor-pointer"
      >
        Relive the Magic
      </button>
      
      <div className="fixed bottom-4 left-4 p-2 opacity-20 pointer-events-none animate-pulse">🌸</div>
      <div className="fixed bottom-4 right-4 p-2 opacity-20 pointer-events-none animate-pulse">🌸</div>
    </div>
  );
};
