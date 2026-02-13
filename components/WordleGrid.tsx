
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
    <div className={`flex flex-col gap-1.5 sm:gap-2.5 stable-transform w-full ${isMessageMode ? 'items-center' : ''}`}>
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
    <div className="flex gap-1.5 sm:gap-2.5 justify-center w-full">
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
      style = "bg-rose-500 border-rose-600 text-white shadow-sm scale-105";
    } else {
      style = "bg-transparent border-transparent opacity-0";
    }
  } else if (status === 'correct') {
    style = "bg-rose-500 border-rose-600 text-white";
  } else if (status === 'present') {
    style = "bg-amber-100 border-amber-300 text-amber-800";
  } else if (status === 'absent') {
    style = "bg-slate-50 border-slate-200 text-slate-300 opacity-50";
  } else if (char) {
    style = "bg-white border-rose-300 text-rose-900 animate-pop border-2";
  }

  return (
    <div className={`w-11 h-11 sm:w-14 sm:h-14 border rounded-lg sm:rounded-xl flex items-center justify-center font-bold text-lg sm:text-2xl transition-all duration-300 transform-gpu ${style} stable-transform flex-shrink-0 aspect-square select-none uppercase`}>
      {char}
    </div>
  );
};
