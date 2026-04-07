import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Check, Play, ArrowLeft, RotateCcw } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { Category } from '../types';
import { useAuth } from '../context/AuthContext';

interface CategoryScreenProps {
  onConfirm: (selectedCategories: Category[]) => void;
  onBack: () => void;
}

export default function CategoryScreen({ onConfirm, onBack }: CategoryScreenProps) {
  const { user, updatePreferences } = useAuth();
  const [selectedIds, setSelectedIds] = useState<string[]>(() => {
    if (user?.preferences?.selectedCategories) {
      return user.preferences.selectedCategories;
    }
    return CATEGORIES.map(c => c.id);
  });

  useEffect(() => {
    if (user) {
      // Only update if the current selection differs from saved preferences
      const currentPrefs = user.preferences?.selectedCategories || [];
      if (JSON.stringify([...currentPrefs].sort()) !== JSON.stringify([...selectedIds].sort())) {
        updatePreferences({ selectedCategories: selectedIds });
      }
    }
  }, [selectedIds, updatePreferences, user?.email]); // Use user?.email to trigger when user changes but avoid loop on user object change

  const toggleCategory = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id) 
        : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedIds.length === CATEGORIES.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(CATEGORIES.map(c => c.id));
    }
  };

  const resetSelection = () => {
    setSelectedIds(CATEGORIES.map(c => c.id));
  };

  const handleStart = () => {
    if (selectedIds.length === 0) return;
    const selected = CATEGORIES.filter(c => selectedIds.includes(c.id));
    onConfirm(selected);
  };

  return (
    <div className="flex flex-col min-h-screen p-6">
      <div className="flex items-center justify-between mb-10">
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
          className="p-3 bg-white/5 backdrop-blur-xl rounded-2xl text-white/50 border border-white/10"
        >
          <ArrowLeft className="w-6 h-6" />
        </motion.button>
        <div className="text-center">
          <h2 className="text-3xl font-black text-white gradient-text">Categories</h2>
          <p className="text-sm font-bold text-white/30">Choose your word sets</p>
        </div>
        <div className="flex gap-2">
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={resetSelection}
            title="Reset Selection"
            className="p-2.5 bg-white/5 rounded-xl text-white/30 border border-white/10 hover:text-white transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
          </motion.button>
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={selectAll}
            className="text-xs font-black text-indigo-400 bg-indigo-500/10 px-4 py-2.5 rounded-xl hover:bg-indigo-500/20 transition-colors uppercase tracking-widest border border-indigo-500/20"
          >
            {selectedIds.length === CATEGORIES.length ? 'None' : 'All'}
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-32">
        {CATEGORIES.map((category, index) => (
          <motion.button
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => toggleCategory(category.id)}
            className={`group relative flex items-center p-6 rounded-[2.5rem] border transition-all text-left overflow-hidden ${
              selectedIds.includes(category.id)
                ? 'border-indigo-500 bg-indigo-500/10 shadow-[0_0_30px_rgba(79,70,229,0.2)]'
                : 'border-white/5 bg-white/5 hover:border-white/10'
            }`}
          >
            <span className="text-4xl mr-5 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">{category.icon}</span>
            <div className="flex-1">
              <h3 className={`font-black text-lg ${selectedIds.includes(category.id) ? 'text-white' : 'text-white/70'}`}>
                {category.name}
              </h3>
              <p className="text-xs font-black text-white/20 uppercase tracking-widest">{category.words.length} words</p>
            </div>
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
              selectedIds.includes(category.id) 
                ? 'bg-indigo-500 scale-100' 
                : 'bg-white/5 scale-75 opacity-0'
            }`}>
              <Check className="text-white w-5 h-5 stroke-[4px]" />
            </div>
          </motion.button>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-8 bg-linear-to-t from-[#020617] via-[#020617]/80 to-transparent">
        <div className="max-w-md mx-auto">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleStart}
            disabled={selectedIds.length === 0}
            className={`w-full py-6 rounded-[2.5rem] font-black text-2xl flex items-center justify-center gap-4 transition-all shadow-2xl ${
              selectedIds.length > 0
                ? 'gradient-button shadow-indigo-500/20'
                : 'bg-white/5 text-white/20 cursor-not-allowed shadow-none border border-white/5'
            }`}
          >
            <Play className="w-7 h-7 fill-current" />
            Start Game
          </motion.button>
        </div>
      </div>
    </div>
  );
}
