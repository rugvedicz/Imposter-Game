import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { GameState, Player, Category } from './types';
import SetupScreen from './components/SetupScreen';
import CategoryScreen from './components/CategoryScreen';
import GameScreen from './components/GameScreen';
import DiscussionScreen from './components/DiscussionScreen';
import StarterScreen from './components/StarterScreen';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import HistoryPage from './pages/History';
import Header from './components/Header';
import { AuthProvider, useAuth } from './context/AuthContext';

function AppContent() {
  const [gameState, setGameState] = useState<GameState>('landing');
  const [playerCount, setPlayerCount] = useState(3);
  const [players, setPlayers] = useState<Player[]>([]);
  const { user, addGameToHistory } = useAuth();

  const handleStartSetup = (count: number) => {
    setPlayerCount(count);
    setGameState('categories');
  };

  const handleCategoryConfirm = (selectedCategories: Category[]) => {
    const randomCategory = selectedCategories[Math.floor(Math.random() * selectedCategories.length)];
    const randomWord = randomCategory.words[Math.floor(Math.random() * randomCategory.words.length)];
    
    const newPlayers: Player[] = Array.from({ length: playerCount }, (_, i) => ({
      id: i + 1,
      role: 'normal',
      word: randomWord,
      hint: randomCategory.hint,
      hasSeen: false
    }));

    const imposterIndex = Math.floor(Math.random() * playerCount);
    newPlayers[imposterIndex].role = 'imposter';
    newPlayers[imposterIndex].word = '';

    const shuffledPlayers = [...newPlayers].sort(() => Math.random() - 0.5);

    setPlayers(shuffledPlayers);
    setGameState('game');

    // Save to history if logged in
    if (user) {
      addGameToHistory({
        word: randomWord,
        category: randomCategory.name,
        players: playerCount,
        date: new Date().toISOString()
      });
    }
  };

  const handleGameFinish = () => {
    setGameState('starter');
  };

  const handleRestart = () => {
    setGameState('setup');
    setPlayers([]);
  };

  const showHeader = !['landing', 'login', 'signup'].includes(gameState);

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-indigo-500/30 selection:text-white">
      <div className="creative-bg">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>
      
      <main className="max-w-2xl mx-auto min-h-screen relative">
        {showHeader && (
          <Header 
            onHistory={() => setGameState('history')} 
            onLogout={() => setGameState('landing')} 
          />
        )}
        
        <AnimatePresence mode="wait">
          {gameState === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LandingPage 
                onGuest={() => setGameState('setup')}
                onLogin={() => setGameState('login')}
                onSignup={() => setGameState('signup')}
              />
            </motion.div>
          )}

          {gameState === 'login' && (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <Login 
                onSuccess={() => setGameState('setup')}
                onBack={() => setGameState('landing')}
                onSignup={() => setGameState('signup')}
              />
            </motion.div>
          )}

          {gameState === 'signup' && (
            <motion.div
              key="signup"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Signup 
                onSuccess={() => setGameState('setup')}
                onBack={() => setGameState('landing')}
                onLogin={() => setGameState('login')}
              />
            </motion.div>
          )}

          {gameState === 'history' && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <HistoryPage onBack={() => setGameState('setup')} />
            </motion.div>
          )}

          {gameState === 'setup' && (
            <motion.div
              key="setup"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <SetupScreen onStart={handleStartSetup} />
            </motion.div>
          )}
          
          {gameState === 'categories' && (
            <motion.div
              key="categories"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <CategoryScreen 
                onConfirm={handleCategoryConfirm} 
                onBack={() => setGameState('setup')} 
              />
            </motion.div>
          )}

          {gameState === 'game' && (
            <motion.div
              key="game"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <GameScreen 
                players={players} 
                onFinish={handleGameFinish} 
              />
            </motion.div>
          )}

          {gameState === 'starter' && (
            <motion.div
              key="starter"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
            >
              <StarterScreen 
                playerCount={playerCount} 
                onFinish={() => setGameState('discussion')} 
              />
            </motion.div>
          )}

          {gameState === 'discussion' && (
            <motion.div
              key="discussion"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
            >
              <DiscussionScreen 
                players={players}
                onRestart={handleRestart} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
