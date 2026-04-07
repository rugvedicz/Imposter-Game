import React from 'react';
import { motion } from 'motion/react';
import { User, UserPlus, Play, Sparkles, Users, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ImposterIcon from '../components/ImposterIcon';

interface LandingPageProps {
  onGuest: () => void;
  onLogin: () => void;
  onSignup: () => void;
}

export default function LandingPage({ onGuest, onLogin, onSignup }: LandingPageProps) {
  const { setGuestMode } = useAuth();

  const handleGuest = () => {
    setGuestMode();
    onGuest();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="flex justify-center mb-12">
          <div className="relative">
            <motion.div 
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ repeat: Infinity, duration: 8 }}
              className="w-40 h-40 bg-white/5 backdrop-blur-3xl rounded-[3rem] flex items-center justify-center border border-white/10 shadow-[0_0_50px_rgba(79,70,229,0.3)]"
            >
              <ImposterIcon className="w-24 h-24" />
            </motion.div>
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute -top-4 -right-4 w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/50"
            >
              <Sparkles className="text-white w-7 h-7" />
            </motion.div>
          </div>
        </div>

        <h1 className="text-7xl font-black text-white mb-4 tracking-tighter gradient-text">
          Imposter<br />
          <span className="text-indigo-500">Game</span>
        </h1>
        <p className="text-white/50 text-xl mb-16 font-bold max-w-xs mx-auto leading-tight">
          Unmask the deceiver in this ultimate party game.
        </p>

        <div className="space-y-6">
          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.15)" }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGuest}
            className="w-full py-6 glass-button rounded-[2.5rem] font-black text-2xl flex items-center justify-center gap-4 shadow-2xl"
          >
            <Play className="w-8 h-8 fill-current" />
            Quick Start
          </motion.button>

          <div className="grid grid-cols-2 gap-4">
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.98 }}
              onClick={onLogin}
              className="py-5 bg-white/5 text-white rounded-[2rem] font-black flex items-center justify-center gap-3 border border-white/10"
            >
              <LogIn className="w-6 h-6" />
              Login
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.98 }}
              onClick={onSignup}
              className="py-5 bg-white/5 text-white rounded-[2rem] font-black flex items-center justify-center gap-3 border border-white/10"
            >
              <UserPlus className="w-6 h-6" />
              Join
            </motion.button>
          </div>
        </div>

        <div className="mt-20 flex items-center justify-center gap-10 opacity-30">
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6" />
            <span className="text-xs font-black uppercase tracking-[0.2em]">3-12 Players</span>
          </div>
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6" />
            <span className="text-xs font-black uppercase tracking-[0.2em]">Creative UI</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
