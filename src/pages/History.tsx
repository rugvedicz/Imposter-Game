import React from 'react';
import { motion } from 'motion/react';
import { History as HistoryIcon, ArrowLeft, Trash2, Calendar, Users, Tag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HistoryPageProps {
  onBack: () => void;
}

export default function HistoryPage({ onBack }: HistoryPageProps) {
  const { user, clearHistory } = useAuth();

  if (!user) return null;

  return (
    <div className="flex flex-col min-h-screen p-6">
      <div className="flex items-center justify-between mb-12">
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
          className="p-3.5 bg-white/5 backdrop-blur-xl rounded-2xl text-white/50 border border-white/10"
        >
          <ArrowLeft className="w-6 h-6" />
        </motion.button>
        <h2 className="text-3xl font-black text-white gradient-text">History</h2>
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={clearHistory}
          disabled={user.history.length === 0}
          className="p-3.5 bg-rose-500/10 text-rose-400 rounded-2xl hover:bg-rose-500/20 transition-all disabled:opacity-20 border border-rose-500/10"
        >
          <Trash2 className="w-6 h-6" />
        </motion.button>
      </div>

      {user.history.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-12">
          <div className="w-28 h-28 bg-white/5 rounded-[2.5rem] flex items-center justify-center mb-8 text-white/10 border border-white/5 shadow-2xl">
            <HistoryIcon className="w-14 h-14" />
          </div>
          <h3 className="text-2xl font-black text-white mb-3">No Games Yet</h3>
          <p className="text-white/30 text-lg font-bold">Play some games to see your history here!</p>
        </div>
      ) : (
        <div className="space-y-6 pb-20">
          {user.history.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white/5 backdrop-blur-3xl p-8 rounded-[3rem] border border-white/10 shadow-2xl hover:bg-white/10 transition-all group"
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-4xl font-black text-white tracking-tight group-hover:text-indigo-400 transition-colors">{game.word}</h3>
                <div className="flex items-center gap-2 text-[10px] font-black text-white/20 uppercase tracking-[0.2em] bg-white/5 px-4 py-2 rounded-full border border-white/5">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(game.date).toLocaleDateString()}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-3 px-5 py-2.5 bg-white/5 rounded-2xl text-sm font-black text-white/60 border border-white/5">
                  <Tag className="w-4.5 h-4.5 text-indigo-400" />
                  {game.category}
                </div>
                <div className="flex items-center gap-3 px-5 py-2.5 bg-white/5 rounded-2xl text-sm font-black text-white/60 border border-white/5">
                  <Users className="w-4.5 h-4.5 text-indigo-400" />
                  {game.players} Players
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
