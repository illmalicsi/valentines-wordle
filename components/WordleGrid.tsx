
import React from 'react';
import { LetterStatus } from '../types';

interface WordleGridProps {
  guesses: string[];
  currentGuess?: string;
  targetWord?: string;
  maxAttempts?: number;
  isMessageMode?: boolean;
}

export const WordleGrid: React.FC<WordleGridProps> = ({ 
  guesses, 
  currentGuess = '', 
  targetWord = '', 
  maxAttempts = 6,
  isMessageMode = false
}) => {
  const rows = Array.from({ length: maxAttempts });

  return (
    <div className="flex flex-col gap-1 sm:gap-1.5 w-full max-w-[260px] sm:max-w-[320px] mx-auto">
      {rows.map((_, i) => (
        <Row 
          key={i} 
          guess={guesses[i] || (i === guesses.length && !isMessageMode ? currentGuess : '')} 
          isFinal={isMessageMode || i < guesses.length}
          targetWord={targetWord}
          isMessageMode={isMessageMode}
          isActiveRow={i === guesses.length && !isMessageMode}
        />
      ))}
    </div>
  );
};

const Row: React.FC<{ 
  guess: string; 
  isFinal: boolean; 
  targetWord: string;
  isMessageMode: boolean;
  isActiveRow: boolean;
}> = ({ guess, isFinal, targetWord, isMessageMode, isActiveRow }) => {
  const cells = Array.from({ length: 5 });

  return (
    <div className="grid grid-cols-5 gap-1 sm:gap-1.5 w-full">
      {cells.map((_, i) => {
        let status: LetterStatus = 'empty';
        const char = guess[i] || '';

        if (isMessageMode && char && char !== ' ') {
          status = 'correct';
        } else if (isFinal && char) {
          if (char === targetWord[i]) status = 'correct';
          else if (targetWord.includes(char)) status = 'present';
          else status = 'absent';
        }

        return (
          <Cell 
            key={i} 
            index={i}
            char={char} 
            status={status} 
            isFinal={isFinal}
            isMessageMode={isMessageMode} 
            isCurrentCell={isActiveRow && i === guess.length} 
          />
        );
      })}
    </div>
  );
};

const Cell: React.FC<{ 
  char: string; 
  status: LetterStatus; 
  index: number;
  isFinal: boolean;
  isMessageMode?: boolean; 
  isCurrentCell?: boolean 
}> = ({ char, status, index, isFinal, isMessageMode, isCurrentCell }) => {
  let style = "bg-transparent border-rose-200 text-rose-900";
  
  if (isMessageMode) {
    if (char && char !== ' ') {
      style = "bg-rose-600 border-rose-600 text-white shadow-[0_0_15px_rgba(225,29,72,0.3)] scale-105";
    } else {
      style = "opacity-0";
    }
  } else if (status === 'correct') {
    style = "bg-emerald-600 border-emerald-600 text-white shadow-sm";
  } else if (status === 'present') {
    style = "bg-amber-400 border-amber-400 text-white shadow-sm";
  } else if (status === 'absent') {
    style = "bg-rose-100 border-rose-100 text-rose-300";
  } else if (char) {
    style = "bg-white border-rose-400 text-rose-900 animate-pop shadow-inner";
  } else if (isCurrentCell) {
    style = "bg-white border-rose-500 ring-4 ring-rose-100/50 shadow-[0_0_15px_rgba(225,29,72,0.15)] animate-pulse";
  }

  // Stagger the reveal transition to match sound timing
  const transitionDelay = isFinal && !isMessageMode ? `${index * 200 + 300}ms` : '0ms';

  return (
    <div 
      style={{ transitionDelay }}
      className={`aspect-square w-full border-2 rounded-lg flex items-center justify-center font-bold text-base sm:text-2xl transition-all duration-300 transform-gpu ${style} select-none uppercase`}
    >
      {char}
    </div>
  );
};
