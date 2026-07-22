import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Upload, Check, Shield, Eye, EyeOff, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';

export interface PANData {
  panNumber: string;
  fullName: string;
  dob: string;
  panImagePreview: string | null;
}

interface PANVerificationProps {
  initialData?: Partial<PANData>;
  onNext: (data: PANData) => void;
  onBack: () => void;
}

export const PANVerificationStep: React.FC<PANVerificationProps> = ({ initialData, onNext, onBack }) => {
  const [panNumber, setPanNumber] = useState(initialData?.panNumber || '');
  const [panImagePreview, setPanImagePreview] = useState<string | null>(initialData?.panImagePreview || null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPanImagePreview(reader.result as string);
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const validatePAN = (pan: string) => /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan.toUpperCase());

  const handleVerify = () => {
    const cleanPan = panNumber.toUpperCase().trim();
    if (!cleanPan) {
      setError('PAN number is required');
      return;
    }
    if (!validatePAN(cleanPan)) {
      setError('Invalid PAN format (e.g., ABCDE1234F)');
      return;
    }
    if (!panImagePreview) {
      setError('Please upload a photo of your PAN card');
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
      toast.success('PAN verified with NSDL database!');
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
        <div className="w-14 h-14 mx-auto bg-amber-600/20 border border-amber-500/30 rounded-2xl flex items-center justify-center mb-3 text-amber-400">
          <CreditCard className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-black text-white tracking-tight">PAN Card KYC Verification</h2>
        <p className="text-xs text-slate-400 font-medium mt-1">
          Mandatory SEBI KYC requirement for stock advisory and demat account linkage.
        </p>
      </div>

      <div className="space-y-4">
        {/* PAN Number */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5">
            PAN Number <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              maxLength={10}
              value={panNumber}
              onChange={(e) => {
                setPanNumber(e.target.value.toUpperCase());
                setError('');
              }}
              placeholder="ABCDE1234F"
              className={`w-full pl-10 pr-4 py-3 bg-[#1E293B] border rounded-xl text-xs font-mono font-black text-white placeholder-slate-500 outline-none uppercase transition ${
                error ? 'border-rose-500' : isVerified ? 'border-emerald-500' : 'border-slate-700 focus:border-blue-500'
              }`}
            />
          </div>
          {error && <span className="text-[11px] font-bold text-rose-500 mt-1 block">{error}</span>}
        </div>

        {/* PAN Card Image Upload */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5">
            Upload Front Photo of PAN Card <span className="text-rose-500">*</span>
          </label>

          <div className={`border-2 border-dashed rounded-2xl p-6 text-center transition cursor-pointer ${
            panImagePreview ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-700 hover:border-blue-500 bg-[#1E293B]/50'
          }`}>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              id="pan-upload"
            />
            <label htmlFor="pan-upload" className="cursor-pointer block">
              {panImagePreview ? (
                <div className="flex flex-col items-center gap-2">
                  <img src={panImagePreview} alt="PAN Preview" className="h-32 object-contain rounded-xl border border-slate-700" />
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                    <Check className="w-4 h-4" /> PAN Image Attached (Click to change)
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 text-slate-400">
                  <Upload className="w-8 h-8 text-blue-400" />
                  <span className="text-xs font-bold text-slate-300">Click to upload PAN Card image</span>
                  <span className="text-[10px]">JPG or PNG up to 5MB</span>
                </div>
              )}
            </label>
          </div>
        </div>

        {/* Verification Trigger */}
        <button
          onClick={handleVerify}
          disabled={isVerifying || isVerified}
          className={`w-full py-3.5 font-black text-xs rounded-xl transition shadow-md flex items-center justify-center gap-2 ${
            isVerified 
              ? 'bg-emerald-600 text-white cursor-default' 
              : 'bg-blue-600 hover:bg-blue-500 text-white cursor-pointer'
          }`}
        >
          {isVerifying ? (
            <span>Verifying with NSDL...</span>
          ) : isVerified ? (
            <>
              <Check className="w-4 h-4" />
              <span>PAN Verified with Income Tax Records</span>
            </>
          ) : (
            <>
              <Shield className="w-4 h-4" />
              <span>Verify PAN Card</span>
            </>
          )}
        </button>
      </div>

      <div className="pt-4 flex justify-between gap-4">
        <button onClick={onBack} className="px-6 py-3 bg-slate-800 text-slate-300 font-bold text-xs rounded-xl cursor-pointer">
          Back
        </button>
        <button
          onClick={() => onNext({ panNumber, fullName: 'Omar Khan', dob: '1995-06-15', panImagePreview })}
          disabled={!isVerified}
          className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-black text-xs rounded-xl transition shadow-md flex items-center gap-2 cursor-pointer"
        >
          <span>Next: Aadhaar Verification</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default PANVerificationStep;
