
import React from 'react';

interface ChoiceViewProps {
  onContinue: () => void;
  onGiveUp: () => void;
}

export const ChoiceView: React.FC<ChoiceViewProps> = ({ onContinue, onGiveUp }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-6 sm:p-10 space-y-8 animate-fadeIn w-full max-w-sm mx-auto glass-card rounded-[2.5rem] relative overflow-hidden">
      {/* Decorative SVGs */}
      <svg className="absolute -top-4 -left-4 w-24 h-24 text-rose-100 fill-current opacity-40" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" fill="none" />
        <path d="M50 10 L 50 90 M 10 50 L 90 50" stroke="currentColor" strokeWidth="0.5" />
      </svg>
      
      <div className="relative">
        <div className="text-5xl animate-bounce-short">🌸</div>
        <div className="absolute -top-1 -right-1 text-xl animate-spin-slow">✨</div>
      </div>
      
      <div className="space-y-3 z-10">
        <h2 className="text-2xl sm:text-3xl font-romantic text-rose-700">A Petal's Pause</h2>
        <p className="text-rose-400 italic text-xs sm:text-sm px-2 leading-relaxed">
          The heart's secret is nearly revealed. Shall we finish this lovely dance?
        </p>
      </div>
      
      <div className="flex flex-col w-full gap-3 z-10">
        <button
          onClick={onContinue}
          className="w-full bg-gradient-to-br from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-rose-200 transform transition-all active:scale-95 text-base sm:text-lg"
        >
          Keep Guessing ✨
        </button>
        
        <button
          onClick={onGiveUp}
          className="w-full bg-white hover:bg-rose-50 text-rose-300 font-semibold py-3 rounded-2xl border border-rose-100 transition-all text-xs uppercase tracking-widest"
        >
          I'm ready to see...
        </button>
      </div>
      
      <div className="flex justify-center gap-1 opacity-20">
        <span>🌸</span><span>🌸</span><span>🌸</span>
      </div>
    </div>
  );
};
