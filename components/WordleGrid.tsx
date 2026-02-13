
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
    <div className={`flex flex-col gap-2 sm:gap-3 stable-transform w-full ${isMessageMode ? 'items-center' : ''}`}>
      {rows.map((_, i) => (
        <Row 
          key={i} 
          guess={guesses[i] || (i === guesses.length && !isMessageMode ? currentGuess : '')} 
          isFinal={isMessageMode || i < guesses.length}
          targetWord={targetWord}
          isMessageMode={isMessageMode}
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
}> = ({ guess, isFinal, targetWord, isMessageMode }) => {
  const cells = Array.from({ length: 5 });

  return (
    <div className="flex gap-2 sm:gap-3 justify-center w-full">
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

        return <Cell key={i} char={char} status={status} isMessageMode={isMessageMode} />;
      })}
    </div>
  );
};

const Cell: React.FC<{ char: string; status: LetterStatus; isMessageMode?: boolean }> = ({ char, status, isMessageMode }) => {
  let style = "bg-white border-rose-100 text-rose-800";
  
  if (isMessageMode) {
    if (char && char !== ' ') {
      style = "bg-rose-500 border-rose-600 text-white shadow-lg shadow-rose-200/50 scale-110";
    } else {
      style = "bg-transparent border-transparent opacity-0";
    }
  } else if (status === 'correct') {
    style = "bg-rose-500 border-rose-600 text-white shadow-inner";
  } else if (status === 'present') {
    style = "bg-amber-100 border-amber-300 text-amber-800";
  } else if (status === 'absent') {
    style = "bg-slate-100 border-slate-200 text-slate-400 opacity-60";
  } else if (char) {
    style = "bg-white border-rose-300 text-rose-900 animate-pop border-2";
  }

  return (
    <div className={`w-12 h-12 sm:w-14 sm:h-14 border-2 rounded-xl flex items-center justify-center font-bold text-xl sm:text-2xl transition-all duration-500 transform-gpu ${style} stable-transform flex-shrink-0 aspect-square select-none uppercase`}>
      {char}
    </div>
  );
};
