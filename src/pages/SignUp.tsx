import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, Check, ArrowRight, RefreshCw } from 'lucide-react';
import { SignupIllustration } from '../components/auth/SignupIllustration';
import { TrustBadges } from '../components/auth/TrustBadges';
import toast from 'react-hot-toast';

export const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    acceptTerms: true
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = () => {
    if (step === 1) {
      const newErr: Record<string, string> = {};
      if (!formData.name) newErr.name = 'Full name is required';
      if (!formData.email) newErr.email = 'Email is required';
      if (!formData.mobile) newErr.mobile = 'Mobile number is required';

      if (Object.keys(newErr).length > 0) {
        setErrors(newErr);
        return;
      }
      setErrors({});
      setStep(2);
    } else {
      const newErr: Record<string, string> = {};
      if (formData.password.length < 8) newErr.password = 'Password must be at least 8 characters';
      if (formData.password !== formData.confirmPassword) newErr.confirmPassword = 'Passwords do not match';
      if (!formData.acceptTerms) newErr.acceptTerms = 'You must accept the terms';

      if (Object.keys(newErr).length > 0) {
        setErrors(newErr);
        return;
      }

      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        toast.success('Account created! Proceeding to KYC & Document verification...');
        navigate('/onboarding', { state: { name: formData.name, email: formData.email, mobile: formData.mobile } });
      }, 1200);
    }
  };

  return (
    <div className="min-h-screen bg-[#070B14] flex items-center justify-center p-4 sm:p-6 font-sans text-slate-100">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-0 bg-[#0F172A] border border-slate-800 rounded-[32px] overflow-hidden shadow-2xl">
        
        {/* Left Column: Illustration */}
        <div className="hidden lg:flex flex-col justify-between p-10 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 border-r border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 font-black text-white text-lg flex items-center justify-center shadow-md">
              U
            </div>
            <span className="font-black text-xl tracking-tight text-white">UNIVEST</span>
          </div>

          <div className="my-auto flex flex-col items-center text-center">
            <SignupIllustration />
            <h2 className="text-2xl font-black text-white mt-6 tracking-tight">
              Begin Your Investment Journey
            </h2>
            <p className="text-slate-400 text-xs font-medium mt-2 max-w-sm leading-relaxed">
              Open your free SEBI-compliant trading & research advisory account in under 2 minutes.
            </p>
          </div>

          <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 border-t border-slate-800/60 pt-4">
            <span>Free Account</span>
            <span>Zero Annual Charges</span>
          </div>
        </div>

        {/* Right Column: Multi-Step Form */}
        <div className="p-8 sm:p-12 flex flex-col justify-between">
          <div>
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Create Account</h1>
              <p className="text-slate-400 text-xs font-medium mt-1">Start building your stock portfolio with AI insights</p>
            </div>

            {/* Step Progress Bar */}
            <div className="flex items-center gap-2 mb-6">
              {[1, 2].map((s) => (
                <React.Fragment key={s}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition ${
                    s === step ? 'bg-blue-600 text-white' : s < step ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-500'
                  }`}>
                    {s < step ? <Check className="w-3.5 h-3.5" /> : s}
                  </div>
                  {s < 2 && <div className={`flex-1 h-1 rounded-full transition ${s < step ? 'bg-emerald-500' : 'bg-slate-800'}`} />}
                </React.Fragment>
              ))}
            </div>

            {step === 1 ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your full name"
                      className="w-full pl-10 pr-4 py-3 bg-[#1E293B] border border-slate-700 rounded-xl text-xs font-medium text-white placeholder-slate-500 outline-none focus:border-blue-500"
                    />
                  </div>
                  {errors.name && <span className="text-[11px] font-bold text-rose-500 mt-1 block">{errors.name}</span>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Email Address *</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full pl-10 pr-4 py-3 bg-[#1E293B] border border-slate-700 rounded-xl text-xs font-medium text-white placeholder-slate-500 outline-none focus:border-blue-500"
                    />
                  </div>
                  {errors.email && <span className="text-[11px] font-bold text-rose-500 mt-1 block">{errors.email}</span>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Mobile Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="tel"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      placeholder="10-digit mobile number"
                      className="w-full pl-10 pr-4 py-3 bg-[#1E293B] border border-slate-700 rounded-xl text-xs font-medium text-white placeholder-slate-500 outline-none focus:border-blue-500"
                    />
                  </div>
                  {errors.mobile && <span className="text-[11px] font-bold text-rose-500 mt-1 block">{errors.mobile}</span>}
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs rounded-xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <span>Continue to Password Setup</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Create Password *</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="Minimum 8 characters"
                      className="w-full pl-10 pr-4 py-3 bg-[#1E293B] border border-slate-700 rounded-xl text-xs font-medium text-white placeholder-slate-500 outline-none focus:border-blue-500"
                    />
                  </div>
                  {errors.password && <span className="text-[11px] font-bold text-rose-500 mt-1 block">{errors.password}</span>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Confirm Password *</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      placeholder="Confirm your password"
                      className="w-full pl-10 pr-4 py-3 bg-[#1E293B] border border-slate-700 rounded-xl text-xs font-medium text-white placeholder-slate-500 outline-none focus:border-blue-500"
                    />
                  </div>
                  {errors.confirmPassword && <span className="text-[11px] font-bold text-rose-500 mt-1 block">{errors.confirmPassword}</span>}
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    checked={formData.acceptTerms}
                    onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                    className="w-4 h-4 rounded border-slate-700 bg-[#1E293B] text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-xs text-slate-300 font-medium">I agree to SEBI advisory terms & privacy policy</span>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={isLoading}
                    className="flex-1 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                    <span>{isLoading ? 'Creating Account...' : 'Complete Registration'}</span>
                  </button>
                </div>
              </div>
            )}

            <div className="mt-6 text-center">
              <span className="text-xs text-slate-400 font-medium">
                Already registered?{' '}
                <button onClick={() => navigate('/login')} className="text-blue-400 font-black hover:text-blue-300">
                  Sign In
                </button>
              </span>
            </div>
          </div>

          <div className="mt-6">
            <TrustBadges />
          </div>
        </div>

      </div>
    </div>
  );
};

export default SignUp;
