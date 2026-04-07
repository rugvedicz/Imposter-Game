import React from 'react';
import { LogOut, History, User, UserCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  onHistory: () => void;
  onLogout: () => void;
}

export default function Header({ onHistory, onLogout }: HeaderProps) {
  const { user, isGuest, logout } = useAuth();

  const handleLogout = () => {
    logout();
    onLogout();
  };

  return (
    <header className="flex items-center justify-between p-6 bg-white/5 backdrop-blur-2xl border-b border-white/5 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shadow-lg">
          <UserCircle className="text-indigo-400 w-7 h-7" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] leading-none mb-1.5">
            {isGuest ? 'Guest Session' : 'Member'}
          </span>
          <span className="text-sm font-black text-white truncate max-w-[150px]">
            {isGuest ? 'Guest Player' : user?.email}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {!isGuest && user && (
          <button 
            onClick={onHistory}
            className="p-3.5 bg-white/5 text-white/50 rounded-2xl hover:bg-white/10 hover:text-white transition-all border border-white/5"
            title="Game History"
          >
            <History className="w-5 h-5" />
          </button>
        )}
        <button 
          onClick={handleLogout}
          className="p-3.5 bg-rose-500/10 text-rose-400 rounded-2xl hover:bg-rose-500/20 transition-all border border-rose-500/10"
          title="Exit"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
