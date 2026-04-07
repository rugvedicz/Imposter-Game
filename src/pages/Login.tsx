import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, ArrowLeft, LogIn, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface LoginProps {
  onSuccess: () => void;
  onBack: () => void;
  onSignup: () => void;
}

export default function Login({ onSuccess, onBack, onSignup }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      onSuccess();
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-6">
      <motion.button 
        whileTap={{ scale: 0.9 }}
        onClick={onBack}
        className="self-start p-3 bg-white/5 backdrop-blur-xl rounded-2xl text-white/50 border border-white/10 mb-12"
      >
        <ArrowLeft className="w-6 h-6" />
      </motion.button>

      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-black text-white mb-3 gradient-text">Welcome Back</h2>
          <p className="text-white/40 text-lg font-bold">Login to save your game history</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-3">
            <label className="text-xs font-black text-white/20 uppercase tracking-[0.3em] ml-6">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 w-6 h-6" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-16 pr-8 py-6 bg-white/5 rounded-[2.5rem] border border-white/10 focus:border-indigo-500 focus:bg-white/10 focus:outline-none transition-all font-bold text-white placeholder:text-white/10 shadow-2xl"
                placeholder="name@example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-black text-white/20 uppercase tracking-[0.3em] ml-6">Password</label>
            <div className="relative">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 w-6 h-6" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-16 pr-8 py-6 bg-white/5 rounded-[2.5rem] border border-white/10 focus:border-indigo-500 focus:bg-white/10 focus:outline-none transition-all font-bold text-white placeholder:text-white/10 shadow-2xl"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-rose-500/10 text-rose-400 p-5 rounded-[2rem] flex items-center gap-4 text-sm font-bold border border-rose-500/20"
            >
              <AlertCircle className="w-6 h-6 flex-shrink-0" />
              {error}
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-6 gradient-button rounded-[2.5rem] font-black text-2xl flex items-center justify-center gap-4 shadow-2xl shadow-indigo-500/20"
          >
            <LogIn className="w-7 h-7" />
            Login
          </motion.button>
        </form>

        <p className="mt-16 text-center text-white/30 font-bold text-lg">
          Don't have an account?{' '}
          <button onClick={onSignup} className="text-indigo-400 hover:text-indigo-300 transition-colors">
            Join Now
          </button>
        </p>
      </div>
    </div>
  );
}
