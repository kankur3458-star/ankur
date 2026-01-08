
import React, { useState, useEffect, useRef } from 'react';
import { MessageSquareText, Send, X, Loader2, Sparkles, MessageSquareQuote } from 'lucide-react';
import { getWoodworkAdvice } from '../services/geminiService';

const QUICK_QUESTIONS = [
  "How to maintain teak wood?",
  "Cost to fix a chair leg?",
  "Is pine good for outdoor furniture?",
  "How to fix a stuck drawer?"
];

interface Props {
  bottomOffset?: number;
}

const AIConsultant: React.FC<Props> = ({ bottomOffset = 24 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const performQuery = async (text: string) => {
    setLoading(true);
    setAnswer(null);
    const result = await getWoodworkAdvice(text);
    setAnswer(result);
    setLoading(false);
  };

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    await performQuery(query);
  };

  const handleQuickAsk = async (text: string) => {
    setQuery(text);
    await performQuery(text);
  };

  return (
    <>
      <style>{`
        @keyframes float-expert {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes radiant-pulse {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        .animate-float-expert {
          animation: float-expert 4s ease-in-out infinite;
        }
        .animate-radiant-pulse {
          animation: radiant-pulse 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>

      {/* Permanently Compact Morphing Button - Expands on Hover */}
      <button 
        onClick={() => setIsOpen(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ 
          bottom: `${bottomOffset}rem`,
          width: isHovered ? '140px' : '52px',
        }}
        className="fixed right-6 h-[52px] z-40 flex items-center bg-orange-500 text-white rounded-full shadow-[0_12px_40px_rgba(249,115,22,0.4)] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] active:scale-90 group overflow-hidden animate-float-expert border border-orange-400/50"
      >
        {/* Pulsing rings to catch eye when not hovered */}
        {!isHovered && (
          <div className="absolute inset-0 bg-orange-400 rounded-full animate-radiant-pulse pointer-events-none"></div>
        )}

        <div className="flex items-center justify-center w-full px-3.5 relative z-10">
          <div className="relative flex-shrink-0 flex items-center justify-center">
            <Sparkles 
              size={24} 
              className={`transition-transform duration-500 ${isHovered ? 'scale-90 opacity-80' : 'scale-110'}`} 
            />
            {!isHovered && (
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-orange-500 shadow-lg"></div>
            )}
          </div>
          
          <span 
            className={`text-[11px] font-black whitespace-nowrap uppercase tracking-[0.15em] ml-2 transition-all duration-500 ${
              isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none w-0'
            }`}
          >
            Ask Help
          </span>
        </div>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-xl z-[130] flex items-end sm:items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-t-[3.5rem] sm:rounded-[3.5rem] overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-500">
            <div className="bg-gradient-to-br from-slate-900 via-orange-600 to-orange-400 p-8 text-white flex justify-between items-center relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
              
              <div className="flex items-center gap-4 relative z-10">
                <div className="p-3.5 bg-white/20 backdrop-blur-xl rounded-2xl shadow-inner border border-white/20">
                  <Sparkles size={28} className="text-yellow-300" />
                </div>
                <div>
                  <h3 className="font-black text-2xl leading-none mb-1 tracking-tight">AI Master</h3>
                  <p className="text-[10px] text-orange-50 font-black uppercase tracking-[0.2em] flex items-center gap-2">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                    </span>
                    Live Consultation
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all active:scale-90 relative z-10"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-8 max-h-[70vh] overflow-y-auto hide-scrollbar bg-white">
              {!answer && !loading && (
                <>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="h-px flex-1 bg-slate-100"></div>
                    <span className="text-slate-400 text-[10px] font-black uppercase tracking-[0.25em]">Consult Expert</span>
                    <div className="h-px flex-1 bg-slate-100"></div>
                  </div>
                  <div className="grid grid-cols-1 gap-3 mb-8">
                    {QUICK_QUESTIONS.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleQuickAsk(q)}
                        className="text-xs bg-slate-50 hover:bg-orange-500 hover:text-white border border-slate-100 hover:border-orange-400 px-6 py-4 rounded-[1.5rem] font-black transition-all duration-300 flex items-center gap-4 text-slate-700 text-left group shadow-sm hover:shadow-orange-200"
                      >
                        <div className="p-2 bg-white rounded-xl shadow-sm group-hover:bg-orange-400 transition-colors">
                          <MessageSquareQuote size={18} className="text-orange-500 group-hover:text-white" />
                        </div>
                        {q}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {loading && (
                <div className="flex flex-col items-center justify-center py-20 space-y-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-orange-500/30 blur-3xl rounded-full animate-pulse"></div>
                    <div className="relative z-10 p-8 rounded-full border-4 border-slate-50">
                       <Loader2 className="animate-spin text-orange-500" size={64} strokeWidth={3} />
                       <Sparkles className="absolute top-4 right-4 text-yellow-500 animate-bounce" size={24} />
                    </div>
                  </div>
                  <div className="text-center">
                    <h4 className="text-lg font-black text-slate-800 tracking-tight">Analyzing Request...</h4>
                    <p className="text-[11px] text-slate-400 font-bold mt-2 uppercase tracking-[0.2em]">Our AI Carpenter is thinking</p>
                  </div>
                </div>
              )}

              {answer && !loading && (
                <div className="animate-in fade-in zoom-in-95 duration-500">
                  <div className="flex flex-col gap-4 mb-8">
                    <div className="flex-1 bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 relative shadow-inner">
                      <div className="absolute -top-4 left-8 bg-orange-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                        Expert Advice
                      </div>
                      <p className="text-slate-800 text-base leading-relaxed whitespace-pre-wrap font-bold">{answer}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => {setAnswer(null); setQuery('');}}
                    className="w-full py-5 bg-slate-900 text-white rounded-[2rem] text-sm font-black shadow-2xl shadow-slate-200 active:scale-95 transition-all mt-4 uppercase tracking-[0.25em]"
                  >
                    Ask Follow-up
                  </button>
                </div>
              )}

              {!loading && !answer && (
                <form onSubmit={handleAsk} className="relative">
                  <div className="flex items-center justify-between mb-4 px-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Your Question</label>
                    <span className="text-[10px] text-slate-300 font-bold">WoodMaster AI</span>
                  </div>
                  <div className="relative">
                    <textarea
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="E.g., How to fix a loose table leg?"
                      className="w-full bg-slate-50 rounded-[2.5rem] p-8 pr-16 text-sm focus:outline-none focus:ring-4 focus:ring-orange-500/10 border border-slate-100 min-h-[160px] resize-none shadow-inner font-bold placeholder:text-slate-300 text-slate-800"
                    />
                    <button 
                      type="submit"
                      disabled={!query.trim()}
                      className="absolute bottom-6 right-6 bg-orange-500 text-white p-5 rounded-2xl disabled:opacity-20 disabled:scale-90 hover:bg-slate-900 transition-all shadow-xl active:scale-90 shadow-orange-100"
                    >
                      <Send size={24} />
                    </button>
                  </div>
                </form>
              )}
            </div>
            
            <div className="bg-slate-50/80 border-t border-slate-100 px-10 py-6">
               <div className="flex items-center justify-between">
                 <div className="flex items-center gap-3">
                   <div className="w-2.5 h-2.5 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                   <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">Live Expert Mode</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-bold tracking-tighter">Gemini Intelligence</p>
               </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIConsultant;
