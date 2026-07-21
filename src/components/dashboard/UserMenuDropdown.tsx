import React from 'react';
import { Settings, Monitor, Moon, Sun, LogOut, TrendingUp, Wallet, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface UserMenuDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserMenuDropdown: React.FC<UserMenuDropdownProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop to handle clicks outside */}
          <div className="fixed inset-0 z-40" onClick={onClose} />
          
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 top-[110%] w-[280px] bg-[#1a1f2e] border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden font-inter text-slate-300"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
              <span className="text-white font-bold text-sm tracking-wide">Omar Khan</span>
              <button className="text-slate-400 hover:text-white transition">
                <Settings className="w-4 h-4" />
              </button>
            </div>

            {/* Account Info */}
            <div className="p-4 border-b border-slate-700/50">
              <span className="block text-xs font-medium text-slate-400 mb-1">NSDL Demat A/c No.</span>
              <span className="block text-sm font-bold text-slate-200 tracking-wide">IN303028 - 13048568</span>
            </div>

            {/* Portfolio Quick Look */}
            <div className="p-4 border-b border-slate-700/50 bg-slate-900/50">
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/80 p-4 shadow-inner group cursor-pointer transition hover:border-blue-500/50">
                {/* Decorative glow */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all pointer-events-none" />
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
                
                <div className="flex justify-between items-start mb-1 relative z-10">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                    <Wallet className="w-3 h-3 text-slate-500" /> Net Wealth
                  </span>
                  <span className="text-[9px] font-black uppercase text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20 flex items-center gap-1">
                    <Shield className="w-2.5 h-2.5" /> Elite
                  </span>
                </div>
                
                <div className="flex flex-col relative z-10 mb-4">
                  <span className="text-2xl font-black text-white tracking-tight">₹8,42,150</span>
                  <span className="text-[11px] font-black text-emerald-400 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> +₹12,840 (1.55%) Today
                  </span>
                </div>

                <div className="flex items-center gap-2 relative z-10">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-black py-2 rounded-lg transition-colors shadow-glow-blue shadow-blue-900/50">
                    Add Funds
                  </button>
                  <button className="flex-1 bg-slate-700/50 hover:bg-slate-700 text-white text-[11px] font-black py-2 rounded-lg transition-colors border border-slate-600/50">
                    Analytics
                  </button>
                </div>
              </div>
            </div>

            {/* Logout */}
            <button className="w-full flex items-center gap-3 p-4 text-white hover:bg-slate-800 transition text-sm font-bold">
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
