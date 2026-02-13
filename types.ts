
export type LetterStatus = 'correct' | 'present' | 'absent' | 'empty';

export interface GameState {
  guesses: string[];
  currentGuess: string;
  isGameOver: boolean;
  isWinner: boolean;
  attempts: number;
}

export type AppStage = 'playing' | 'choice' | 'proposal-animating' | 'proposal-input' | 'celebration';
