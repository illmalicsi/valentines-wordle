
import React from 'react';

interface ChoiceViewProps {
  onContinue: () => void;
  onGiveUp: () => void;
}

export const ChoiceView: React.FC<ChoiceViewProps> = ({ onContinue, onGiveUp }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-6 space-y-6 animate-fadeIn w-full max-w-sm glass-card rounded-[2.5rem] border border-white/20 shadow-2xl backdrop-blur-xl">
      <div className="text-5xl animate-bounce-short">🌹</div>
      
      <div className="space-y-2">
        <h2 className="text-2xl font-romantic text-rose-800 tracking-tight">A Moment's Pause</h2>
        <p className="text-rose-400 italic text-sm leading-relaxed px-2">
          The heart's secret remains hidden. Would you like to try again or reveal the truth?
        </p>
      </div>
      
      <div className="flex flex-col w-full gap-3 px-4 pb-2">
        <button
          onClick={onContinue}
          className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-4 rounded-2xl shadow-lg transition-all transform-gpu hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-base uppercase tracking-wider"
        >
          Try Again 💫
        </button>
        
        <button
          onClick={onGiveUp}
          className="w-full text-rose-400 hover:text-rose-600 font-bold py-2 text-xs uppercase tracking-[0.2em] transition-all transform-gpu hover:scale-[1.05] active:scale-[0.95] cursor-pointer"
        >
          Reveal the secret
        </button>
      </div>
    </div>
  );
};
