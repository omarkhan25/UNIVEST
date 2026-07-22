import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Check, ShieldCheck } from 'lucide-react';
import { PersonalDetailsStep, type PersonalDetailsData } from './PersonalDetailsStep';
import { PANVerificationStep, type PANData } from './PANVerificationStep';
import { AadhaarVerificationStep, type AadhaarData } from './AadhaarVerificationStep';
import { BankDetailsStep, type BankData } from './BankDetailsStep';
import { AgreementsStep } from './AgreementsStep';

export const OnboardingFlowContainer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navState = (location.state as { name?: string; email?: string; mobile?: string }) || {};

  const [currentStep, setCurrentStep] = useState(1);

  const [personalData, setPersonalData] = useState<Partial<PersonalDetailsData>>({
    fullName: navState.name || 'Omar Khan',
    email: navState.email || 'omar@example.com',
    mobile: navState.mobile || '9876543210'
  });
  const [panData, setPanData] = useState<Partial<PANData>>({});
  const [aadhaarData, setAadhaarData] = useState<Partial<AadhaarData>>({});
  const [bankData, setBankData] = useState<Partial<BankData>>({});

  const steps = [
    { number: 1, title: 'Personal' },
    { number: 2, title: 'PAN KYC' },
    { number: 3, title: 'Aadhaar' },
    { number: 4, title: 'Bank Link' },
    { number: 5, title: 'E-Sign' }
  ];

  return (
    <div className="min-h-screen bg-[#070B14] flex flex-col justify-between p-4 sm:p-6 font-sans text-slate-100">
      
      {/* Top Bar */}
      <header className="max-w-4xl w-full mx-auto flex items-center justify-between py-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 font-black text-white text-lg flex items-center justify-center shadow-md">
            U
          </div>
          <span className="font-black text-lg text-white">UNIVEST</span>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
          <ShieldCheck className="w-4 h-4" /> SEBI Compliant KYC
        </div>
      </header>

      {/* Step Progress Tracker Bar */}
      <div className="max-w-xl w-full mx-auto my-6">
        <div className="flex items-center justify-between relative">
          {steps.map((st) => (
            <div key={st.number} className="flex flex-col items-center gap-1.5 relative z-10">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition ${
                st.number === currentStep 
                  ? 'bg-blue-600 text-white ring-4 ring-blue-600/20' 
                  : st.number < currentStep 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-slate-800 text-slate-500'
              }`}>
                {st.number < currentStep ? <Check className="w-4 h-4" /> : st.number}
              </div>
              <span className={`text-[10px] font-bold ${st.number <= currentStep ? 'text-slate-200' : 'text-slate-500'}`}>
                {st.title}
              </span>
            </div>
          ))}
          
          <div className="absolute top-4 left-4 right-4 h-0.5 bg-slate-800 -z-0" />
        </div>
      </div>

      {/* Step Render Area */}
      <main className="flex-1 max-w-2xl w-full mx-auto flex flex-col justify-center py-4">
        {currentStep === 1 && (
          <PersonalDetailsStep
            initialData={personalData}
            onNext={(data) => {
              setPersonalData(data);
              setCurrentStep(2);
            }}
          />
        )}

        {currentStep === 2 && (
          <PANVerificationStep
            initialData={panData}
            onNext={(data) => {
              setPanData(data);
              setCurrentStep(3);
            }}
            onBack={() => setCurrentStep(1)}
          />
        )}

        {currentStep === 3 && (
          <AadhaarVerificationStep
            initialData={aadhaarData}
            onNext={(data) => {
              setAadhaarData(data);
              setCurrentStep(4);
            }}
            onBack={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 4 && (
          <BankDetailsStep
            initialData={bankData}
            onNext={(data) => {
              setBankData(data);
              setCurrentStep(5);
            }}
            onBack={() => setCurrentStep(3)}
          />
        )}

        {currentStep === 5 && (
          <AgreementsStep
            onComplete={() => navigate('/dashboard')}
            onBack={() => setCurrentStep(4)}
          />
        )}
      </main>

      {/* Footer Disclaimer */}
      <footer className="max-w-4xl w-full mx-auto text-center text-[10px] font-medium text-slate-500 py-4 border-t border-slate-800/80">
        Univest Advisory Services Pvt Ltd · SEBI Registered Research Analyst (INH000009821) · 256-Bit SSL Encrypted
      </footer>
    </div>
  );
};

export default OnboardingFlowContainer;
