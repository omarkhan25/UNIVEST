import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, TrendingUp, Compass, Briefcase, User, 
  Sun, Moon, Bell, Sparkles, Send, X, ShieldAlert,
  ArrowRight, ArrowLeft, BrainCircuit
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Button } from '../components/atoms/Button';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
  collapsed?: boolean;
  badgeCount?: number;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon, label, active = false, onClick, collapsed = false, badgeCount 
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-3.5 rounded-button text-sm font-semibold transition-all duration-200 ${
        active
          ? 'bg-primary text-white shadow-premium hover:shadow-glow-blue'
          : 'text-brand-secondary hover:text-brand-navy hover:bg-slate-100'
      }`}
    >
      <div className="flex items-center gap-3.5">
        <span className="flex-shrink-0">{icon}</span>
        {!collapsed && <span>{label}</span>}
      </div>
      {!collapsed && badgeCount && badgeCount > 0 ? (
        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
          active ? 'bg-white text-primary' : 'bg-rose-500 text-white animate-pulse'
        }`}>
          {badgeCount}
        </span>
      ) : null}
    </button>
  );
};

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');
  const [aiOpen, setAiOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<string[]>([
    'Hello Omar! I am your Univest AI Assistant. How can I help you build wealth today?',
  ]);
  const [inputVal, setInputVal] = useState('');

  const tabs = [
    { name: 'Home', icon: <Home className="w-5 h-5" />, label: 'Home' },
    { name: 'Research', icon: <TrendingUp className="w-5 h-5" />, label: 'Research', badgeCount: 3 },
    { name: 'Markets', icon: <Compass className="w-5 h-5" />, label: 'Markets' },
    { name: 'Portfolio', icon: <Briefcase className="w-5 h-5" />, label: 'Portfolio' },
    { name: 'Profile', icon: <User className="w-5 h-5" />, label: 'Profile' },
  ];

  const handleSendPrompt = (prompt: string) => {
    if (!prompt.trim()) return;
    setChatMessages((prev) => [...prev, prompt]);
    setInputVal('');
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        `I am analyzing "${prompt}" using real-time NSE data feeds and compliance models. Win-rates show a favorable outlook.`,
      ]);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#F8FAFC] text-brand-navy transition-colors duration-200 pb-20 lg:pb-0">
      
      {/* DESKTOP SIDEBAR NAVIGATION (lg:flex) */}
      <aside
        className={`hidden lg:flex flex-col bg-white border-r border-brand-border h-screen sticky top-0 transition-all duration-300 z-30 ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Brand Header */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary to-success flex items-center justify-center text-white font-extrabold text-base shadow-premium-sm border border-white/5">
              U
            </div>
            {!collapsed && (
              <span className="font-sans font-black text-lg tracking-tight text-brand-navy">
                UNIVEST
              </span>
            )}
          </div>
        </div>

        {/* Sidebar Tabs */}
        <nav className="flex-1 px-4 py-6 flex flex-col gap-1.5 overflow-y-auto">
          {tabs.map((tab) => (
            <SidebarItem
              key={tab.name}
              icon={tab.icon}
              label={tab.label}
              active={activeTab === tab.name}
              onClick={() => setActiveTab(tab.name)}
              collapsed={collapsed}
              badgeCount={tab.badgeCount}
            />
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-100 flex flex-col gap-3">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center justify-center p-2 rounded-button border border-brand-border text-brand-secondary hover:text-brand-navy hover:bg-slate-50"
          >
            {collapsed ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-brand-navy shrink-0 border border-brand-border">
              OK
            </div>
            {!collapsed && (
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-brand-navy truncate">Omar Khan</span>
                <span className="text-[10px] text-brand-secondary truncate">Verified Investor</span>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* MOBILE HEADER BAR */}
      <header className="lg:hidden h-16 bg-white border-b border-brand-border flex items-center justify-between px-6 sticky top-0 z-30 shadow-premium-sm">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-primary to-success flex items-center justify-center text-white font-extrabold text-sm shadow-premium-sm">
            U
          </div>
          <span className="font-sans font-black text-sm tracking-tight text-brand-navy">
            UNIVEST
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="icon"
            onClick={toggleTheme}
            className="text-brand-secondary hover:text-brand-navy p-2"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
          
          <Button
            variant="icon"
            className="relative text-brand-secondary hover:text-brand-navy p-2"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse" />
          </Button>
        </div>
      </header>

      {/* MAIN VIEW CONTENT CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* DESKTOP TOP HEADER */}
        <header className="hidden lg:flex h-20 bg-white border-b border-brand-border items-center justify-between px-8 sticky top-0 z-20">
          <div>
            <h2 className="text-lg font-black text-brand-navy">{activeTab} Hub</h2>
            <p className="text-[11px] text-brand-secondary">Explore stock advisories, charts and economic screeners.</p>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="icon"
              onClick={toggleTheme}
              className="text-brand-secondary hover:text-brand-navy"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            
            <Button
              variant="icon"
              className="relative text-brand-secondary hover:text-brand-navy"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
            </Button>
          </div>
        </header>

        {/* Primary Page Content Grid Area */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto flex flex-col gap-6">
          
          {/* Sub Navigation Bar showing Information Architecture */}
          <div className="bg-white border border-brand-border rounded-card p-5 shadow-premium-sm flex flex-col gap-3">
            <span className="text-[10px] text-brand-secondary font-bold uppercase tracking-wider">
              {activeTab} Directory Architecture Preview
            </span>
            <div className="flex flex-wrap gap-2.5">
              {activeTab === 'Home' && [
                'Dashboard', 'Portfolio Summary', "Today's Research", 'AI Recommendations', 'Economic Overview', 'Trending News', 'IPO Highlights', 'Mutual Funds'
              ].map(sub => (
                <span key={sub} className="px-3 py-1.5 bg-slate-50 border border-slate-200 text-xs font-semibold rounded-full text-brand-secondary cursor-pointer hover:border-primary hover:text-primary transition-all">
                  {sub}
                </span>
              ))}
              {activeTab === 'Research' && [
                'All Research', 'Equity Calls', 'Intraday Strategy', 'Swing Options', 'Positional', 'F&O Recommendations', 'Commodity Calls', 'Research Reports'
              ].map(sub => (
                <span key={sub} className="px-3 py-1.5 bg-slate-50 border border-slate-200 text-xs font-semibold rounded-full text-brand-secondary cursor-pointer hover:border-primary hover:text-primary transition-all">
                  {sub}
                </span>
              ))}
              {activeTab === 'Markets' && [
                'Discover Tickers', 'Stock Screener', 'IPO Calendar', 'Mutual Funds Discovery', 'ETFs', 'Fixed Deposits', 'Economic Calendar', 'Sectors Map'
              ].map(sub => (
                <span key={sub} className="px-3 py-1.5 bg-slate-50 border border-slate-200 text-xs font-semibold rounded-full text-brand-secondary cursor-pointer hover:border-primary hover:text-primary transition-all">
                  {sub}
                </span>
              ))}
              {activeTab === 'Portfolio' && [
                'My Holdings', 'Transactions Logs', 'Net Performance', 'Broker Integrations', 'Asset Allocations', 'Risk Assessments', 'P&L Reports'
              ].map(sub => (
                <span key={sub} className="px-3 py-1.5 bg-slate-50 border border-slate-200 text-xs font-semibold rounded-full text-brand-secondary cursor-pointer hover:border-primary hover:text-primary transition-all">
                  {sub}
                </span>
              ))}
              {activeTab === 'Profile' && [
                'Personal Identity', 'KYC Credentials', 'Subscription Plans', 'Bank Details', 'Broker Keys', 'Support Portal', 'Privacy Documentation'
              ].map(sub => (
                <span key={sub} className="px-3 py-1.5 bg-slate-50 border border-slate-200 text-xs font-semibold rounded-full text-brand-secondary cursor-pointer hover:border-primary hover:text-primary transition-all">
                  {sub}
                </span>
              ))}
            </div>
          </div>

          {/* Child content preview */}
          <div className="flex-1">
            {children}
          </div>
        </main>
      </div>

      {/* MOBILE STICKY BOTTOM NAVIGATION BAR (lg:hidden) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-brand-border flex items-center justify-around z-30 shadow-[0_-4px_16px_rgba(15,23,42,0.04)] px-4">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.name;
          return (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex flex-col items-center justify-center gap-1.5 relative py-1 focus:outline-none ${
                isActive ? 'text-primary' : 'text-brand-secondary'
              }`}
            >
              <span>{tab.icon}</span>
              <span className="text-[10px] font-bold">{tab.label}</span>
              {tab.badgeCount && tab.badgeCount > 0 ? (
                <span className="absolute top-0 right-1.5 w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
              ) : null}
            </button>
          );
        })}
      </nav>

      {/* GLOBAL FLOATING AI ASSISTANT ACTION BUTTON */}
      <motion.button
        onClick={() => setAiOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-24 lg:bottom-8 right-6 lg:right-8 z-40 w-14 h-14 rounded-full bg-gradient-to-tr from-primary to-blue-700 flex items-center justify-center text-white shadow-glow-blue border border-white/10 focus:outline-none"
      >
        <Sparkles className="w-6 h-6 animate-pulse" />
      </motion.button>

      {/* GLOBAL SLIDE-IN AI CHAT DRAWER PANEL */}
      <AnimatePresence>
        {aiOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAiOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />

            {/* Chat drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="relative w-full max-w-sm bg-white border-l border-brand-border h-full flex flex-col shadow-premium-xl z-10"
            >
              {/* Header */}
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <BrainCircuit className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-brand-navy">Univest AI Advisor</h3>
                    <span className="text-[10px] text-success font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-success animate-ping" /> Online
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setAiOpen(false)}
                  className="p-1.5 hover:bg-slate-100 rounded-full text-brand-secondary transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Chat Message Logs */}
              <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-4">
                {chatMessages.map((msg, idx) => {
                  const isUser = idx % 2 !== 0;
                  return (
                    <div
                      key={idx}
                      className={`flex flex-col max-w-[85%] text-xs p-3.5 rounded-card leading-relaxed ${
                        isUser
                          ? 'bg-primary text-white self-end shadow-premium-sm'
                          : 'bg-slate-50 border border-brand-border text-brand-navy self-start'
                      }`}
                    >
                      {msg}
                    </div>
                  );
                })}
              </div>

              {/* Quick Prompt Chips */}
              <div className="p-4 border-t border-slate-100 flex flex-col gap-2.5">
                <span className="text-[9px] text-brand-secondary font-bold uppercase tracking-wider px-1">Quick Action Prompts</span>
                <div className="flex flex-wrap gap-1.5">
                  {['Analyze Reliance', 'Compare TCS vs INFY', 'Explain RSI', 'Review My Portfolio'].map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => handleSendPrompt(prompt)}
                      className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 hover:border-primary hover:text-primary transition-colors rounded-full text-[10px] font-semibold text-brand-secondary"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Ask AI Assistant..."
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendPrompt(inputVal)}
                  className="flex-1 bg-white border border-brand-border rounded-input px-3.5 py-2.5 text-xs text-brand-navy focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-slate-400"
                />
                <button
                  onClick={() => handleSendPrompt(inputVal)}
                  className="p-2.5 rounded-full bg-primary text-white hover:bg-brand-blue shadow-premium-sm transition-all focus:outline-none"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

              {/* Compliance advisory warning */}
              <div className="p-3 bg-slate-100/60 border-t border-slate-200 flex items-start gap-1.5 text-[9px] text-brand-secondary leading-normal select-none">
                <ShieldAlert className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>AI advisory suggestions do not constitute a direct transaction offer. Double-check options target risks.</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
export default DashboardLayout;
