import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, EyeOff, ArrowRight, User, ShieldAlert, Sparkles } from 'lucide-react';
import { Player } from '../types';

interface GameScreenProps {
  players: Player[];
  onFinish: () => void;
}

export default function GameScreen({ players, onFinish }: GameScreenProps) {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [hasSeenCurrent, setHasSeenCurrent] = useState(false);
  
  const currentPlayer = players[currentPlayerIndex];

  const handlePressStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsHolding(true);
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  const handlePressEnd = () => {
    setIsHolding(false);
    if (isHolding) {
      setHasSeenCurrent(true);
    }
  };

  const nextPlayer = () => {
    if (!hasSeenCurrent) return;
    
    if (currentPlayerIndex < players.length - 1) {
      setCurrentPlayerIndex(prev => prev + 1);
      setHasSeenCurrent(false);
      setIsHolding(false);
      if ('vibrate' in navigator) {
        navigator.vibrate(20);
      }
    } else {
      onFinish();
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-6 overflow-hidden">
      <div className="flex justify-between items-center mb-12">
        <div className="flex items-center gap-4 px-6 py-3 bg-white/5 backdrop-blur-xl rounded-[2rem] border border-white/10 shadow-xl">
          <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <User className="w-5 h-5 text-white" />
          </div>
          <span className="font-black text-white text-lg">Player {currentPlayerIndex + 1} <span className="text-white/20 mx-2">/</span> {players.length}</span>
        </div>
        <div className="h-3 flex-1 mx-8 bg-white/5 rounded-full overflow-hidden border border-white/5">
          <motion.div 
            className="h-full gradient-bg shadow-[0_0_20px_rgba(79,70,229,0.5)]"
            initial={{ width: 0 }}
            animate={{ width: `${((currentPlayerIndex + 1) / players.length) * 100}%` }}
            transition={{ type: "spring", stiffness: 50 }}
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPlayerIndex}
            initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 1.1, rotate: 3 }}
            className="w-full max-w-sm aspect-[3/4.5] relative"
          >
            <motion.div 
              onMouseDown={handlePressStart}
              onMouseUp={handlePressEnd}
              onMouseLeave={handlePressEnd}
              onTouchStart={handlePressStart}
              onTouchEnd={handlePressEnd}
              animate={{ 
                scale: isHolding ? 1.05 : 1,
                backgroundColor: isHolding 
                  ? (currentPlayer.role === 'imposter' ? 'rgba(225, 29, 72, 0.1)' : 'rgba(16, 185, 129, 0.1)')
                  : 'rgba(255, 255, 255, 0.05)'
              }}
              className={`w-full h-full rounded-[4rem] shadow-2xl flex flex-col items-center justify-center p-12 text-center select-none touch-none cursor-pointer border-4 transition-colors duration-500 ${
                isHolding 
                  ? (currentPlayer.role === 'imposter' ? 'border-rose-500/50' : 'border-emerald-500/50') 
                  : 'border-white/10'
              } backdrop-blur-3xl`}
            >
              {!isHolding ? (
                <div className="flex flex-col items-center text-white">
                  <motion.div 
                    animate={{ 
                      y: [0, -15, 0],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className="w-32 h-32 bg-white/5 rounded-[3rem] flex items-center justify-center mb-10 border border-white/10 shadow-2xl"
                  >
                    <EyeOff className="w-16 h-16 text-white/40" />
                  </motion.div>
                  <h3 className="text-5xl font-black mb-4 tracking-tight gradient-text">Player {currentPlayerIndex + 1}</h3>
                  <p className="text-white/30 text-xl font-bold uppercase tracking-[0.2em]">Hold to reveal</p>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center w-full"
                >
                  <div className={`w-28 h-28 rounded-[2.5rem] flex items-center justify-center mb-10 shadow-2xl ${
                    currentPlayer.role === 'imposter' ? 'bg-rose-500 shadow-rose-500/40' : 'bg-emerald-500 shadow-emerald-500/40'
                  }`}>
                    {currentPlayer.role === 'imposter' ? (
                      <ShieldAlert className="w-14 h-14 text-white" />
                    ) : (
                      <Sparkles className="w-14 h-14 text-white" />
                    )}
                  </div>
                  
                  {currentPlayer.role === 'imposter' ? (
                    <>
                      <h3 className="text-rose-500 text-4xl font-black mb-4 tracking-tighter uppercase italic">Imposter</h3>
                      <div className="w-20 h-1.5 bg-rose-500/20 rounded-full my-8" />
                      <p className="text-white/30 text-xs uppercase font-black tracking-[0.4em] mb-4">Category Hint</p>
                      <p className="text-6xl font-black text-white tracking-tight drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">{currentPlayer.hint}</p>
                    </>
                  ) : (
                    <>
                      <h3 className="text-emerald-500 text-4xl font-black mb-4 tracking-tighter uppercase italic">Safe</h3>
                      <div className="w-20 h-1.5 bg-emerald-500/20 rounded-full my-8" />
                      <p className="text-white/30 text-xs uppercase font-black tracking-[0.4em] mb-4">The Word is</p>
                      <p className="text-7xl font-black text-white tracking-tight drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]">{currentPlayer.word}</p>
                    </>
                  )}
                  
                  <p className="mt-20 text-white/20 text-sm font-black uppercase tracking-widest">Release to hide</p>
                </motion.div>
              )}
            </motion.div>

            <AnimatePresence>
              {hasSeenCurrent && !isHolding && (
                <motion.button
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.15)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={nextPlayer}
                  className="absolute -bottom-28 left-0 right-0 py-6 glass-button rounded-[2.5rem] font-black text-2xl flex items-center justify-center gap-4 shadow-2xl"
                >
                  {currentPlayerIndex < players.length - 1 ? 'Next Player' : 'Final Step'}
                  <ArrowRight className="w-8 h-8" />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-auto pt-20 text-center">
        <p className="text-white/20 text-xs font-black uppercase tracking-[0.3em] max-w-[250px] mx-auto leading-relaxed">
          Pass the device carefully after hiding your card.
        </p>
      </div>
    </div>
  );
}
