
import React from 'react';

interface HowToPlayProps {
  onClose: () => void;
}

export const HowToPlay: React.FC<HowToPlayProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rose-900/10 backdrop-blur-sm animate-fadeIn">
      {/* Reduced max-width and padding to make the modal smaller */}
      <div className="w-full max-w-[340px] bg-white/95 backdrop-blur-xl rounded-[2rem] p-5 sm:p-7 shadow-[0_15px_40px_rgba(159,18,57,0.12)] relative border border-white animate-float-soft">
        
        {/* Close button - adjusted position and size */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-rose-300 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
        </button>

        <h2 className="text-2xl font-romantic text-rose-800 text-center mb-1">How to play</h2>
        <p className="text-slate-600 text-center text-xs sm:text-sm leading-relaxed mb-6 px-1 font-medium">
          Solve this puzzle to discover Maru's gift! <br/>
          <span className="text-rose-400">Tiles will light up to guide you.</span>
        </p>
        
        {/* Reduced spacing between examples */}
        <div className="space-y-5">
          {/* Example 1: IVAN (I Correct) - 4 Boxes */}
          <div className="space-y-2">
            <div className="flex justify-center gap-1.5">
              <ExampleCell char="I" status="correct" />
              <ExampleCell char="V" />
              <ExampleCell char="A" />
              <ExampleCell char="N" />
            </div>
            <p className="text-slate-500 text-center text-[11px] sm:text-xs font-medium">
              The letter <strong className="text-rose-700">I</strong> is in the correct spot.
            </p>
          </div>

          {/* Example 2: LOVES (V Present) - 5 Boxes */}
          <div className="space-y-2">
            <div className="flex justify-center gap-1.5">
              <ExampleCell char="L" />
              <ExampleCell char="O" />
              <ExampleCell char="V" status="present" />
              <ExampleCell char="E" />
              <ExampleCell char="S" />
            </div>
            <p className="text-slate-500 text-center text-[11px] sm:text-xs font-medium">
              The letter <strong className="text-rose-700">V</strong> is in the wrong spot.
            </p>
          </div>

          {/* Example 3: MARU (U Absent) - 4 Boxes */}
          <div className="space-y-2">
            <div className="flex justify-center gap-1.5">
              <ExampleCell char="M" />
              <ExampleCell char="A" />
              <ExampleCell char="R" />
              <ExampleCell char="U" status="absent" />
            </div>
            <p className="text-slate-500 text-center text-[11px] sm:text-xs font-medium">
              The letter <strong className="text-rose-700">U</strong> is not in the word.
            </p>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="mt-8 w-full bg-rose-600 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-rose-700 transition-all transform active:scale-95 cursor-pointer uppercase tracking-widest text-xs"
        >
          Start Playing ❤️
        </button>
      </div>
    </div>
  );
};

const ExampleCell: React.FC<{ char: string; status?: 'correct' | 'present' | 'absent' }> = ({ char, status }) => {
  let style = "bg-white border-rose-100 text-rose-900";
  
  if (status === 'correct') {
    style = "bg-[#2ab859] border-[#2ab859] text-white shadow-sm";
  } else if (status === 'present') {
    style = "bg-[#f3b400] border-[#f3b400] text-white shadow-sm";
  } else if (status === 'absent') {
    style = "bg-rose-50 border-rose-50 text-rose-300";
  } else if (char && char !== ' ') {
    style = "bg-white border-rose-300 text-rose-900";
  }

  return (
    <div className={`w-10 h-10 sm:w-11 sm:h-11 border-2 rounded-lg flex items-center justify-center font-bold text-xl sm:text-2xl transition-all duration-300 select-none ${style}`}>
      {char}
    </div>
  );
};
