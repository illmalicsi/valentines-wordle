
import React from 'react';
import { KEYBOARD_ROWS } from '../constants';
import { LetterStatus } from '../types';

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  guesses: string[];
  targetWord: string;
  disabled?: boolean;
  highlightedKeys?: string[];
}

export const Keyboard: React.FC<KeyboardProps> = ({ 
  onKeyPress, 
  guesses, 
  targetWord, 
  disabled = false,
  highlightedKeys = []
}) => {
  const getStatus = (char: string): LetterStatus => {
    if (highlightedKeys.includes(char)) return 'correct';
    
    let bestStatus: LetterStatus = 'empty';
    guesses.forEach(guess => {
      for (let i = 0; i < guess.length; i++) {
        if (guess[i] === char) {
          if (targetWord[i] === char) bestStatus = 'correct';
          else if (targetWord.includes(char) && bestStatus !== 'correct') bestStatus = 'present';
          else if (bestStatus === 'empty') bestStatus = 'absent';
        }
      }
    });
    return bestStatus;
  };

  return (
    <div className={`w-full space-y-1 px-0.5 max-w-lg mx-auto stable-transform ${disabled ? 'opacity-30 pointer-events-none' : ''}`}>
      {KEYBOARD_ROWS.map((row, i) => (
        <div key={i} className={`flex justify-center gap-0.5 sm:gap-1`}>
          {row.map(key => (
            <Key 
              key={key} 
              label={key} 
              status={getStatus(key)} 
              onClick={() => onKeyPress(key)} 
              isHighlighted={highlightedKeys.includes(key)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

const Key: React.FC<{ label: string; status: LetterStatus; onClick: () => void; isHighlighted?: boolean }> = ({ 
  label, 
  status, 
  onClick,
  isHighlighted = false
}) => {
  let style = "bg-rose-100 text-rose-900 border-transparent shadow-sm";
  let width = "flex-1 min-w-0";
  
  if (label === 'ENTER' || label === 'BACKSPACE') {
    width = "px-1 sm:px-4 flex-initial min-w-[45px] sm:min-w-[70px]";
    style = "bg-rose-200 text-rose-800 text-[8px] sm:text-[10px] font-bold";
  }

  if (status === 'correct') {
    // Correct keys use emerald green to match standard Wordle
    style = "bg-emerald-600 text-white shadow-md";
    if (isHighlighted) {
      // Guide the user with a special ring for the 'YES' keys
      style += " animate-pulse border-white/40 ring-2 ring-rose-400/50";
    }
  } else if (status === 'present') {
    style = "bg-amber-400 text-white shadow-md";
  } else if (status === 'absent') {
    style = "bg-rose-50 text-rose-200 opacity-60 shadow-none";
  }

  return (
    <button
      onClick={onClick}
      className={`h-11 sm:h-12 rounded font-bold flex items-center justify-center transition-all duration-150 transform-gpu hover:scale-[1.03] hover:brightness-105 active:scale-95 active:brightness-90 ${width} ${style} stable-transform uppercase select-none cursor-pointer`}
    >
      {label === 'BACKSPACE' ? (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z" />
        </svg>
      ) : label === 'ENTER' ? (
        <span className="sm:inline hidden">Enter</span>
      ) : label === 'ENTER' ? (
        <span className="sm:hidden inline">↵</span>
      ) : label}
    </button>
  );
};
