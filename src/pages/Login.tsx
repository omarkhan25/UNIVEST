import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, RefreshCw } from 'lucide-react';
import { LoginIllustration } from '../components/auth/LoginIllustration';
import { TrustBadges } from '../components/auth/TrustBadges';
import toast from 'react-hot-toast';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; password?: string } = {};

    if (!email) newErrors.email = 'Email address is required';
    if (!password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Welcome back to Univest!');
      navigate('/dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#070B14] flex items-center justify-center p-4 sm:p-6 font-sans text-slate-100">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-0 bg-[#0F172A] border border-slate-800 rounded-[32px] overflow-hidden shadow-2xl">
        
        {/* Left Column: Vector Illustration & Teaser */}
        <div className="hidden lg:flex flex-col justify-between p-10 bg-gradient-to-br from-blue-950/40 via-slate-900 to-slate-950 border-r border-slate-800/80 relative overflow-hidden">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 font-black text-white text-lg flex items-center justify-center shadow-md">
              U
            </div>
            <span className="font-black text-xl tracking-tight text-white">UNIVEST</span>
          </div>

          <div className="my-auto flex flex-col items-center text-center">
            <LoginIllustration />
            <h2 className="text-2xl font-black text-white mt-6 tracking-tight">
              Smart Investing Starts Here
            </h2>
            <p className="text-slate-400 text-xs font-medium mt-2 max-w-sm leading-relaxed">
              Access SEBI certified research calls, autonomous AI advisors, and real-time market order execution.
            </p>
          </div>

          <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 border-t border-slate-800/60 pt-4">
            <span>SEBI RA Registered</span>
            <span>100% Secure SSL</span>
          </div>
        </div>

        {/* Right Column: Interactive Login Form */}
        <div className="p-8 sm:p-12 flex flex-col justify-between">
          <div>
            <div className="mb-8">
              <div className="lg:hidden flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-blue-600 font-black text-white flex items-center justify-center text-sm">
                  U
                </div>
                <span className="font-black text-lg text-white">UNIVEST</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Welcome Back</h1>
              <p className="text-slate-400 text-xs font-medium mt-1">Sign in to manage your portfolio and research signals</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={`w-full pl-10 pr-4 py-3 bg-[#1E293B] border rounded-xl text-xs font-medium text-white placeholder-slate-500 outline-none transition ${
                      errors.email ? 'border-rose-500 bg-rose-500/10' : 'border-slate-700 focus:border-blue-500'
                    }`}
                  />
                </div>
                {errors.email && <span className="text-[11px] font-bold text-rose-500 mt-1 block">{errors.email}</span>}
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-300">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => navigate('/forgot-password')}
                    className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className={`w-full pl-10 pr-10 py-3 bg-[#1E293B] border rounded-xl text-xs font-medium text-white placeholder-slate-500 outline-none transition ${
                      errors.password ? 'border-rose-500 bg-rose-500/10' : 'border-slate-700 focus:border-blue-500'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-1 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <span className="text-[11px] font-bold text-rose-500 mt-1 block">{errors.password}</span>}
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between py-1">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-700 bg-[#1E293B] text-blue-600 focus:ring-blue-500"
                  />
                  <span>Remember this session</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-black text-xs rounded-xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <span className="text-xs text-slate-400 font-medium">
                Don't have an account?{' '}
                <button
                  onClick={() => navigate('/signup')}
                  className="text-blue-400 font-black hover:text-blue-300 transition-colors"
                >
                  Create one now
                </button>
              </span>
            </div>
          </div>

          <div className="mt-8">
            <TrustBadges />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
