
import React, { useState, useEffect } from 'react';
import { Keyboard } from './Keyboard';

interface ProposalViewProps {
  onAccepted: () => void;
  guesses: string[];
  targetWord: string;
}

export const ProposalView: React.FC<ProposalViewProps> = ({ onAccepted, guesses, targetWord }) => {
  const [systemMessage, setSystemMessage] = useState<string | null>(null);
  const [showPrettyPlease, setShowPrettyPlease] = useState(false);
  const [response, setResponse] = useState('');
  
  const REQUIRED = 'YES';

  const onKeyboardPress = (key: string) => {
    setSystemMessage(null);
    setShowPrettyPlease(false);

    if (key === 'ENTER') {
      if (response === REQUIRED) onAccepted();
      else setSystemMessage('The answer is already there. ✨');
      return;
    }
    
    if (key === 'BACKSPACE') {
      if (response.length > 0) setResponse(prev => prev.slice(0, -1));
      return;
    }

    if (/^[A-Z]$/.test(key)) {
      if (response.length < 3) {
        const nextResponse = response + key;
        setResponse(nextResponse);
        if (key === 'N') setShowPrettyPlease(true);
        else if (key !== REQUIRED[response.length]) setSystemMessage('The answer is already there. ✨');
      } else {
        setSystemMessage('The answer is already there. ✨');
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      if (key === 'ENTER') onKeyboardPress('ENTER');
      else if (key === 'BACKSPACE') onKeyboardPress('BACKSPACE');
      else if (/^[a-zA-Z]$/.test(key)) onKeyboardPress(key);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [response]);

  return (
    <div className="flex flex-col items-center justify-center text-center animate-fadeIn w-full space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl sm:text-6xl font-romantic text-rose-600 drop-shadow-sm leading-tight px-6">
          Will you be my Valentine?
        </h1>
        <p className="text-rose-300 font-script text-2xl">One final answer...</p>
      </div>

      <div className="flex gap-4 sm:gap-6 justify-center">
        {[0, 1, 2].map((i) => (
          <div 
            key={i} 
            className={`w-16 h-16 sm:w-24 sm:h-24 border-3 rounded-2xl flex items-center justify-center text-4xl sm:text-6xl font-bold shadow-lg transition-all duration-500 ${
              response[i] 
                ? 'border-rose-500 bg-rose-500 text-white scale-110 shadow-rose-200' 
                : 'border-rose-100 bg-white/50 text-rose-800 animate-pulse'
            }`}
          >
            {response[i] || ''}
          </div>
        ))}
      </div>

      <div className="h-10 flex items-center justify-center">
        {showPrettyPlease ? (
          <div className="bg-rose-50 border border-rose-100 px-4 py-2 rounded-2xl shadow-sm italic text-rose-500 font-bold text-sm animate-bounce">
            Please? Pretty please with a cherry on top? 🥺🍒
          </div>
        ) : systemMessage ? (
          <p className="text-rose-400 font-bold tracking-widest text-xs uppercase animate-pulse">
            {systemMessage}
          </p>
        ) : null}
      </div>

      <div className="w-full max-w-md bg-white/30 p-6 rounded-[2rem] backdrop-blur-sm border border-white/50">
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
