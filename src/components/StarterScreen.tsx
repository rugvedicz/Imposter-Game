import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Play, Sparkles, User } from 'lucide-react';

interface StarterScreenProps {
  playerCount: number;
  onFinish: () => void;
}

export default function StarterScreen({ playerCount, onFinish }: StarterScreenProps) {
  const [starter, setStarter] = useState<number | null>(null);

  useEffect(() => {
    // Randomly select a starter after a short delay for effect
    const timer = setTimeout(() => {
      setStarter(Math.floor(Math.random() * playerCount) + 1);
    }, 1500);
    return () => clearTimeout(timer);
  }, [playerCount]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm bg-white p-12 rounded-[3rem] card-shadow border border-slate-100 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 gradient-bg" />
        
        <h2 className="text-2xl font-black text-slate-400 uppercase tracking-[0.2em] mb-12">Who Starts?</h2>

        <div className="relative h-40 flex items-center justify-center mb-12">
          {!starter ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-20 h-20 border-4 border-indigo-100 border-t-indigo-600 rounded-full"
            />
          ) : (
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", damping: 12 }}
              className="flex flex-col items-center"
            >
              <div className="w-24 h-24 gradient-bg rounded-[2rem] flex items-center justify-center mb-6 shadow-xl shadow-indigo-200">
                <User className="text-white w-12 h-12" />
              </div>
              <motion.h3 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-5xl font-black text-slate-900 tracking-tight"
              >
                Player {starter}
              </motion.h3>
            </motion.div>
          )}
          
          {starter && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 pointer-events-none"
            >
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{ 
                    scale: [0, 1, 0],
                    x: (Math.random() - 0.5) * 200,
                    y: (Math.random() - 0.5) * 200,
                  }}
                  transition={{ duration: 1, delay: Math.random() * 0.5 }}
                  className="absolute left-1/2 top-1/2 w-3 h-3 rounded-full bg-indigo-400"
                />
              ))}
            </motion.div>
          )}
        </div>

        <p className="text-slate-500 font-bold mb-12 leading-relaxed">
          {starter 
            ? "You have been chosen to lead the first round of descriptions!" 
            : "Choosing a random leader..."}
        </p>

        <motion.button
          disabled={!starter}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onFinish}
          className={`w-full py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all ${
            starter 
              ? 'gradient-button' 
              : 'bg-slate-100 text-slate-300 cursor-not-allowed'
          }`}
        >
          <Play className="w-6 h-6 fill-current" />
          Start Discussion
        </motion.button>
      </motion.div>
    </div>
  );
}
