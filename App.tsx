
import React, { useState, useEffect, useCallback } from 'react';
import { WordleGrid } from './components/WordleGrid';
import { Keyboard } from './components/Keyboard';
import { ChoiceView } from './components/ChoiceView';
import { ProposalView } from './components/ProposalView';
import { CelebrationView } from './components/CelebrationView';
import { TARGET_WORD, MAX_ATTEMPTS, WORD_LENGTH, QUIT_PHRASES } from './constants';
import { AppStage } from './types';

const PROPOSAL_WORDS = ["WILL ", "YOU  ", "BE   ", "MY   ", "VALEN", "TINE?"];

const App: React.FC = () => {
  const [stage, setStage] = useState<AppStage>('playing');
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);
  const [animatingLettersCount, setAnimatingLettersCount] = useState(0);

  const triggerChoice = useCallback(() => setStage('choice'), []);

  const resetGame = useCallback(() => {
    setGuesses([]);
    setCurrentGuess('');
    setMessage(null);
    setAnimatingLettersCount(0);
    setStage('playing');
  }, []);

  const startProposalAnimation = () => {
    setStage('proposal-animating');
    let count = 0;
    const totalLetters = PROPOSAL_WORDS.join('').length;
    const interval = setInterval(() => {
      count++;
      setAnimatingLettersCount(count);
      if (count >= totalLetters) {
        clearInterval(interval);
        setTimeout(() => setStage('proposal-input'), 1000);
      }
    }, 60);
  };

  const onKeyPress = useCallback((key: string) => {
    if (stage !== 'playing') return;
    setMessage(null);

    if (key === 'ENTER') {
      const upperGuess = currentGuess.toUpperCase();
      if (QUIT_PHRASES.some(phrase => upperGuess.includes(phrase))) {
        triggerChoice();
        return;
      }
      if (currentGuess.length !== WORD_LENGTH) {
        setMessage('Too short, darling! 🌹');
        return;
      }
      const newGuesses = [...guesses, upperGuess];
      setGuesses(newGuesses);
      setCurrentGuess('');
      if (upperGuess === TARGET_WORD) {
        setTimeout(startProposalAnimation, 1200);
      } else if (newGuesses.length >= MAX_ATTEMPTS) {
        setTimeout(triggerChoice, 1200);
      }
    } else if (key === 'BACKSPACE') {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (/^[A-Z ]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess(prev => (prev + key).toUpperCase());
      }
    }
  }, [currentGuess, guesses, stage, triggerChoice]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (stage === 'playing') {
        if (e.key === 'Enter') onKeyPress('ENTER');
        else if (e.key === 'Backspace') onKeyPress('BACKSPACE');
        else if (/^[a-zA-Z ]$/.test(e.key)) onKeyPress(e.key.toUpperCase());
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onKeyPress, stage]);

  useEffect(() => {
    const container = document.getElementById('heart-container');
    if (!container) return;
    const createHeart = () => {
      const heart = document.createElement('div');
      heart.className = 'heart';
      heart.innerHTML = '❤️';
      heart.style.left = Math.random() * 100 + 'vw';
      heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
      heart.style.animationDuration = (Math.random() * 4 + 8) + 's';
      heart.style.opacity = (Math.random() * 0.5 + 0.2).toString();
      container.appendChild(heart);
      setTimeout(() => heart.remove(), 12000);
    };
    const interval = setInterval(createHeart, 800);
    return () => clearInterval(interval);
  }, []);

  const getAnimatedWords = () => {
    let currentCount = 0;
    return PROPOSAL_WORDS.map(word => {
      const sliceEnd = Math.max(0, animatingLettersCount - currentCount);
      currentCount += word.length;
      return word.slice(0, sliceEnd);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] w-full p-4 sm:p-8 max-w-2xl mx-auto relative overflow-hidden transition-all duration-500">
      {(stage === 'playing' || stage === 'proposal-animating') && (
        <div className="flex flex-col items-center w-full max-w-md animate-fadeIn">
          <header className="mb-8 text-center space-y-1">
            <h1 className="text-4xl sm:text-6xl font-romantic text-rose-600 tracking-tight">
              A Secret <span className="font-script text-rose-400">Word</span>
            </h1>
            <p className="text-rose-400 font-medium tracking-widest text-[10px] sm:text-xs uppercase">Valentine's Edition</p>
          </header>

          <div className="w-full glass-card p-6 sm:p-8 rounded-3xl mb-8">
            <WordleGrid 
              guesses={stage === 'proposal-animating' ? getAnimatedWords() : guesses} 
              currentGuess={stage === 'proposal-animating' ? '' : currentGuess} 
              targetWord={TARGET_WORD} 
              maxAttempts={MAX_ATTEMPTS}
              isMessageMode={stage === 'proposal-animating'}
            />
          </div>

          <div className="h-6 mb-4">
            {message && stage === 'playing' && (
              <div className="text-rose-500 text-sm font-semibold tracking-wide animate-bounce">
                {message}
              </div>
            )}
          </div>

          <div className="w-full">
            <Keyboard 
              onKeyPress={onKeyPress} 
              guesses={guesses} 
              targetWord={TARGET_WORD} 
              disabled={stage !== 'playing'}
            />
          </div>
        </div>
      )}

      {stage === 'choice' && (
        <ChoiceView 
          onContinue={() => setStage('playing')} 
          onGiveUp={startProposalAnimation} 
        />
      )}

      {stage === 'proposal-input' && (
        <ProposalView 
          onAccepted={() => setStage('celebration')} 
          guesses={[]} 
          targetWord={TARGET_WORD}
        />
      )}

      {stage === 'celebration' && (
        <CelebrationView onReset={resetGame} />
      )}
    </div>
  );
};

export default App;
