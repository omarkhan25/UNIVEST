import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Landmark, CreditCard, Check, Shield, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';

export interface BankData {
  accountNumber: string;
  ifscCode: string;
  bankName: string;
  accountType: 'savings' | 'current';
  upiId: string;
}

interface BankDetailsProps {
  initialData?: Partial<BankData>;
  onNext: (data: BankData) => void;
  onBack: () => void;
}

export const BankDetailsStep: React.FC<BankDetailsProps> = ({ initialData, onNext, onBack }) => {
  const [accountNumber, setAccountNumber] = useState(initialData?.accountNumber || '');
  const [confirmAccountNumber, setConfirmAccountNumber] = useState(initialData?.accountNumber || '');
  const [ifscCode, setIfscCode] = useState(initialData?.ifscCode || '');
  const [bankName, setBankName] = useState(initialData?.bankName || '');
  const [accountType, setAccountType] = useState<'savings' | 'current'>(initialData?.accountType || 'savings');
  const [upiId, setUpiId] = useState(initialData?.upiId || '');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');

  const validateIFSC = (ifsc: string) => /^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc.toUpperCase());

  const handleVerifyBank = () => {
    if (!accountNumber || accountNumber !== confirmAccountNumber) {
      setError('Account numbers do not match');
      return;
    }
    if (!ifscCode || !validateIFSC(ifscCode)) {
      setError('Invalid IFSC Code (e.g. SBIN0001234)');
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
      setBankName('State Bank of India (Main Branch)');
      toast.success('Penny drop verification successful! Bank account linked');
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="w-full max-w-xl mx-auto space-y-6 font-sans text-slate-100"
    >
      <div className="text-center mb-6">
        <div className="w-14 h-14 mx-auto bg-emerald-600/20 border border-emerald-500/30 rounded-2xl flex items-center justify-center mb-3 text-emerald-400">
          <Landmark className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-black text-white tracking-tight">Bank Account Linkage</h2>
        <p className="text-xs text-slate-400 font-medium mt-1">
          Link your primary bank account for fund deposits, payout withdrawals, and UPI mandates.
        </p>
      </div>

      <div className="space-y-4">
        {/* Account Number */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5">Bank Account Number *</label>
          <div className="relative">
            <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="password"
              value={accountNumber}
              onChange={(e) => {
                setAccountNumber(e.target.value.replace(/\D/g, ''));
                setError('');
              }}
              placeholder="Enter account number"
              className="w-full pl-10 pr-4 py-3 bg-[#1E293B] border border-slate-700 rounded-xl text-xs font-mono font-black text-white placeholder-slate-500 outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Confirm Account Number */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5">Confirm Bank Account Number *</label>
          <div className="relative">
            <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={confirmAccountNumber}
              onChange={(e) => {
                setConfirmAccountNumber(e.target.value.replace(/\D/g, ''));
                setError('');
              }}
              placeholder="Re-enter account number"
              className="w-full pl-10 pr-4 py-3 bg-[#1E293B] border border-slate-700 rounded-xl text-xs font-mono font-black text-white placeholder-slate-500 outline-none focus:border-blue-500"
            />
          </div>
          {error && <span className="text-[11px] font-bold text-rose-500 mt-1 block">{error}</span>}
        </div>

        {/* IFSC Code & Account Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">IFSC Code *</label>
            <input
              type="text"
              maxLength={11}
              value={ifscCode}
              onChange={(e) => {
                setIfscCode(e.target.value.toUpperCase());
                setError('');
              }}
              placeholder="SBIN0001234"
              className="w-full px-3.5 py-3 bg-[#1E293B] border border-slate-700 rounded-xl text-xs font-mono font-black text-white outline-none focus:border-blue-500 uppercase"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Account Type *</label>
            <select
              value={accountType}
              onChange={(e) => setAccountType(e.target.value as any)}
              className="w-full px-3.5 py-3 bg-[#1E293B] border border-slate-700 rounded-xl text-xs font-medium text-white outline-none focus:border-blue-500"
            >
              <option value="savings">Savings Account</option>
              <option value="current">Current Account</option>
            </select>
          </div>
        </div>

        {bankName && (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs font-bold text-emerald-400">
            ✓ Linked Bank: {bankName}
          </div>
        )}

        {/* Verification Trigger */}
        <button
          onClick={handleVerifyBank}
          disabled={isVerifying || isVerified}
          className={`w-full py-3.5 font-black text-xs rounded-xl transition shadow-md flex items-center justify-center gap-2 ${
            isVerified ? 'bg-emerald-600 text-white cursor-default' : 'bg-blue-600 hover:bg-blue-500 text-white cursor-pointer'
          }`}
        >
          {isVerifying ? <span>Executing ₹1 Penny Drop Verification...</span> : isVerified ? <><Check className="w-4 h-4" /><span>Bank Account Verified & Penny Dropped</span></> : <><Shield className="w-4 h-4" /><span>Verify Bank via Penny Drop</span></>}
        </button>
      </div>

      <div className="pt-4 flex justify-between gap-4">
        <button onClick={onBack} className="px-6 py-3 bg-slate-800 text-slate-300 font-bold text-xs rounded-xl cursor-pointer">
          Back
        </button>
        <button
          onClick={() => onNext({ accountNumber, ifscCode, bankName, accountType, upiId })}
          disabled={!isVerified}
          className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-black text-xs rounded-xl transition shadow-md flex items-center gap-2 cursor-pointer"
        >
          <span>Next: E-Sign & Agreements</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default BankDetailsStep;
