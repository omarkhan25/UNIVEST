import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, BarChart3, AlertCircle } from 'lucide-react';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  research: any;
}

export const CompareModal: React.FC<CompareModalProps> = ({ isOpen, onClose, research }) => {
  if (!isOpen || !research) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-[#F8FAFC] rounded-[24px] shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-white">
            <div>
              <h3 className="font-black text-xl text-[#0F172A] leading-tight">Sector Comparison</h3>
              <p className="text-sm font-bold text-slate-500">Comparing {research.company} against top peers</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl transition text-slate-500">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-6 overflow-y-auto flex-1">
            <div className="bg-white rounded-[20px] border border-slate-200 shadow-sm overflow-hidden">
               <table className="w-full text-left border-collapse">
                 <thead>
                   <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                     <th className="p-4 w-1/3">Metric</th>
                     <th className="p-4 border-l border-slate-200 text-[#0F172A]">{research.symbol}</th>
                     <th className="p-4 border-l border-slate-200">Peer 1</th>
                     <th className="p-4 border-l border-slate-200">Peer 2</th>
                   </tr>
                 </thead>
                 <tbody className="text-sm">
                   <tr className="border-b border-slate-100">
                     <td className="p-4 font-bold text-slate-500">Recommendation</td>
                     <td className="p-4 border-l border-slate-100 font-black text-emerald-600">{research.rec}</td>
                     <td className="p-4 border-l border-slate-100 font-black text-slate-600">HOLD</td>
                     <td className="p-4 border-l border-slate-100 font-black text-rose-600">SELL</td>
                   </tr>
                   <tr className="border-b border-slate-100">
                     <td className="p-4 font-bold text-slate-500">Target Upside</td>
                     <td className="p-4 border-l border-slate-100 font-black text-[#0F172A]">{research.return}</td>
                     <td className="p-4 border-l border-slate-100 font-bold text-slate-600">4%</td>
                     <td className="p-4 border-l border-slate-100 font-bold text-slate-600">-2%</td>
                   </tr>
                   <tr className="border-b border-slate-100">
                     <td className="p-4 font-bold text-slate-500">AI Confidence</td>
                     <td className="p-4 border-l border-slate-100 font-black text-blue-600">{research.confidence}%</td>
                     <td className="p-4 border-l border-slate-100 font-bold text-slate-600">62%</td>
                     <td className="p-4 border-l border-slate-100 font-bold text-slate-600">41%</td>
                   </tr>
                   <tr className="border-b border-slate-100">
                     <td className="p-4 font-bold text-slate-500">P/E Ratio</td>
                     <td className="p-4 border-l border-slate-100 font-bold text-[#0F172A]">24.5x</td>
                     <td className="p-4 border-l border-slate-100 font-bold text-slate-600">28.1x</td>
                     <td className="p-4 border-l border-slate-100 font-bold text-slate-600">31.2x</td>
                   </tr>
                   <tr>
                     <td className="p-4 font-bold text-slate-500">Debt to Equity</td>
                     <td className="p-4 border-l border-slate-100 font-bold text-emerald-600">0.4</td>
                     <td className="p-4 border-l border-slate-100 font-bold text-rose-600">1.2</td>
                     <td className="p-4 border-l border-slate-100 font-bold text-slate-600">0.8</td>
                   </tr>
                 </tbody>
               </table>
            </div>

            <div className="mt-6 bg-blue-50 border border-blue-100 p-4 rounded-[20px] flex gap-3">
               <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
               <p className="text-sm font-medium text-blue-800 leading-relaxed">
                 <strong className="block font-black text-blue-900 mb-1">AI Relative Valuation Note</strong>
                 {research.company} is currently trading at a 15% discount to its historical peer average P/E, presenting a highly favorable risk/reward scenario in the current sector rotation cycle.
               </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
