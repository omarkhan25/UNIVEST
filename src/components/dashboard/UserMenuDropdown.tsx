import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Wallet, RefreshCcw, LogOut, ArrowUpRight, Plus, ShieldCheck, UserCheck, KeyRound
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

interface UserMenuDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab?: (tabName: string) => void;
  onOpenWorkspace?: () => void;
  onAddFunds?: () => void;
  onSwitchAccount?: () => void;
  onLogout?: () => void;
}

export const UserMenuDropdown: React.FC<UserMenuDropdownProps> = ({
  isOpen,
  onClose,
  onNavigateTab,
  onAddFunds,
  onSwitchAccount,
  onLogout
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleAddFunds = () => {
    onClose();
    if (onAddFunds) {
      onAddFunds();
    } else {
      toast.success('Add Funds modal opened');
    }
  };

  const handleSwitchAccount = () => {
    onClose();
    if (onSwitchAccount) {
      onSwitchAccount();
    } else {
      navigate('/login');
    }
  };

  const handleLogout = () => {
    onClose();
    if (onLogout) {
      onLogout();
    } else {
      toast.success('Logged out successfully');
      navigate('/login');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 pointer-events-none">
        {/* Click outside backdrop */}
        <div className="fixed inset-0 pointer-events-auto" onClick={onClose} />
        
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.96 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="absolute right-6 top-[72px] w-[280px] bg-white border border-[#E2E8F0] rounded-[24px] shadow-2xl z-50 overflow-hidden font-sans text-slate-800 pointer-events-auto flex flex-col p-3.5 gap-3"
        >
          {/* 1. TOTAL NET WEALTH SNAPSHOT CARD */}
          <div className="bg-[#0F172A] text-white rounded-2xl p-4 flex flex-col gap-2 shadow-md relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                <Wallet className="w-3.5 h-3.5 text-blue-400" /> Total Net Wealth
              </span>
              <span className="text-[9px] font-black text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded">
                +20.3%
              </span>
            </div>
            <span className="text-2xl font-black tracking-tight">₹8,42,150.00</span>
            <div className="flex items-center justify-between text-[10px] text-slate-300 font-bold pt-2 border-t border-white/10 mt-1">
              <span>Demat: IN303028130</span>
              <button
                onClick={() => {
                  onClose();
                  if (onNavigateTab) onNavigateTab('Portfolio');
                }}
                className="text-blue-400 hover:text-blue-300 transition font-black flex items-center gap-0.5 cursor-pointer"
              >
                View <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* 2. ADD FUNDS BUTTON */}
          <button
            onClick={handleAddFunds}
            className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl font-black text-xs transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add Funds</span>
          </button>

          {/* MENU ACTIONS */}
          <div className="flex flex-col gap-0.5 border-t border-slate-100 pt-2">
            {/* KYC Onboarding */}
            <button
              onClick={() => {
                onClose();
                navigate('/onboarding');
              }}
              className="w-full px-3 py-2 rounded-xl hover:bg-emerald-50 text-emerald-700 font-bold text-xs transition flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>KYC & Document Onboarding</span>
              </div>
            </button>

            {/* Login Screen */}
            <button
              onClick={() => {
                onClose();
                navigate('/login');
              }}
              className="w-full px-3 py-2 rounded-xl hover:bg-blue-50 text-blue-600 font-bold text-xs transition flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <KeyRound className="w-4 h-4 text-blue-500" />
                <span>Sign In / Login</span>
              </div>
            </button>

            {/* Create Account */}
            <button
              onClick={() => {
                onClose();
                navigate('/signup');
              }}
              className="w-full px-3 py-2 rounded-xl hover:bg-slate-100 text-slate-700 font-bold text-xs transition flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <UserCheck className="w-4 h-4 text-slate-500" />
                <span>Register New Account</span>
              </div>
            </button>

            {/* 3. SWITCH ACCOUNTS */}
            <button
              onClick={handleSwitchAccount}
              className="w-full px-3 py-2.5 rounded-xl hover:bg-slate-100 text-[#0F172A] font-bold text-xs transition flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <RefreshCcw className="w-4 h-4 text-slate-500" />
                <span>Switch Accounts</span>
              </div>
            </button>

            {/* 4. LOGOUT */}
            <button
              onClick={handleLogout}
              className="w-full px-3 py-2.5 rounded-xl hover:bg-rose-50 text-rose-600 font-black text-xs transition flex items-center gap-2.5 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default UserMenuDropdown;
