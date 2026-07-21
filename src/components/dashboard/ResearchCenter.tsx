import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Download, Bookmark, Clock, ArrowRight, X,
  TrendingUp, ShieldAlert, CheckCircle2, Plus, BarChart3, AlertCircle, Zap,
  LayoutDashboard, Radio, Sparkles, ListFilter, FileText, Share2, ChevronDown, ChevronUp,
  RefreshCw, Filter, ArrowUpDown, UserCheck, ShieldCheck, Users, Eye, Sliders, ExternalLink
} from 'lucide-react';
import { ResearchDetail } from './ResearchDetail';
import { TradeDrawer } from './TradeDrawer';
import { ShareModal } from './ShareModal';
import { CompareModal } from './CompareModal';
import { ReportViewer } from './ReportViewer';
import { StockDetail } from './StockDetail';
import { AnalystProfileModal } from './AnalystProfileModal';
import { UniversalSearch } from './UniversalSearch';
import toast from 'react-hot-toast';

export const ResearchCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'calls' | 'ai' | 'screeners' | 'reports' | 'analysts'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isUniversalSearchOpen, setIsUniversalSearchOpen] = useState(false);
  
  // Live Calls Filter & Sort State
  const [recFilter, setRecFilter] = useState('All');
  const [durationFilter, setDurationFilter] = useState('All');
  const [riskFilter, setRiskFilter] = useState('All');
  const [callSort, setCallSort] = useState('Latest');
  const [expandedCards, setExpandedCards] = useState<string[]>([]);

  // Interactivity Modals State
  const [selectedResearch, setSelectedResearch] = useState<any | null>(null);
  const [tradeIntent, setTradeIntent] = useState<any | null>(null);
  const [showCompare, setShowCompare] = useState<any | null>(null);
  const [showShare, setShowShare] = useState<any | null>(null);
  const [showReport, setShowReport] = useState<any | null>(null);
  const [showStock, setShowStock] = useState<any | null>(null);
  const [selectedAnalyst, setSelectedAnalyst] = useState<any | null>(null);

  // Custom Screener Builder State
  const [screenerRules, setScreenerRules] = useState([
    { id: '1', field: 'PE Ratio', operator: '<', value: '25' },
    { id: '2', field: 'ROE %', operator: '>', value: '18' },
    { id: '3', field: 'RSI (14)', operator: '>', value: '55' }
  ]);
  const [newField, setNewField] = useState('Market Cap');
  const [newOperator, setNewOperator] = useState('>');
  const [newValue, setNewValue] = useState('10000');

  const TABS = [
    { id: 'overview', name: 'Overview', icon: <LayoutDashboard className="w-4 h-4" />, count: null },
    { id: 'calls', name: 'Live Calls', icon: <Radio className="w-4 h-4 text-rose-500" />, count: 28 },
    { id: 'ai', name: 'AI Insights', icon: <Sparkles className="w-4 h-4 text-blue-500" />, count: 12 },
    { id: 'screeners', name: 'Screeners', icon: <ListFilter className="w-4 h-4" />, count: null },
    { id: 'reports', name: 'Reports', icon: <FileText className="w-4 h-4" />, count: '6 New' },
    { id: 'analysts', name: 'Analysts', icon: <UserCheck className="w-4 h-4 text-emerald-600" />, count: '8 SEBI' }
  ];

  const featuredOpportunities = [
    {
      company: 'Reliance Industries Ltd', symbol: 'RELIANCE', logo: 'RL', exchange: 'NSE',
      rec: 'BUY', price: '₹2,934.50', entry: '₹2,920 - ₹2,940', target: '₹3,160', stop: '₹2,838',
      return: '14%', risk: 'Low', confidence: 92, duration: 'Swing', sector: 'Energy & Hydrogen',
      summary: 'Consolidation breakout verified on daily frames. Hydrogen commissioning projected to trigger re-rating triggers in late Q3.',
      analyst: 'Aarav Mehta', time: '42 min ago'
    },
    {
      company: 'HDFC Bank Ltd', symbol: 'HDFCBANK', logo: 'HD', exchange: 'NSE',
      rec: 'BUY', price: '₹1,682.40', entry: '₹1,660 - ₹1,675', target: '₹1,884', stop: '₹1,595',
      return: '15%', risk: 'Medium', confidence: 91, duration: 'Positional', sector: 'Financials',
      summary: 'AI accumulation indicators at multi-month demand zone. Corporate deposit expansion stable.',
      analyst: 'Neha Shah', time: '2 hrs ago'
    },
    {
      company: 'Tata Consultancy Services', symbol: 'TCS', logo: 'TC', exchange: 'NSE',
      rec: 'HOLD', price: '₹4,185.10', entry: '₹4,100 - ₹4,140', target: '₹4,400', stop: '₹3,950',
      return: '7%', risk: 'Low', confidence: 85, duration: 'Long Term', sector: 'Technology',
      summary: 'Sector rotation towards defensives continues. Wait for decisive breakout above 4250 before adding fresh long positions.',
      analyst: 'Aarav Mehta', time: '5 hrs ago'
    },
    {
      company: 'Larsen & Toubro Ltd', symbol: 'LT', logo: 'LT', exchange: 'NSE',
      rec: 'BUY', price: '₹3,456.90', entry: '₹3,420 - ₹3,440', target: '₹3,950', stop: '₹3,290',
      return: '16%', risk: 'Low', confidence: 94, duration: 'Swing', sector: 'Capital Goods',
      summary: 'Robust Q1 order book inflows beat analyst consensus by 18%. Technical chart patterns signal fresh multi-week continuation.',
      analyst: 'Aarav Mehta', time: '1 day ago'
    }
  ];

  const highConvictionPicks = [
    {
      company: 'HDFC Bank Ltd', symbol: 'HDFCBANK', logo: 'HD', conviction: '96%', horizon: '3 - 6 Months', return: '15%',
      summary: 'Institutional deposit recovery & stable net interest margins after merger integration.'
    },
    {
      company: 'Larsen & Toubro Ltd', symbol: 'LT', logo: 'LT', conviction: '94%', horizon: '1 - 3 Months', return: '16%',
      summary: 'International order backlog expansion across defense and green hydrogen infrastructure.'
    }
  ];

  const reportsList = [
    { title: 'IT Services Sector Outlook FY27', author: 'Univest Quant Team', date: '18 Jul 2026', time: '12 Min Read', category: 'Sector Report' },
    { title: 'Energy Giga-factory Valuation Impact', author: 'Aarav Mehta', date: '15 Jul 2026', time: '8 Min Read', category: 'Fundamental Note' },
    { title: 'Q1 Banking Margin Analysis & Deposit Trajectory', author: 'Neha Shah', date: '12 Jul 2026', time: '15 Min Read', category: 'Quarterly Report' },
    { title: 'Green Hydrogen Infrastructure Playbook', author: 'Aarav Mehta', date: '10 Jul 2026', time: '10 Min Read', category: 'Company Report' },
    { title: 'Nifty Options & Volatility Index Dynamics', author: 'Univest Quant Team', date: '05 Jul 2026', time: '6 Min Read', category: 'Technical Report' }
  ];

  const analystsList = [
    {
      name: 'Aarav Mehta', role: 'Head of Technical Research', acc: '84%', ret: '+18.4%', calls: 14, followers: '14.2K', exp: '12+ Yrs', sector: 'Capital Goods & Energy'
    },
    {
      name: 'Neha Shah', role: 'Senior Fundamental Analyst', acc: '88%', ret: '+22.1%', calls: 9, followers: '18.6K', exp: '10+ Yrs', sector: 'Banking & Financials'
    },
    {
      name: 'Univest Quant Team', role: 'Algorithmic Research Desk', acc: '86%', ret: '+16.8%', calls: 38, followers: '24.5K', exp: 'Institutional', sector: 'Cross-Sector Quant'
    }
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success('Research feed updated with latest real-time market signals');
    }, 800);
  };

  const handleAddScreenerCondition = () => {
    const newId = String(Date.now());
    setScreenerRules([...screenerRules, { id: newId, field: newField, operator: newOperator, value: newValue }]);
    toast.success('Condition added to Screener');
  };

  const handleRemoveScreenerCondition = (id: string) => {
    setScreenerRules(screenerRules.filter(r => r.id !== id));
  };

  // Filtered Live Calls
  const filteredCalls = useMemo(() => {
    return featuredOpportunities.filter(call => {
      const matchesSearch = searchQuery === '' || 
        call.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        call.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        call.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
        call.analyst.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRec = recFilter === 'All' || call.rec === recFilter;
      const matchesDuration = durationFilter === 'All' || call.duration === durationFilter;
      const matchesRisk = riskFilter === 'All' || call.risk === riskFilter;

      return matchesSearch && matchesRec && matchesDuration && matchesRisk;
    }).sort((a, b) => {
      if (callSort === 'Highest Return') return parseFloat(b.return) - parseFloat(a.return);
      if (callSort === 'Highest Confidence') return b.confidence - a.confidence;
      return 0; // Default Latest
    });
  }, [searchQuery, recFilter, durationFilter, riskFilter, callSort]);

  {/* TAB 1: OVERVIEW */}
  const renderOverview = () => (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      
      {/* 1. Today's Research Brief - Large Dark Navy Hero Card */}
      <div className="bg-[#0F172A] rounded-[24px] p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-blue-600 text-white text-xs font-black px-3 py-1 rounded-lg tracking-wider">
                TODAY'S RESEARCH BRIEF
              </span>
              <span className="text-emerald-400 text-xs font-extrabold px-3 py-1 bg-emerald-400/10 border border-emerald-400/20 rounded-lg">
                MARKET MOOD: BULLISH
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black mb-4 leading-tight">
              Institutional buying offsets IT outflow pressure. AI signals strong accumulation in Large-Cap energy & banking sectors.
            </h2>
            <p className="text-sm text-slate-300 font-medium leading-relaxed max-w-2xl mb-8">
              Our neural models have scanned 1,400+ stocks today. High-volume breakouts detected in capital goods and defensive large-cap IT names.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button 
                onClick={() => setActiveTab('calls')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-black px-6 py-3.5 rounded-xl transition shadow-lg flex items-center gap-2 text-sm"
              >
                Explore Live Calls <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setActiveTab('ai')}
                className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3.5 rounded-xl border border-white/20 transition text-sm flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-blue-400" /> View AI Insights
              </button>
            </div>
          </div>

          {/* Today's Metrics Widget */}
          <div className="bg-white/5 border border-white/10 rounded-[20px] p-6 flex flex-col justify-between backdrop-blur-md">
            <div>
              <span className="text-blue-400 text-xs font-black uppercase tracking-wider mb-3 block">Daily Research Counters</span>
              <div className="grid grid-cols-2 gap-4 border-b border-white/10 pb-4 mb-4">
                <div>
                  <span className="text-slate-400 text-[10px] font-bold block">BUY CALLS</span>
                  <span className="text-2xl font-black text-emerald-400">18</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] font-bold block">SELL / HOLD</span>
                  <span className="text-2xl font-black text-slate-300">10</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] font-bold block">TARGET HITS</span>
                  <span className="text-2xl font-black text-emerald-400">4</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] font-bold block">AI PICKS</span>
                  <span className="text-2xl font-black text-blue-400">12</span>
                </div>
              </div>
            </div>
            
            <div className="pt-2">
              <span className="text-[10px] text-slate-400 font-bold block mb-1">TOP PICK TODAY</span>
              <span className="font-black text-white text-base block">{featuredOpportunities[0].company}</span>
              <span className="text-xs text-emerald-400 font-extrabold">Target: {featuredOpportunities[0].target} (+14%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Featured Opportunities (Exactly 3 Cards) */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-xl font-black text-[#0F172A]">Featured Opportunities</h3>
            <p className="text-xs text-slate-500 font-medium">Curated high-potential research recommendations published today.</p>
          </div>
          <button onClick={() => setActiveTab('calls')} className="text-blue-600 font-bold text-sm hover:underline">View All 28 Calls</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredOpportunities.slice(0, 3).map((call) => (
            <div 
              key={call.symbol} 
              onClick={() => setSelectedResearch(call)}
              className="bg-white rounded-[24px] border border-[#E2E8F0] p-6 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between cursor-pointer hover:border-blue-300"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-[#F8FAFC] flex items-center justify-center font-black text-slate-500 text-xs shrink-0 border border-slate-100">
                      {call.logo}
                    </div>
                    <div>
                      <h4 className="font-black text-[#0F172A] text-base group-hover:text-blue-600 transition">{call.company}</h4>
                      <span className="text-xs font-bold text-slate-400">{call.exchange} : {call.symbol}</span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg ${
                    call.rec === 'BUY' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {call.rec}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-medium mb-5 line-clamp-3">
                  {call.summary}
                </p>

                <div className="grid grid-cols-2 gap-3 mb-5 p-3.5 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0]">
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase">Target Price</span>
                    <span className="font-black text-[#0F172A] text-sm">{call.target}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase">Potential Upside</span>
                    <span className="font-black text-emerald-600 text-sm">+{call.return}</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 font-bold mb-4 pt-3 border-t border-slate-100">
                  <span>AI Confidence: <strong className="text-blue-600">{call.confidence}%</strong></span>
                  <span>{call.analyst}</span>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); toast.success(`Bookmarked ${call.symbol}`); }}
                    className="w-10 h-10 flex items-center justify-center rounded-xl border border-[#E2E8F0] text-slate-400 hover:bg-slate-50 hover:text-[#0F172A] transition"
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setShowShare(call); }}
                    className="w-10 h-10 flex items-center justify-center rounded-xl border border-[#E2E8F0] text-slate-400 hover:bg-slate-50 hover:text-[#0F172A] transition"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setSelectedResearch(call); }}
                    className="flex-1 py-2.5 rounded-xl bg-blue-50 text-blue-700 font-black text-xs hover:bg-blue-100 transition"
                  >
                    Read Analysis
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. High Conviction Picks */}
      <div>
        <h3 className="text-xl font-black text-[#0F172A] mb-5">High Conviction Picks</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {highConvictionPicks.map((pick) => (
            <div 
              key={pick.symbol} 
              onClick={() => setSelectedResearch(featuredOpportunities.find(f => f.symbol === pick.symbol) || featuredOpportunities[0])}
              className="bg-white rounded-[24px] border border-[#E2E8F0] p-6 shadow-sm flex flex-col sm:flex-row gap-6 items-start sm:items-center hover:shadow-md transition cursor-pointer group hover:border-blue-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-xl shrink-0 group-hover:scale-105 transition-transform">
                {pick.logo}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-black text-[#0F172A] group-hover:text-blue-600 transition">{pick.company}</h4>
                    <span className="text-xs font-bold text-slate-400">Horizon: {pick.horizon}</span>
                  </div>
                  <span className="bg-blue-100 text-blue-700 font-black text-[10px] px-2.5 py-1 rounded-lg">
                    {pick.conviction} CONVICTION
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium mt-2 leading-relaxed">
                  {pick.summary}
                </p>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
                  <span className="text-xs font-black text-emerald-600">Expected Upside: +{pick.return}</span>
                  <span className="text-xs font-black text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Open Research <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Quick Statistics Bar */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'Open Calls', val: '28 Active', color: 'text-[#0F172A]' },
          { label: 'Closed Calls', val: '142 Total', color: 'text-slate-600' },
          { label: 'Target Hit Rate', val: '86.4%', color: 'text-emerald-600' },
          { label: 'Average Return', val: '+17.8%', color: 'text-emerald-600' },
          { label: 'Published Today', val: '6 Calls', color: 'text-blue-600' }
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-[20px] p-5 border border-[#E2E8F0] shadow-sm">
            <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">{stat.label}</span>
            <span className={`text-xl font-black ${stat.color}`}>{stat.val}</span>
          </div>
        ))}
      </div>

    </div>
  );

  {/* TAB 2: LIVE CALLS */}
  const renderLiveCalls = () => (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      
      {/* Filters & Sorting Bar */}
      <div className="bg-white p-5 rounded-[24px] border border-[#E2E8F0] shadow-sm flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          
          {/* Recommendation Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Rec:</span>
            {['All', 'BUY', 'SELL', 'HOLD'].map(rec => (
              <button 
                key={rec}
                onClick={() => setRecFilter(rec)}
                className={`px-3.5 py-1.5 rounded-xl font-black text-xs transition ${
                  recFilter === rec ? 'bg-[#0F172A] text-white' : 'bg-[#F8FAFC] text-slate-500 hover:bg-slate-100'
                }`}
              >
                {rec}
              </button>
            ))}
          </div>

          {/* Duration Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Duration:</span>
            {['All', 'Intraday', 'Swing', 'Positional', 'Long Term'].map(dur => (
              <button 
                key={dur}
                onClick={() => setDurationFilter(dur)}
                className={`px-3 py-1 rounded-lg font-bold text-xs transition ${
                  durationFilter === dur ? 'bg-blue-600 text-white' : 'bg-[#F8FAFC] text-slate-500 hover:bg-slate-100'
                }`}
              >
                {dur}
              </button>
            ))}
          </div>

          {/* Sorting */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-slate-400" />
            <select
              value={callSort}
              onChange={(e) => setCallSort(e.target.value)}
              className="bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-black px-3 py-1.5 rounded-xl outline-none text-[#0F172A]"
            >
              <option>Latest</option>
              <option>Highest Return</option>
              <option>Highest Confidence</option>
            </select>
          </div>
        </div>
      </div>

      {/* Expandable Premium Research Cards List */}
      <div className="grid grid-cols-1 gap-6">
        {filteredCalls.length === 0 ? (
          <div className="bg-white p-12 rounded-[24px] border border-[#E2E8F0] text-center">
            <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h4 className="font-black text-lg text-[#0F172A]">No Research Calls Found</h4>
            <p className="text-xs text-slate-500 mt-1">Try adjusting your filters or search query.</p>
          </div>
        ) : (
          filteredCalls.map((call) => {
            const isExpanded = expandedCards.includes(call.symbol);

            return (
              <div 
                key={call.symbol}
                className="bg-white rounded-[24px] border border-[#E2E8F0] p-6 shadow-sm hover:shadow-md transition-all"
              >
                {/* Header Row */}
                <div 
                  onClick={() => setExpandedCards(prev => isExpanded ? prev.filter(c => c !== call.symbol) : [...prev, call.symbol])}
                  className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 cursor-pointer pb-5 border-b border-slate-100"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#0F172A] text-white flex items-center justify-center font-black text-xs shrink-0 shadow-sm">
                      {call.logo}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-black text-[#0F172A]">{call.company}</h3>
                        <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-black ${
                          call.rec === 'BUY' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {call.rec}
                        </span>
                        <span className="text-xs font-bold text-slate-400">{call.exchange}:{call.symbol}</span>
                      </div>
                      <span className="text-xs font-medium text-slate-500">Sector: {call.sector} · Horizon: {call.duration}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                    <div className="text-left md:text-right">
                      <span className="block text-[10px] font-bold text-slate-400 uppercase">Current Price</span>
                      <span className="text-base font-black text-[#0F172A]">{call.price}</span>
                    </div>
                    <div className="text-left md:text-right">
                      <span className="block text-[10px] font-bold text-slate-400 uppercase">Target</span>
                      <span className="text-base font-black text-emerald-600">{call.target} ({call.return})</span>
                    </div>
                    <button className="p-2 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-slate-500 hover:bg-slate-100 transition">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Body Summary */}
                <div className="py-4">
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    {call.summary}
                  </p>
                </div>

                {/* Inline Expandable Details Panel */}
                {isExpanded && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="p-5 my-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl flex flex-col gap-4 text-xs"
                  >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Entry Range</span>
                        <span className="font-black text-[#0F172A]">{call.entry}</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Stop Loss</span>
                        <span className="font-black text-rose-600">{call.stop}</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">AI Confidence</span>
                        <span className="font-black text-blue-600">{call.confidence}% Confidence</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Risk Profile</span>
                        <span className="font-black text-[#0F172A]">{call.risk} Risk</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-200">
                      <span className="font-bold text-[#0F172A] block mb-1">Analyst Commentary & Invalidation Note:</span>
                      <p className="text-slate-600 leading-relaxed">
                        Technical breakout is backed by 3.2x average 20-day volume expansion. Daily close below {call.stop} invalidates setup.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Card Actions Footer */}
                <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-slate-100 gap-3">
                  <div className="text-xs font-bold text-slate-400">
                    Analyst: <span className="text-[#0F172A] font-black">{call.analyst}</span> · {call.time}
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button 
                      onClick={() => toast.success(`Saved ${call.symbol}`)}
                      className="px-3 py-2 rounded-xl border border-[#E2E8F0] text-slate-500 hover:bg-slate-50 text-xs font-bold transition"
                    >
                      Bookmark
                    </button>
                    <button 
                      onClick={() => setShowCompare(call)}
                      className="px-3 py-2 rounded-xl border border-[#E2E8F0] text-slate-500 hover:bg-slate-50 text-xs font-bold transition"
                    >
                      Compare
                    </button>
                    <button 
                      onClick={() => setSelectedResearch(call)}
                      className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-blue-50 text-blue-700 font-black text-xs hover:bg-blue-100 transition"
                    >
                      Read Analysis
                    </button>
                    <button 
                      onClick={() => setTradeIntent(call)}
                      className="flex-1 sm:flex-none px-5 py-2 rounded-xl bg-blue-600 text-white font-black text-xs hover:bg-blue-700 shadow-sm transition"
                    >
                      Trade
                    </button>
                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );

  {/* TAB 3: AI INSIGHTS */}
  const renderAIInsights = () => (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      
      {/* High Confidence Pick Hero */}
      <div className="bg-white rounded-[24px] border border-blue-100 p-8 shadow-md relative overflow-hidden">
        <div className="flex items-center gap-2 text-blue-600 text-xs font-black uppercase mb-4">
          <Zap className="w-4 h-4 fill-blue-600" /> AI Neural High Confidence Setup
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
          <div>
            <h3 className="text-2xl font-black text-[#0F172A] mb-2">Tata Consultancy Services (TCS)</h3>
            <p className="text-slate-600 text-xs font-medium leading-relaxed mb-6">
              Neural models detected an institutional sector rotation favoring IT defensives. MACD bullish crossover paired with multi-session volume accumulation.
            </p>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSelectedResearch(featuredOpportunities[2])}
                className="px-6 py-3 rounded-xl bg-blue-600 text-white font-black text-xs hover:bg-blue-700 transition"
              >
                Open Research
              </button>
              <button 
                onClick={() => setShowCompare(featuredOpportunities[2])}
                className="px-6 py-3 rounded-xl border border-[#E2E8F0] text-slate-700 font-bold text-xs hover:bg-slate-50 transition"
              >
                Compare Alternatives
              </button>
            </div>
          </div>

          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-5 flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase">AI Score</span>
              <span className="text-2xl font-black text-blue-600">98 / 100</span>
            </div>
            <div className="flex justify-between items-center my-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Timeline</span>
              <span className="text-xs font-black text-[#0F172A]">3 - 4 Weeks</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Target</span>
              <span className="text-xs font-black text-emerald-600">₹4,400 (+7%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Breakout & Signals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-[24px] p-6 border border-[#E2E8F0] shadow-sm">
          <div className="flex items-center gap-2 font-black text-base text-[#0F172A] mb-4">
            <TrendingUp className="w-5 h-5 text-emerald-600" /> Breakout Opportunities
          </div>
          <div className="flex flex-col gap-3">
            <div className="p-3.5 bg-[#F8FAFC] rounded-xl border border-slate-100 flex justify-between items-center">
              <div>
                <span className="font-black text-sm text-[#0F172A] block">BHEL</span>
                <span className="text-[10px] text-slate-400 font-bold">Crossing 52W High</span>
              </div>
              <span className="text-xs font-black text-emerald-600">+4.2% Today</span>
            </div>
            <div className="p-3.5 bg-[#F8FAFC] rounded-xl border border-slate-100 flex justify-between items-center">
              <div>
                <span className="font-black text-sm text-[#0F172A] block">ZOMATO</span>
                <span className="text-[10px] text-slate-400 font-bold">2.8x Volume Expansion</span>
              </div>
              <span className="text-xs font-black text-emerald-600">+3.8% Today</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[24px] p-6 border border-rose-100 shadow-sm">
          <div className="flex items-center gap-2 font-black text-base text-[#0F172A] mb-4">
            <ShieldAlert className="w-5 h-5 text-rose-600" /> Risk & Sector Reallocation Alerts
          </div>
          <div className="flex flex-col gap-3">
            <div className="p-3.5 bg-rose-50/50 rounded-xl border border-rose-100 flex justify-between items-center">
              <div>
                <span className="font-black text-sm text-rose-900 block">IT Sector Exposure</span>
                <span className="text-[10px] text-rose-700 font-bold">Concentration Risk Flagged</span>
              </div>
              <span className="text-xs font-black text-rose-600">Rebalance -5%</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );

  {/* TAB 4: SCREENERS */}
  const renderScreeners = () => (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      
      {/* Custom Screener Builder */}
      <div className="bg-white rounded-[24px] border border-[#E2E8F0] p-8 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-black text-[#0F172A]">Custom Screener Builder</h3>
            <p className="text-xs text-slate-500 font-medium mt-1">Define multi-variable quantitative rules to discover hidden stocks.</p>
          </div>
          <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-xl text-xs font-black">
            Instant Filtering
          </span>
        </div>

        {/* Active Rules Tags */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {screenerRules.map((rule) => (
            <div key={rule.id} className="flex items-center gap-2 bg-[#F8FAFC] border border-[#E2E8F0] px-3.5 py-2 rounded-xl text-xs font-black text-[#0F172A]">
              <span>{rule.field}</span>
              <span className="text-blue-600">{rule.operator}</span>
              <span>{rule.value}</span>
              <button 
                onClick={() => handleRemoveScreenerCondition(rule.id)}
                className="ml-2 text-slate-400 hover:text-rose-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Add Condition Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100">
          <select 
            value={newField}
            onChange={(e) => setNewField(e.target.value)}
            className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs font-bold text-[#0F172A]"
          >
            <option>Market Cap</option>
            <option>PE Ratio</option>
            <option>PB Ratio</option>
            <option>ROE %</option>
            <option>Debt/Equity</option>
            <option>Revenue Growth</option>
            <option>RSI (14)</option>
            <option>MACD</option>
          </select>

          <select 
            value={newOperator}
            onChange={(e) => setNewOperator(e.target.value)}
            className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs font-bold text-[#0F172A]"
          >
            <option>&gt;</option>
            <option>&lt;</option>
            <option>=</option>
            <option>&gt;=</option>
            <option>&lt;=</option>
          </select>

          <input 
            type="text"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            placeholder="Threshold value..."
            className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs font-bold text-[#0F172A] outline-none"
          />

          <button 
            onClick={handleAddScreenerCondition}
            className="bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl text-xs py-2 transition flex items-center justify-center gap-1"
          >
            <Plus className="w-4 h-4" /> Add Rule
          </button>
        </div>

        {/* Matches Result Box */}
        <div className="mt-6 p-4 bg-[#0F172A] text-white rounded-2xl flex justify-between items-center">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Matching Stocks Found</span>
            <span className="text-xl font-black">42 Companies</span>
          </div>
          <button className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-black text-xs hover:bg-blue-700 transition">
            View Screener Matches
          </button>
        </div>
      </div>

      {/* Ready-made Popular Screeners */}
      <div>
        <h3 className="text-xl font-black text-[#0F172A] mb-5">Ready-made Financial Screeners</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Momentum Trajectory', count: '14 Stocks', desc: '50 DMA crossing 200 DMA with high volume surge.' },
            { title: 'Dividend Yielders', count: '28 Stocks', desc: 'Consistent dividend payout > 4% annual yield.' },
            { title: 'Value & Growth Blend', count: '8 Stocks', desc: 'Low PE ratio combined with >20% revenue growth YoY.' },
            { title: '52-Week High Breakouts', count: '12 Stocks', desc: 'Closing above multi-month resistance levels.' },
            { title: 'Strong Fundamentals', count: '35 Stocks', desc: 'Zero debt balance sheet with ROE > 20%.' },
            { title: 'High Volume Reversal', count: '6 Stocks', icon: <AlertCircle />, desc: 'Bullish candle reversal at support with 3x average volume.' }
          ].map(screener => (
            <div key={screener.title} className="bg-white rounded-[24px] border border-[#E2E8F0] p-6 shadow-sm hover:shadow-md transition cursor-pointer group flex flex-col justify-between">
              <div>
                <h4 className="font-black text-base text-[#0F172A] group-hover:text-blue-600 transition mb-2">{screener.title}</h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">{screener.desc}</p>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-slate-100 mt-4">
                <span className="text-xs font-black text-[#0F172A]">{screener.count}</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );

  {/* TAB 5: REPORTS */}
  const renderReports = () => (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reportsList.map((report, idx) => (
          <div key={idx} className="bg-white rounded-[24px] border border-[#E2E8F0] overflow-hidden shadow-sm hover:shadow-md transition group flex flex-col justify-between">
            <div className="h-36 bg-[#0F172A] p-6 text-white relative flex flex-col justify-end">
              <span className="bg-blue-600 text-white text-[10px] font-black px-2.5 py-1 rounded uppercase w-fit mb-2">
                {report.category}
              </span>
              <h4 className="font-black text-base leading-tight group-hover:text-blue-400 transition">{report.title}</h4>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div className="text-xs font-bold text-slate-400 mb-6">
                <span>By {report.author}</span> · <span>{report.date}</span>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {report.time}
                </span>
                <button 
                  onClick={() => setShowReport(report)}
                  className="px-4 py-2 rounded-xl bg-[#0F172A] text-white font-bold text-xs hover:bg-slate-800 transition"
                >
                  Read Report
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  {/* TAB 6: ANALYSTS */}
  const renderAnalysts = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-500">
      {analystsList.map((analyst) => (
        <div key={analyst.name} className="bg-white rounded-[24px] border border-[#E2E8F0] p-6 shadow-sm flex flex-col items-center text-center justify-between hover:shadow-md transition">
          <div>
            <div className="w-20 h-20 rounded-2xl bg-[#0F172A] text-white font-black text-2xl flex items-center justify-center mb-4 shadow-md">
              {analyst.name.split(' ').map(n=>n[0]).join('')}
            </div>
            <h3 className="font-black text-lg text-[#0F172A] mb-1">{analyst.name}</h3>
            <span className="text-xs font-bold text-slate-400 block mb-4">{analyst.role}</span>

            <div className="grid grid-cols-2 gap-3 w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4 mb-6 text-xs">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Accuracy</span>
                <span className="font-black text-emerald-600 text-sm">{analyst.acc}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Avg Return</span>
                <span className="font-black text-[#0F172A] text-sm">{analyst.ret}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setSelectedAnalyst(analyst)}
            className="w-full py-3 rounded-xl bg-blue-50 text-blue-700 font-black text-xs hover:bg-blue-100 transition"
          >
            View Analyst Profile
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col gap-8 w-full pb-12">
      
      {/* PAGE HEADER & CONTROLS */}
      <div className="w-full pt-2 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0F172A] mb-2">
            Research
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            Professional market research powered by expert analysts and AI.
          </p>
        </div>

        {/* Right Header Action Controls */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          
          {/* Global Search Input */}
          <div 
            onClick={() => setIsUniversalSearchOpen(true)}
            className="relative flex-1 sm:w-80 flex items-center bg-white border border-[#E2E8F0] rounded-2xl px-3.5 py-2.5 cursor-pointer hover:border-blue-500 transition shadow-sm select-none"
          >
            <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <span className="text-xs text-slate-400 font-medium truncate flex-1">Search stocks, research, reports, analysts...</span>
            <kbd className="hidden sm:inline-block rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[9px] font-semibold text-slate-400 ml-2">⌘ K</kbd>
          </div>

          <button 
            onClick={handleRefresh}
            className="p-2.5 bg-white border border-[#E2E8F0] rounded-2xl text-slate-500 hover:text-[#0F172A] hover:bg-slate-50 transition shadow-sm"
            title="Refresh Research"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-blue-600' : ''}`} />
          </button>
        </div>
      </div>

      {/* ANIMATED SEGMENTED TABS BAR */}
      <div className="w-full bg-white p-1.5 rounded-[22px] border border-[#E2E8F0] shadow-sm flex items-center overflow-x-auto no-scrollbar">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`relative flex items-center gap-2 px-5 py-2.5 rounded-2xl font-black text-xs transition-all shrink-0 select-none ${
                isActive ? 'text-[#0F172A] bg-[#F1F5F9] shadow-sm' : 'text-slate-500 hover:text-[#0F172A] hover:bg-slate-50'
              }`}
            >
              <span className="relative z-10">{tab.icon}</span>
              <span className="relative z-10">{tab.name}</span>
              {tab.count && (
                <span className={`relative z-10 text-[10px] px-2 py-0.5 rounded-md border ${
                  isActive ? 'bg-white text-blue-600 border-white' : 'bg-slate-100 text-slate-500 border-slate-200'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* DYNAMIC TAB CONTENT */}
      <div className="w-full">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'calls' && renderLiveCalls()}
        {activeTab === 'ai' && renderAIInsights()}
        {activeTab === 'screeners' && renderScreeners()}
        {activeTab === 'reports' && renderReports()}
        {activeTab === 'analysts' && renderAnalysts()}
      </div>

      {/* MODALS & DRAWERS INTEGRATION */}
      <AnimatePresence>
        {selectedResearch && (
          <ResearchDetail
            isOpen={true}
            onClose={() => setSelectedResearch(null)}
            research={selectedResearch}
            onTrade={(res) => setTradeIntent(res)}
          />
        )}
      </AnimatePresence>

      <TradeDrawer
        isOpen={!!tradeIntent}
        onClose={() => setTradeIntent(null)}
        call={tradeIntent}
      />

      <ShareModal
        isOpen={!!showShare}
        onClose={() => setShowShare(null)}
        item={showShare}
      />

      <CompareModal
        isOpen={!!showCompare}
        onClose={() => setShowCompare(null)}
        call1={showCompare}
        call2={featuredOpportunities[1]}
      />

      <ReportViewer
        isOpen={!!showReport}
        onClose={() => setShowReport(null)}
        report={showReport}
      />

      <AnalystProfileModal
        isOpen={!!selectedAnalyst}
        onClose={() => setSelectedAnalyst(null)}
        analyst={selectedAnalyst}
        onSelectResearch={(res) => setSelectedResearch(res)}
      />

      <UniversalSearch
        isOpen={isUniversalSearchOpen}
        onClose={() => setIsUniversalSearchOpen(false)}
        onSelectStock={(st) => setShowStock(st)}
        onSelectResearch={(res) => setSelectedResearch(res)}
        onSelectReport={(rep) => setShowReport(rep)}
        onSelectAnalyst={(an) => setSelectedAnalyst(an)}
      />

    </div>
  );
};
