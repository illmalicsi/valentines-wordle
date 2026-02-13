
import React from 'react';

interface ChoiceViewProps {
  onContinue: () => void;
  onGiveUp: () => void;
}

export const ChoiceView: React.FC<ChoiceViewProps> = ({ onContinue, onGiveUp }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 space-y-10 animate-fadeIn w-full max-w-sm mx-auto glass-card rounded-[3rem]">
      <div className="relative">
        <div className="text-6xl animate-bounce-short">✨</div>
        <div className="absolute -top-2 -right-2 text-2xl">🌹</div>
      </div>
      
      <div className="space-y-3">
        <h2 className="text-3xl font-romantic text-rose-600">A moment's pause</h2>
        <p className="text-rose-400 italic text-sm px-4">
          The magic is still hidden within the tiles. Shall we continue the dance?
        </p>
      </div>
      
      <div className="flex flex-col w-full gap-4">
        <button
          onClick={onContinue}
          className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-5 rounded-3xl shadow-xl shadow-rose-100 transform transition-all active:scale-95 text-lg"
        >
          Keep Guessing ✨
        </button>
        
        <button
          onClick={onGiveUp}
          className="w-full bg-white hover:bg-rose-50 text-rose-300 font-semibold py-4 rounded-3xl border border-rose-50 transition-all text-sm uppercase tracking-widest"
        >
          I'm ready to see...
        </button>
      </div>
    </div>
  );
};
