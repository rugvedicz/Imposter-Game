import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Users, Play, Minus, Plus } from 'lucide-react';
import ImposterIcon from './ImposterIcon';

interface SetupScreenProps {
  onStart: (playerCount: number) => void;
}

export default function SetupScreen({ onStart }: SetupScreenProps) {
  const [count, setCount] = useState(3);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 text-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-16"
      >
        <div className="w-28 h-28 bg-white/5 backdrop-blur-3xl rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 border border-white/10 shadow-[0_0_40px_rgba(79,70,229,0.2)] rotate-6">
          <ImposterIcon className="w-16 h-16" />
        </div>
        <h1 className="text-6xl font-black text-white mb-4 tracking-tight gradient-text">Setup Game</h1>
        <p className="text-white/50 text-xl font-bold">How many players are joining?</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/5 backdrop-blur-3xl p-12 rounded-[3.5rem] border border-white/10 w-full max-w-sm mb-12 shadow-2xl"
      >
        <label className="block text-xs font-black text-white/30 mb-8 uppercase tracking-[0.3em]">
          Player Count
        </label>
        <div className="flex items-center justify-between gap-8 mb-12">
          <motion.button 
            whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCount(Math.max(3, count - 1))}
            className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-white border border-white/10 transition-all"
          >
            <Minus className="w-8 h-8" />
          </motion.button>
          
          <div className="relative">
            <motion.span 
              key={count}
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="text-8xl font-black text-white block drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              {count}
            </motion.span>
          </div>

          <motion.button 
            whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCount(count + 1)}
            className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-white border border-white/10 transition-all"
          >
            <Plus className="w-8 h-8" />
          </motion.button>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onStart(count)}
          className="w-full py-6 gradient-button rounded-[2rem] font-black text-2xl flex items-center justify-center gap-4 shadow-2xl shadow-indigo-500/20"
        >
          <Play className="w-7 h-7 fill-current" />
          Next Step
        </motion.button>
      </motion.div>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-sm font-black text-white/20 uppercase tracking-[0.2em]"
      >
        Best played with 4-8 friends
      </motion.p>
    </div>
  );
}
