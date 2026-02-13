
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
    <div className={`w-full space-y-2 px-1 max-w-lg mx-auto stable-transform ${disabled ? 'opacity-30 pointer-events-none' : ''}`}>
      {KEYBOARD_ROWS.map((row, i) => (
        <div key={i} className="flex justify-center gap-1.5 sm:gap-2">
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
  let style = "bg-white text-rose-700 border-rose-100";
  let width = "flex-1";
  
  if (label === 'ENTER' || label === 'BACKSPACE') {
    width = "px-4 sm:px-6 flex-initial";
    style = "bg-rose-50 text-rose-500 border-rose-200 text-[10px] sm:text-xs";
  }

  if (isHighlighted) {
    style = "bg-rose-500 text-white border-rose-600 shadow-md scale-105";
  } else if (status === 'correct') {
    style = "bg-rose-500 text-white border-rose-600";
  } else if (status === 'present') {
    style = "bg-amber-100 text-amber-700 border-amber-200";
  } else if (status === 'absent') {
    style = "bg-slate-50 text-slate-300 border-slate-100";
  }

  return (
    <button
      onClick={onClick}
      className={`h-12 sm:h-14 rounded-2xl font-bold flex items-center justify-center border transition-all active:scale-90 hover:brightness-95 shadow-sm transform-gpu ${width} ${style} stable-transform uppercase`}
    >
      {label === 'BACKSPACE' ? '⌫' : label}
    </button>
  );
};
