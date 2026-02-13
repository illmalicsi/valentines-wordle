
import React, { useState, useEffect, useCallback } from 'react';
import { Keyboard } from './Keyboard';

interface ProposalViewProps {
  onAccepted: () => void;
  guesses: string[];
  targetWord: string;
  onSoundRequest: (type: any) => void;
}

export const ProposalView: React.FC<ProposalViewProps> = ({ onAccepted, guesses, targetWord, onSoundRequest }) => {
  const [systemMessage, setSystemMessage] = useState<string | null>(null);
  const [showPrettyPlease, setShowPrettyPlease] = useState(false);
  const [response, setResponse] = useState('');
  
  const REQUIRED = 'YES';

  const onKeyboardPress = useCallback((key: string) => {
    setSystemMessage(null);
    setShowPrettyPlease(false);

    if (key === 'ENTER') {
      if (response === REQUIRED) {
        onAccepted();
      } else if (response.length > 0) {
        onSoundRequest('present');
        setSystemMessage('The answer is already there. ✨');
      }
      return;
    }
    
    if (key === 'BACKSPACE') {
      if (response.length > 0) {
        onSoundRequest('back');
        setResponse(prev => prev.slice(0, -1));
      }
      return;
    }

    if (/^[A-Z]$/.test(key)) {
      if (response.length < 3) {
        const char = key.toUpperCase();
        const nextResponse = response + char;
        onSoundRequest('tap');
        setResponse(nextResponse);
        
        if (char === 'N') setShowPrettyPlease(true);
        else if (char !== REQUIRED[response.length]) setSystemMessage('The answer is already there. ✨');

        if (nextResponse.length === 3) {
          if (nextResponse === REQUIRED) {
            setTimeout(onAccepted, 400);
          } else {
            onSoundRequest('present');
            setSystemMessage('The answer is already there. ✨');
          }
        }
      } else {
        onSoundRequest('present');
        setSystemMessage('The answer is already there. ✨');
      }
    }
  }, [response, onAccepted, onSoundRequest]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      if (key === 'ENTER') onKeyboardPress('ENTER');
      else if (key === 'Backspace') onKeyboardPress('BACKSPACE');
      else if (/^[a-zA-Z]$/.test(key)) onKeyboardPress(key);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onKeyboardPress]);

  return (
    <div className="flex flex-col items-center justify-center text-center animate-fadeIn w-full space-y-3 sm:space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-5xl font-romantic text-rose-600 px-4 leading-tight">
          Will you be my Valentine?
        </h1>
        <p className="text-rose-300 font-script text-base sm:text-2xl">One final answer...</p>
      </div>

      <div className="flex gap-2 sm:gap-4 justify-center">
        {[0, 1, 2].map((i) => (
          <div 
            key={i} 
            className={`w-12 h-12 sm:w-20 sm:h-20 border-2 rounded-xl flex items-center justify-center text-2xl sm:text-5xl font-bold transition-all duration-300 ${
              response[i] 
                ? 'border-rose-500 bg-rose-500 text-white scale-105 shadow-md shadow-rose-100' 
                : 'border-rose-100 bg-white/50 text-rose-800 animate-pulse'
            }`}
          >
            {response[i] || ''}
          </div>
        ))}
      </div>

      <div className="h-6 flex items-center justify-center">
        {showPrettyPlease ? (
          <div className="bg-rose-50 border border-rose-100 px-3 py-0.5 rounded-full text-rose-500 font-bold text-[9px] sm:text-xs animate-bounce">
            Please? 🥺🍒
          </div>
        ) : systemMessage ? (
          <p className="text-rose-400 font-bold tracking-widest text-[9px] uppercase">
            {systemMessage}
          </p>
        ) : null}
      </div>

      <div className="w-full max-w-sm glass-card p-2 sm:p-4 rounded-3xl">
        <Keyboard 
          onKeyPress={onKeyboardPress} 
          guesses={[]} 
          targetWord={targetWord} 
          highlightedKeys={['Y', 'E', 'S']}
        />
      </div>
    </div>
  );
};
