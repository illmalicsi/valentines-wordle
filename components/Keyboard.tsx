
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
    if (highlightedKeys.length > 0) {
      return highlightedKeys.includes(char) ? 'correct' : 'empty';
    }
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
    <div className={`w-full space-y-1.5 sm:space-y-2 px-0.5 max-w-md mx-auto stable-transform ${disabled ? 'opacity-30 pointer-events-none' : ''}`}>
      {KEYBOARD_ROWS.map((row, i) => (
        <div key={i} className="flex justify-center gap-1 sm:gap-1.5">
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
  let style = "bg-white text-rose-700 border-rose-50 shadow-sm";
  let width = "flex-1 min-w-0";
  
  if (label === 'ENTER' || label === 'BACKSPACE') {
    width = "px-2 sm:px-4 flex-initial";
    style = "bg-rose-50 text-rose-600 border-rose-100 text-[8px] sm:text-[10px]";
  }

  if (isHighlighted) {
    style = "bg-rose-500 text-white border-rose-600 shadow-md scale-105 z-10";
  } else if (status === 'correct') {
    style = "bg-rose-500 text-white border-rose-600";
  } else if (status === 'present') {
    style = "bg-amber-100 text-amber-700 border-amber-200";
  } else if (status === 'absent') {
    style = "bg-slate-100 text-slate-400 border-slate-100 opacity-60";
  }

  return (
    <button
      onClick={onClick}
      className={`h-11 sm:h-14 rounded-lg sm:rounded-xl font-bold flex items-center justify-center border transition-all active:scale-90 hover:brightness-95 transform-gpu ${width} ${style} stable-transform uppercase`}
    >
      {label === 'BACKSPACE' ? '⌫' : label}
    </button>
  );
};
