import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, RotateCcw, Info, Eye, ShieldAlert, MessageCircle, Vote, User } from 'lucide-react';
import { Player } from '../types';
import ImposterIcon from './ImposterIcon';

interface DiscussionScreenProps {
  players: Player[];
  onRestart: () => void;
}

export default function DiscussionScreen({ players, onRestart }: DiscussionScreenProps) {
  const [showImposter, setShowImposter] = useState(false);
  const imposterIndex = players.findIndex(p => p.role === 'imposter');
  const imposterWord = players.find(p => p.role === 'normal')?.word || '';

  const steps = [
    {
      icon: <Eye className="w-6 h-6 text-indigo-400" />,
      title: "Secret Reveal",
      desc: "Each player views their role secretly. One player is the imposter!"
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-purple-400" />,
      title: "Describe",
      desc: "Players describe the word without revealing it directly."
    },
    {
      icon: <ShieldAlert className="w-6 h-6 text-rose-400" />,
      title: "Imposter Goal",
      desc: "The imposter must blend in by guessing the word from hints."
    },
    {
      icon: <Vote className="w-6 h-6 text-emerald-400" />,
      title: "Vote",
      desc: "After everyone speaks, vote for who you think is the imposter."
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg bg-white/5 backdrop-blur-3xl p-12 rounded-[4rem] border border-white/10 mb-12 relative overflow-hidden shadow-2xl"
      >
        <div className="w-28 h-28 bg-emerald-500/20 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
          <MessageSquare className="text-emerald-400 w-14 h-14" />
        </div>

        <h2 className="text-5xl font-black text-white mb-4 tracking-tight gradient-text">Discussion Phase</h2>
        <p className="text-white/40 text-xl mb-12 max-w-xs mx-auto font-bold leading-tight">
          The game is now in your hands. Start the conversation!
        </p>

        <div className="grid grid-cols-1 gap-4 text-left mb-12">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-6 p-6 bg-white/5 rounded-[2.5rem] border border-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/10 shadow-lg">
                {step.icon}
              </div>
              <div>
                <h4 className="font-black text-white text-lg mb-1">{step.title}</h4>
                <p className="text-sm text-white/40 leading-relaxed font-bold">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {!showImposter ? (
              <motion.button
                key="reveal-btn"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                whileHover={{ scale: 1.02, backgroundColor: "rgba(225, 29, 72, 0.15)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowImposter(true)}
                className="w-full py-5 bg-rose-500/10 text-rose-400 rounded-[2rem] font-black text-xl flex items-center justify-center gap-4 border border-rose-500/20 transition-all"
              >
                <Eye className="w-7 h-7" />
                Reveal Imposter
              </motion.button>
            ) : (
              <motion.div
                key="imposter-revealed"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 bg-rose-500 text-white rounded-[3rem] shadow-2xl shadow-rose-500/40 border border-rose-400/30"
              >
                <div className="flex items-center justify-center gap-4 mb-6">
                  <ImposterIcon className="w-12 h-12" />
                  <h3 className="text-3xl font-black uppercase tracking-tighter italic">Imposter Revealed</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-rose-100 font-black text-xs uppercase tracking-[0.4em] opacity-60">The Imposter was</p>
                  <p className="text-5xl font-black tracking-tight">Player {imposterIndex + 1}</p>
                </div>
                <div className="mt-8 pt-8 border-t border-white/20">
                  <p className="text-rose-100 font-black text-xs uppercase tracking-[0.4em] opacity-60 mb-2">The Word was</p>
                  <p className="text-4xl font-black tracking-tight">{imposterWord}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRestart}
            className="w-full py-6 gradient-button rounded-[2rem] font-black text-2xl flex items-center justify-center gap-4 shadow-2xl shadow-indigo-500/20"
          >
            <RotateCcw className="w-7 h-7" />
            Play Again
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
