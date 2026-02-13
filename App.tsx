
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { WordleGrid } from './components/WordleGrid';
import { Keyboard } from './components/Keyboard';
import { ChoiceView } from './components/ChoiceView';
import { ProposalView } from './components/ProposalView';
import { CelebrationView } from './components/CelebrationView';
import { HowToPlay } from './components/HowToPlay';
import { TARGET_WORD, MAX_ATTEMPTS, WORD_LENGTH, QUIT_PHRASES } from './constants';
import { AppStage } from './types';

const playSound = (type: 'tap' | 'success' | 'present' | 'absent' | 'win' | 'back' | 'enter' | 'correct') => {
  const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  const now = ctx.currentTime;

  switch (type) {
    case 'tap':
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
      break;
    case 'back':
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
      break;
    case 'enter':
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
      break;
    case 'correct':
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
      break;
    case 'present':
      osc.type = 'sine';
      osc.frequency.setValueAtTime(392.00, now); // G4
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
      break;
    case 'absent':
      osc.type = 'sine';
      osc.frequency.setValueAtTime(220.00, now); // A3
      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
      break;
    case 'success':
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523, now);
      osc.frequency.exponentialRampToValueAtTime(783, now + 0.2);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
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
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  
  // Track submission to prevent double-submit during auto-check window
  const isSubmitting = useRef(false);

  const resetGame = useCallback(() => {
    setGuesses([]);
    setCurrentGuess('');
    setMessage(null);
    setAnimatingLettersCount(0);
    setStage('playing');
    isSubmitting.current = false;
  }, []);

  const startProposalAnimation = useCallback(() => {
    setStage('proposal-animating');
    let count = 0;
    const totalLetters = PROPOSAL_WORDS.join('').length;
    const interval = setInterval(() => {
      count++;
      setAnimatingLettersCount(count);
      if (count % 2 === 0) playSound('tap');
      if (count >= totalLetters) {
        clearInterval(interval);
        setTimeout(() => setStage('proposal-input'), 1500);
      }
    }, 100);
  }, []);

  const triggerChoice = useCallback(() => setStage('choice'), []);

  const handleRevealSecret = useCallback(() => {
    setStage('playing'); 
    setMessage(`The secret word was ${TARGET_WORD} ❤️`);
    
    setTimeout(() => {
      setMessage(null);
      setTimeout(startProposalAnimation, 1000);
    }, 3000);
  }, [startProposalAnimation]);

  const submitGuess = useCallback((guessToSubmit: string) => {
    if (!guessToSubmit || isSubmitting.current) return;
    
    const upperGuess = guessToSubmit.toUpperCase();
    
    if (QUIT_PHRASES.some(phrase => upperGuess === phrase)) {
      triggerChoice();
      return;
    }

    if (upperGuess.length !== WORD_LENGTH) {
      setMessage('Too short');
      return;
    }

    isSubmitting.current = true;
    playSound('enter');
    
    upperGuess.split('').forEach((char, i) => {
      setTimeout(() => {
        if (char === TARGET_WORD[i]) playSound('correct');
        else if (TARGET_WORD.includes(char)) playSound('present');
        else playSound('absent');
      }, i * 200 + 300);
    });

    const newGuesses = [...guesses, upperGuess];
    setGuesses(newGuesses);
    setCurrentGuess('');
    
    const isWin = upperGuess === TARGET_WORD;
    const isGameOver = newGuesses.length >= MAX_ATTEMPTS;

    setTimeout(() => {
      isSubmitting.current = false;
      if (isWin) {
        playSound('success');
        setTimeout(startProposalAnimation, 1500);
      } else if (isGameOver) {
        setTimeout(triggerChoice, 1000);
      }
    }, WORD_LENGTH * 200 + 400);

  }, [guesses, triggerChoice, startProposalAnimation]);

  const onKeyPress = useCallback((key: string) => {
    if (stage !== 'playing' || isSubmitting.current) return;
    setMessage(null);

    if (key === 'ENTER') {
      submitGuess(currentGuess);
    } else if (key === 'BACKSPACE') {
      if (currentGuess.length > 0) {
        playSound('back');
        setCurrentGuess(prev => prev.slice(0, -1));
      }
    } else if (/^[A-Z ]$/.test(key)) {
      if (currentGuess.length < 10) { 
        const nextChar = key.toUpperCase();
        const nextGuess = currentGuess + nextChar;
        setCurrentGuess(nextGuess);
        playSound('tap');
        
        if (nextGuess.length === WORD_LENGTH) {
          const isPartOfQuit = QUIT_PHRASES.some(phrase => phrase.startsWith(nextGuess));
          
          if (!isPartOfQuit) {
            setTimeout(() => {
              setCurrentGuess(prev => {
                if (prev.length === WORD_LENGTH) {
                  submitGuess(prev);
                }
                return prev;
              });
            }, 400);
          }
        }
      }
    }
  }, [currentGuess, stage, submitGuess]);

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
    const items = ['❤️', '🌸', '✨', '🌹', '🧸'];
    const animations = ['float-whimsical', 'float-drift'];

    const createItem = () => {
      const item = document.createElement('div');
      const randomAnim = animations[Math.floor(Math.random() * animations.length)];
      item.className = `float-item ${randomAnim}`;
      item.innerHTML = items[Math.floor(Math.random() * items.length)];
      
      item.style.left = Math.random() * 100 + 'vw';
      item.style.fontSize = (Math.random() * 14 + 22) + 'px';
      
      const duration = (Math.random() * 10 + 15);
      item.style.animationDuration = duration + 's';
      item.style.animationDelay = (Math.random() * -20) + 's';
      
      item.style.opacity = (Math.random() * 0.15 + 0.05).toString();
      
      container.appendChild(item);
      setTimeout(() => item.remove(), (duration + 5) * 1000);
    };

    for(let i=0; i<12; i++) createItem();

    const interval = setInterval(createItem, 2000);
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
    <div className="flex flex-col items-center justify-center min-h-[100dvh] w-full max-w-lg mx-auto stable-transform text-rose-900 px-4 py-8 overflow-hidden">
      {/* Help Icon Button */}
      {(stage === 'playing') && (
        <button 
          onClick={() => setShowHowToPlay(true)}
          className="fixed top-6 right-6 w-10 h-10 bg-white/80 backdrop-blur-sm border border-rose-100 rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all text-rose-400 hover:text-rose-600 z-40 group cursor-pointer"
          title="How to play"
        >
          <span className="text-xl font-bold">?</span>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </button>
      )}

      {showHowToPlay && <HowToPlay onClose={() => setShowHowToPlay(false)} />}

      {(stage === 'playing' || stage === 'proposal-animating') && (
        <div className="flex flex-col items-center justify-center w-full animate-fadeIn space-y-6 sm:space-y-8">
          <header className="flex flex-col items-center w-full relative">
            <div className="relative group cursor-default flex flex-col items-center">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center">
                <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: '30s' }}>
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                    <text className="seal-text">
                      <textPath xlinkHref="#circlePath">
                        Love Wordle • Boutique Edition • 2025 •
                      </textPath>
                    </text>
                  </svg>
                </div>
                <div className="absolute inset-2 border-2 border-dashed border-rose-200/40 rounded-full animate-spin-reverse" style={{ animationDuration: '45s' }}></div>
                <div className="w-14 h-14 sm:w-18 sm:h-18 bg-gradient-to-br from-rose-500 to-rose-700 rounded-full shadow-2xl flex items-center justify-center border border-white/30 transform transition-transform duration-500 relative z-10 overflow-hidden group-hover:scale-110">
                   <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>
                   <div className="flex items-baseline relative">
                      <span className="text-white text-3xl sm:text-4xl font-romantic tracking-tighter drop-shadow-md select-none font-bold">L</span>
                      <span className="text-rose-200 text-2xl sm:text-3xl font-romantic tracking-tighter drop-shadow-md select-none -ml-1 italic">W</span>
                   </div>
                   <div className="absolute bottom-1.5 right-3 text-[10px] sm:text-[12px] animate-pulse">❤️</div>
                </div>
              </div>
              <div className="mt-3 space-y-1 flex flex-col items-center">
                <h1 className="text-xl sm:text-3xl font-romantic text-rose-800 tracking-tight leading-none">
                  Love<span className="font-script text-rose-500 drop-shadow-sm ml-1">Wordle</span>
                </h1>
                <div className="flex items-center justify-center gap-2 opacity-30 mt-1">
                  <div className="h-px w-4 bg-rose-200"></div>
                  <p className="text-rose-400 font-medium tracking-[0.4em] text-[7px] sm:text-[8px] uppercase">Special Valentine's Edition</p>
                  <div className="h-px w-4 bg-rose-200"></div>
                </div>
              </div>
            </div>
          </header>

          <main className="flex flex-col items-center justify-center w-full">
            <div className="w-full max-w-[280px] sm:max-w-[320px]">
              <WordleGrid 
                guesses={stage === 'proposal-animating' ? getAnimatedWords() : guesses} 
                currentGuess={stage === 'proposal-animating' ? '' : currentGuess} 
                targetWord={TARGET_WORD} 
                maxAttempts={MAX_ATTEMPTS}
                isMessageMode={stage === 'proposal-animating'}
              />
            </div>
            
            <div className="h-10 flex items-center justify-center mt-3">
              {message && (
                <div className="text-rose-600 text-[10px] sm:text-xs font-bold uppercase tracking-widest bg-white/95 px-4 py-2 rounded-full border border-rose-200 shadow-xl animate-fadeIn backdrop-blur-md text-center max-w-[240px]">
                  {message}
                </div>
              )}
            </div>
          </main>

          <footer className="w-full max-w-md">
            <Keyboard 
              onKeyPress={onKeyPress} 
              guesses={guesses} 
              targetWord={TARGET_WORD} 
              disabled={stage !== 'playing' || !!message}
            />
          </footer>
        </div>
      )}

      {stage === 'choice' && (
        <div className="flex items-center justify-center w-full animate-fadeIn">
          <ChoiceView onContinue={resetGame} onGiveUp={handleRevealSecret} />
        </div>
      )}

      {stage === 'proposal-input' && (
        <div className="flex items-center justify-center w-full animate-fadeIn">
          <ProposalView 
            onAccepted={() => setStage('celebration')} 
            guesses={[]} 
            targetWord={TARGET_WORD}
            onSoundRequest={playSound}
          />
        </div>
      )}

      {stage === 'celebration' && (
        <div className="flex items-center justify-center w-full animate-fadeIn">
          <CelebrationView onReset={resetGame} />
        </div>
      )}
    </div>
  );
};

export default App;
