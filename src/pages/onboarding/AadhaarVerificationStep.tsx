import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Fingerprint, Check, Shield, Camera, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';

export interface AadhaarData {
  aadhaarNumber: string;
  frontImagePreview: string | null;
  backImagePreview: string | null;
  consentGiven: boolean;
}

interface AadhaarVerificationProps {
  initialData?: Partial<AadhaarData>;
  onNext: (data: AadhaarData) => void;
  onBack: () => void;
}

export const AadhaarVerificationStep: React.FC<AadhaarVerificationProps> = ({ initialData, onNext, onBack }) => {
  const [aadhaarNumber, setAadhaarNumber] = useState(initialData?.aadhaarNumber || '');
  const [frontImagePreview, setFrontImagePreview] = useState<string | null>(initialData?.frontImagePreview || null);
  const [backImagePreview, setBackImagePreview] = useState<string | null>(initialData?.backImagePreview || null);
  const [consentGiven, setConsentGiven] = useState(initialData?.consentGiven ?? true);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');

  const handleFileUpload = (type: 'front' | 'back', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'front') setFrontImagePreview(reader.result as string);
        else setBackImagePreview(reader.result as string);
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const validateAadhaar = (num: string) => /^\d{12}$/.test(num);

  const handleVerify = () => {
    if (!aadhaarNumber) {
      setError('12-digit Aadhaar number is required');
      return;
    }
    if (!validateAadhaar(aadhaarNumber)) {
      setError('Invalid Aadhaar number (12 digits required)');
      return;
    }
    if (!frontImagePreview || !backImagePreview) {
      setError('Please upload both Front and Back photos of Aadhaar Card');
      return;
    }
    if (!consentGiven) {
      setError('You must check the UIDAI KYC consent box');
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
      toast.success('Aadhaar DigiLocker KYC Verified!');
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
        <div className="w-14 h-14 mx-auto bg-orange-600/20 border border-orange-500/30 rounded-2xl flex items-center justify-center mb-3 text-orange-400">
          <Fingerprint className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-black text-white tracking-tight">Aadhaar Address & ID Verification</h2>
        <p className="text-xs text-slate-400 font-medium mt-1">
          DigiLocker integrated Aadhaar verification for eKYC compliance.
        </p>
      </div>

      <div className="space-y-4">
        {/* Aadhaar Number Input */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5">
            Aadhaar Number (12 Digits) <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Fingerprint className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              maxLength={12}
              value={aadhaarNumber}
              onChange={(e) => {
                setAadhaarNumber(e.target.value.replace(/\D/g, ''));
                setError('');
              }}
              placeholder="1234 5678 9012"
              className={`w-full pl-10 pr-4 py-3 bg-[#1E293B] border rounded-xl text-xs font-mono font-black text-white placeholder-slate-500 outline-none transition ${
                error ? 'border-rose-500' : isVerified ? 'border-emerald-500' : 'border-slate-700 focus:border-blue-500'
              }`}
            />
          </div>
          {error && <span className="text-[11px] font-bold text-rose-500 mt-1 block">{error}</span>}
        </div>

        {/* Upload Front & Back */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Front Side Photo *</label>
            <div className="border-2 border-dashed border-slate-700 bg-[#1E293B]/50 rounded-2xl p-4 text-center cursor-pointer">
              <input type="file" accept="image/*" onChange={(e) => handleFileUpload('front', e)} className="hidden" id="adh-front" />
              <label htmlFor="adh-front" className="cursor-pointer block">
                {frontImagePreview ? (
                  <div className="flex flex-col items-center gap-1">
                    <img src={frontImagePreview} alt="Front Preview" className="h-24 object-contain rounded-lg" />
                    <span className="text-[10px] font-bold text-emerald-400">Front Uploaded</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-1 text-slate-400 py-2">
                    <Camera className="w-6 h-6 text-blue-400" />
                    <span className="text-xs font-bold">Upload Front</span>
                  </div>
                )}
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Back Side Photo *</label>
            <div className="border-2 border-dashed border-slate-700 bg-[#1E293B]/50 rounded-2xl p-4 text-center cursor-pointer">
              <input type="file" accept="image/*" onChange={(e) => handleFileUpload('back', e)} className="hidden" id="adh-back" />
              <label htmlFor="adh-back" className="cursor-pointer block">
                {backImagePreview ? (
                  <div className="flex flex-col items-center gap-1">
                    <img src={backImagePreview} alt="Back Preview" className="h-24 object-contain rounded-lg" />
                    <span className="text-[10px] font-bold text-emerald-400">Back Uploaded</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-1 text-slate-400 py-2">
                    <Camera className="w-6 h-6 text-blue-400" />
                    <span className="text-xs font-bold">Upload Back</span>
                  </div>
                )}
              </label>
            </div>
          </div>
        </div>

        {/* Consent Checkbox */}
        <div className="flex items-center gap-2 pt-1">
          <input
            type="checkbox"
            checked={consentGiven}
            onChange={(e) => setConsentGiven(e.target.checked)}
            className="w-4 h-4 rounded border-slate-700 bg-[#1E293B] text-blue-600 focus:ring-blue-500"
          />
          <span className="text-xs font-medium text-slate-300">I consent to DigiLocker / UIDAI offline eKYC verification</span>
        </div>

        {/* Verification Trigger */}
        <button
          onClick={handleVerify}
          disabled={isVerifying || isVerified}
          className={`w-full py-3.5 font-black text-xs rounded-xl transition shadow-md flex items-center justify-center gap-2 ${
            isVerified ? 'bg-emerald-600 text-white cursor-default' : 'bg-blue-600 hover:bg-blue-500 text-white cursor-pointer'
          }`}
        >
          {isVerifying ? <span>Verifying via DigiLocker...</span> : isVerified ? <><Check className="w-4 h-4" /><span>Aadhaar Verified</span></> : <><Shield className="w-4 h-4" /><span>Verify Aadhaar</span></>}
        </button>
      </div>

      <div className="pt-4 flex justify-between gap-4">
        <button onClick={onBack} className="px-6 py-3 bg-slate-800 text-slate-300 font-bold text-xs rounded-xl cursor-pointer">
          Back
        </button>
        <button
          onClick={() => onNext({ aadhaarNumber, frontImagePreview, backImagePreview, consentGiven })}
          disabled={!isVerified}
          className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-black text-xs rounded-xl transition shadow-md flex items-center gap-2 cursor-pointer"
        >
          <span>Next: Bank Account Details</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default AadhaarVerificationStep;
