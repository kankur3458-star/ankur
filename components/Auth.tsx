
import React, { useState } from 'react';
import { ArrowRight, Mail, Lock, Sparkles, ChevronRight, Apple, Globe, AlertCircle } from 'lucide-react';

interface Props {
  onLoginSuccess: () => void;
}

const Auth: React.FC<Props> = ({ onLoginSuccess }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Sample credentials: admin@opebo.com / password123
  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      if (mode === 'signin') {
        if (email === 'admin@opebo.com' && password === 'password123') {
          onLoginSuccess();
        } else {
          setError('Invalid master credentials. Try admin@opebo.com / password123');
          setLoading(false);
        }
      } else {
        // Just simulate a signup for now
        onLoginSuccess();
      }
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-white z-[1000] flex flex-col overflow-y-auto animate-in fade-in duration-500">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[40vh] bg-gradient-to-br from-orange-500 to-orange-600 rounded-b-[4rem] -z-10 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -left-10 bottom-0 w-48 h-48 bg-black/10 rounded-full blur-2xl"></div>
        
        <div className="flex flex-col items-center justify-center h-full pt-10 text-white">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-orange-500 shadow-2xl mb-6">
            <div className="w-8 h-8 border-4 border-orange-500 rounded-lg rotate-45"></div>
          </div>
          <h1 className="text-4xl font-black tracking-tighter mb-2">opebo</h1>
          <p className="text-orange-100 text-[10px] font-black uppercase tracking-[0.3em]">Master Service Network</p>
        </div>
      </div>

      <div className="px-8 -mt-12 flex-1">
        <div className="bg-white rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-10 border border-slate-50">
          <div className="flex gap-4 mb-10">
            <button 
              onClick={() => setMode('signin')}
              className={`flex-1 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${mode === 'signin' ? 'bg-orange-500 text-white shadow-lg shadow-orange-100' : 'bg-slate-50 text-slate-400'}`}
            >
              Sign In
            </button>
            <button 
              onClick={() => setMode('signup')}
              className={`flex-1 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${mode === 'signup' ? 'bg-orange-500 text-white shadow-lg shadow-orange-100' : 'bg-slate-50 text-slate-400'}`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleAuth} className="space-y-6">
            {error && (
              <div className="bg-red-50 p-4 rounded-2xl border border-red-100 flex items-center gap-3 animate-in zoom-in-95 duration-300">
                <AlertCircle size={18} className="text-red-500 flex-shrink-0" />
                <p className="text-[10px] text-red-600 font-bold leading-tight uppercase tracking-tight">{error}</p>
              </div>
            )}

            <div>
              <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest block mb-2 ml-2">Email Address</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300">
                  <Mail size={18} />
                </div>
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="master@opebo.com"
                  required
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-orange-500/10 transition-all text-slate-800"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2 px-2">
                <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Password</label>
                {mode === 'signin' && (
                  <button type="button" className="text-[9px] text-orange-500 font-black uppercase tracking-widest hover:underline">Forgot?</button>
                )}
              </div>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300">
                  <Lock size={18} />
                </div>
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-orange-500/10 transition-all text-slate-800"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 text-white py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-3 group relative overflow-hidden"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  {mode === 'signin' ? 'Verify Entry' : 'Create Master Account'} 
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 flex items-center gap-4">
            <div className="h-px bg-slate-100 flex-1"></div>
            <span className="text-[10px] text-slate-300 font-black uppercase tracking-widest">Or Continue With</span>
            <div className="h-px bg-slate-100 flex-1"></div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 py-4 bg-slate-50 rounded-2xl border border-slate-100 text-slate-800 font-bold text-xs hover:bg-white transition-all active:scale-95 shadow-sm">
              <Apple size={18} /> Apple
            </button>
            <button className="flex items-center justify-center gap-3 py-4 bg-slate-50 rounded-2xl border border-slate-100 text-slate-800 font-bold text-xs hover:bg-white transition-all active:scale-95 shadow-sm">
              <Globe size={18} /> Google
            </button>
          </div>
        </div>

        <div className="py-12 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles size={14} className="text-orange-500" />
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Professional Integrity Assured</p>
          </div>
          <p className="text-[9px] text-slate-300 font-medium px-10 leading-relaxed">
            By accessing Opebo, you agree to our Master Terms of Excellence and Privacy Guidelines.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
