export interface Category {
  id: string;
  name: string;
  icon: string;
  words: string[];
  hint: string;
}

export type GameState = 'landing' | 'setup' | 'categories' | 'game' | 'starter' | 'discussion' | 'history' | 'login' | 'signup';

export interface Player {
  id: number;
  role: 'normal' | 'imposter';
  word: string;
  hint: string;
  hasSeen: boolean;
}

export interface GameHistory {
  id: string;
  word: string;
  category: string;
  players: number;
  date: string;
}

export interface UserPreferences {
  selectedCategories: string[];
}

export interface User {
  email: string;
  password?: string;
  history: GameHistory[];
  preferences?: UserPreferences;
}
