import React, { useState, useEffect, useCallback } from 'react';
import { WordleGrid } from './components/WordleGrid';
import { Keyboard } from './components/Keyboard';
import { ChoiceView } from './components/ChoiceView';
import { ProposalView } from './components/ProposalView';
import { CelebrationView } from './components/CelebrationView';
import { TARGET_WORD, MAX_ATTEMPTS, WORD_LENGTH, QUIT_PHRASES } from './constants';
import { AppStage } from './types';

const playSound = (type: 'tap' | 'success' | 'present' | 'absent' | 'win' | 'back') => {
  const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  const now = ctx.currentTime;

  switch (type) {
    case 'tap':
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
      break;
    case 'back':
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
      break;
    case 'success':
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.2);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
      break;
    case 'win':
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.connect(g);
        g.connect(ctx.destination);
        o.type = 'sine';
        o.frequency.setValueAtTime(freq, now + i * 0.1);
        g.gain.setValueAtTime(0, now + i * 0.1);
        g.gain.linearRampToValueAtTime(0.08, now + i * 0.1 + 0.05);
        g.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.5);
        o.start(now + i * 0.1);
        o.stop(now + i * 0.1 + 0.5);
      });
      break;
    case 'present':
      osc.type = 'sine';
      osc.frequency.setValueAtTime(330, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
      break;
  }
};

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
    playSound('win');
    let count = 0;
    const totalLetters = PROPOSAL_WORDS.join('').length;
    const interval = setInterval(() => {
      count++;
      setAnimatingLettersCount(count);
      if (count >= totalLetters) {
        clearInterval(interval);
        setTimeout(() => setStage('proposal-input'), 800);
      }
    }, 50);
  };

  const onKeyPress = useCallback((key: string) => {
    if (stage !== 'playing') return;
    setMessage(null);

    if (key === 'ENTER') {
      const upperGuess = currentGuess.toUpperCase();
      if (QUIT_PHRASES.some(phrase => upperGuess === phrase)) {
        triggerChoice();
        return;
      }
      if (currentGuess.length !== WORD_LENGTH) {
        setMessage('Too short, darling! 🌹');
        playSound('present');
        return;
      }
      const newGuesses = [...guesses, upperGuess];
      setGuesses(newGuesses);
      setCurrentGuess('');
      
      if (upperGuess === TARGET_WORD) {
        playSound('success');
        setTimeout(startProposalAnimation, 1000);
      } else {
        playSound('tap');
        if (newGuesses.length >= MAX_ATTEMPTS) {
          setTimeout(triggerChoice, 1000);
        }
      }
    } else if (key === 'BACKSPACE') {
      if (currentGuess.length > 0) {
        playSound('back');
        setCurrentGuess(prev => prev.slice(0, -1));
      }
    } else if (/^[A-Z ]$/.test(key)) {
      if (currentGuess.length < 5) {
        playSound('tap');
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
    const items = ['❤️', '🌸', '🌹', '✨'];
    const createItem = () => {
      const item = document.createElement('div');
      item.className = 'float-item';
      item.innerHTML = items[Math.floor(Math.random() * items.length)];
      item.style.left = Math.random() * 100 + 'vw';
      item.style.fontSize = (Math.random() * 15 + 10) + 'px';
      item.style.animationDuration = (Math.random() * 4 + 8) + 's';
      item.style.opacity = (Math.random() * 0.3 + 0.1).toString();
      container.appendChild(item);
      setTimeout(() => item.remove(), 12000);
    };
    const interval = setInterval(createItem, 1000);
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
    <div className="flex flex-col items-center justify-start min-h-screen w-full px-2 py-4 sm:p-8 max-w-lg mx-auto relative overflow-y-auto overflow-x-hidden stable-transform">
      {(stage === 'playing' || stage === 'proposal-animating') && (
        <div className="flex flex-col items-center w-full animate-fadeIn">
          {/* Header Section */}
          <header className="mb-4 sm:mb-8 text-center flex flex-col items-center w-full relative">
            {/* Floral Archway Background */}
            <div className="absolute -top-6 left-0 right-0 flex justify-between px-4 opacity-30 pointer-events-none">
              <span className="text-3xl animate-spin-slow">🌸</span>
              <span className="text-3xl animate-spin-slow" style={{ animationDirection: 'reverse' }}>🌸</span>
            </div>

            {/* Boutique Seal Logo */}
            <div className="relative mb-4 group cursor-default">
              {/* Outer Golden Ring */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-rose-200/50 p-1 relative flex items-center justify-center animate-spin-slow" style={{ animationDuration: '20s' }}>
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-rose-100/30 to-transparent animate-pulse"></div>
                {/* Tiny Text on Path (Simplified) */}
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 text-[7px] uppercase tracking-[0.4em] text-rose-400 font-bold bg-[#fff5f7] px-2 z-10">FOR YOU</div>
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 text-[7px] uppercase tracking-[0.4em] text-rose-400 font-bold bg-[#fff5f7] px-2 z-10">2025</div>
              </div>

              {/* Inner Seal Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-rose-500 to-rose-700 rounded-full shadow-lg flex items-center justify-center transform group-hover:scale-105 transition-transform duration-500 border border-white/20">
                  <div className="flex items-center justify-center space-x-1 sm:space-x-2 relative">
                    <span className="text-white text-3xl sm:text-4xl font-romantic tracking-tight drop-shadow-md select-none">L</span>
                    <span className="text-white text-3xl sm:text-4xl font-romantic tracking-tight drop-shadow-md select-none">W</span>
                    {/* Centered Small Heart Decoration */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white animate-pulse opacity-80">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Logo Title */}
            <h1 className="text-2xl sm:text-4xl font-romantic text-rose-800 tracking-tight leading-none">
              Love<span className="font-script text-rose-500 drop-shadow-sm ml-1">Wordle</span>
            </h1>
            <div className="flex items-center gap-2 mt-2 opacity-50">
              <div className="h-px w-6 bg-rose-200"></div>
              <p className="text-rose-400 font-medium tracking-[0.5em] text-[8px] uppercase">Boutique Edition</p>
              <div className="h-px w-6 bg-rose-200"></div>
            </div>
          </header>

          {/* Main Game Card */}
          <div className="w-full glass-card p-4 sm:p-6 rounded-[2.5rem] mb-4 shadow-xl relative overflow-hidden border-rose-100/50">
            {/* Elegant Floral Corners */}
            <svg className="absolute -top-2 -right-2 w-20 h-20 text-rose-100/60 fill-current floral-accent" viewBox="0 0 100 100">
              <path d="M80 0 Q 100 0 100 20 L 100 0 Z" />
              <circle cx="90" cy="10" r="4" />
              <circle cx="75" cy="5" r="2" />
            </svg>
            <svg className="absolute -bottom-2 -left-2 w-20 h-20 text-rose-100/60 fill-current floral-accent rotate-180" viewBox="0 0 100 100">
              <path d="M80 0 Q 100 0 100 20 L 100 0 Z" />
              <circle cx="90" cy="10" r="4" />
              <circle cx="75" cy="5" r="2" />
            </svg>

            <WordleGrid 
              guesses={stage === 'proposal-animating' ? getAnimatedWords() : guesses} 
              currentGuess={stage === 'proposal-animating' ? '' : currentGuess} 
              targetWord={TARGET_WORD} 
              maxAttempts={MAX_ATTEMPTS}
              isMessageMode={stage === 'proposal-animating'}
            />
          </div>

          <div className="h-6 flex items-center justify-center mb-2">
            {message && stage === 'playing' && (
              <div className="text-rose-600 text-[10px] font-bold uppercase tracking-widest bg-white/80 px-4 py-1 rounded-full border border-rose-100 shadow-sm backdrop-blur-sm">
                {message}
              </div>
            )}
          </div>

          <div className="w-full mt-auto">
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
        <div className="flex items-center justify-center min-h-[70vh] w-full px-4">
          <ChoiceView 
            onContinue={() => setStage('playing')} 
            onGiveUp={startProposalAnimation} 
          />
        </div>
      )}

      {stage === 'proposal-input' && (
        <div className="flex items-center justify-center min-h-[80vh] w-full px-4">
          <ProposalView 
            onAccepted={() => {
              playSound('win');
              setStage('celebration');
            }} 
            guesses={[]} 
            targetWord={TARGET_WORD}
            onSoundRequest={playSound}
          />
        </div>
      )}

      {stage === 'celebration' && (
        <div className="flex items-center justify-center min-h-[80vh] w-full px-4">
          <CelebrationView onReset={resetGame} />
        </div>
      )}
    </div>
  );
};

export default App;
