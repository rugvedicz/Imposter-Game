import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, GameHistory, UserPreferences } from '../types';

interface AuthContextType {
  user: User | null;
  isGuest: boolean;
  login: (email: string, password: string) => boolean;
  signup: (email: string, password: string) => boolean;
  logout: () => void;
  setGuestMode: () => void;
  addGameToHistory: (history: Omit<GameHistory, 'id'>) => void;
  clearHistory: () => void;
  updatePreferences: (preferences: UserPreferences) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isGuest, setIsGuest] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const authUser = localStorage.getItem('authUser');
    if (authUser) {
      setUser(JSON.parse(authUser));
    }
  }, []);

  const login = useCallback((email: string, password: string) => {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword as User);
      setIsGuest(false);
      localStorage.setItem('authUser', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  }, []);

  const signup = useCallback((email: string, password: string) => {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === email)) return false;

    const newUser: User = { email, password, history: [] };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Auto login
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword as User);
    setIsGuest(false);
    localStorage.setItem('authUser', JSON.stringify(userWithoutPassword));
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsGuest(false);
    localStorage.removeItem('authUser');
  }, []);

  const setGuestMode = useCallback(() => {
    setUser(null);
    setIsGuest(true);
    localStorage.removeItem('authUser');
  }, []);

  const addGameToHistory = useCallback((historyItem: Omit<GameHistory, 'id'>) => {
    setUser(prevUser => {
      if (!prevUser) return null;

      const newHistory: GameHistory = {
        ...historyItem,
        id: Math.random().toString(36).substr(2, 9)
      };

      const updatedUser = {
        ...prevUser,
        history: [newHistory, ...prevUser.history]
      };

      localStorage.setItem('authUser', JSON.stringify(updatedUser));

      // Update in users list
      const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
      const userIndex = users.findIndex(u => u.email === prevUser.email);
      if (userIndex !== -1) {
        users[userIndex].history = [newHistory, ...users[userIndex].history];
        localStorage.setItem('users', JSON.stringify(users));
      }

      return updatedUser;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setUser(prevUser => {
      if (!prevUser) return null;
      const updatedUser = { ...prevUser, history: [] };
      localStorage.setItem('authUser', JSON.stringify(updatedUser));

      const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
      const userIndex = users.findIndex(u => u.email === prevUser.email);
      if (userIndex !== -1) {
        users[userIndex].history = [];
        localStorage.setItem('users', JSON.stringify(users));
      }
      return updatedUser;
    });
  }, []);

  const updatePreferences = useCallback((preferences: UserPreferences) => {
    setUser(prevUser => {
      if (!prevUser) return null;
      
      // Only update if preferences actually changed to avoid unnecessary re-renders
      if (JSON.stringify(prevUser.preferences) === JSON.stringify(preferences)) {
        return prevUser;
      }

      const updatedUser = { ...prevUser, preferences };
      localStorage.setItem('authUser', JSON.stringify(updatedUser));

      const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
      const userIndex = users.findIndex(u => u.email === prevUser.email);
      if (userIndex !== -1) {
        users[userIndex].preferences = preferences;
        localStorage.setItem('users', JSON.stringify(users));
      }
      return updatedUser;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user, 
      isGuest, 
      login, 
      signup, 
      logout, 
      setGuestMode, 
      addGameToHistory,
      clearHistory,
      updatePreferences
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
